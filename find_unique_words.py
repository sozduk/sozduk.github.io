#!/usr/bin/env python3
"""
Find unique Kyrgyz words - words that require multiple Russian words to translate.
This demonstrates concepts that are uniquely expressed in Kyrgyz with a single word.
"""
import re
import json
from collections import defaultdict

def load_dictionary_with_translations(filepath):
    """Load words with their Russian translations"""
    entries = []
    current_entry = None
    
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.rstrip('\n')
            if not line:
                continue
            
            # Check if this is a new entry (starts with Kyrgyz word + tab)
            if '\t' in line:
                parts = line.split('\t', 1)
                kyrgyz_word = parts[0].strip()
                translation = parts[1].strip() if len(parts) > 1 else ''
                
                # Skip if word contains spaces or hyphens (compound words)
                if ' ' not in kyrgyz_word and '-' not in kyrgyz_word and kyrgyz_word:
                    current_entry = {
                        'word': kyrgyz_word,
                        'translation': translation,
                        'full_text': translation
                    }
                    entries.append(current_entry)
            elif current_entry:
                # Continuation of previous entry
                current_entry['full_text'] += ' ' + line.strip()
    
    return entries

def count_russian_words_in_translation(translation):
    """
    Count minimum Russian words needed to express the meaning.
    Focus on the primary translation (before semicolons, examples, etc.)
    """
    # Remove markers like ар., южн., фольк., etc.
    cleaned = re.sub(r'\b[а-я]+\.\s*', '', translation)
    
    # Get first translation (before semicolon or example markers)
    first_part = cleaned.split(';')[0]
    first_part = first_part.split('(')[0]  # Remove parenthetical notes
    
    # Remove special characters and extra spaces
    first_part = re.sub(r'[^\w\s\-]', ' ', first_part)
    first_part = re.sub(r'\s+', ' ', first_part).strip()
    
    # Count words (Russian words)
    words = [w for w in first_part.split() if len(w) > 1 and w.isalpha()]
    
    return len(words), first_part

def find_unique_words(entries, min_russian_words=2):
    """Find Kyrgyz words that translate to multiple Russian words"""
    unique_words = []
    
    for entry in entries:
        word_count, clean_translation = count_russian_words_in_translation(entry['translation'])
        
        if word_count >= min_russian_words:
            # Get a cleaner version of translation for display
            display_translation = entry['translation'].split(';')[0].strip()
            display_translation = re.sub(r'\b[а-я]{2,4}\.\s*', '', display_translation)
            display_translation = display_translation.strip()
            
            if display_translation and len(entry['word']) > 1:
                unique_words.append({
                    'word': entry['word'],
                    'translation': display_translation,
                    'word_count': word_count,
                    'category': categorize_word(entry['full_text'])
                })
    
    # Sort by word count (descending) then alphabetically
    unique_words.sort(key=lambda x: (-x['word_count'], x['word']))
    
    return unique_words

def categorize_word(full_text):
    """Categorize word based on domain markers"""
    text_lower = full_text.lower()
    
    if 'фольк' in text_lower:
        return 'folklore'
    elif 'миф' in text_lower:
        return 'mythology'
    elif 'южн' in text_lower or 'сев' in text_lower:
        return 'dialect'
    elif 'уст' in text_lower:
        return 'archaic'
    elif 'ар.' in text_lower or 'ир.' in text_lower:
        return 'loanword'
    elif any(marker in text_lower for marker in ['бот.', 'зоол.', 'анат.']):
        return 'nature'
    elif any(marker in text_lower for marker in ['тех.', 'мат.', 'физ.']):
        return 'technical'
    else:
        return 'general'

def main():
    print("Loading dictionary...")
    entries = load_dictionary_with_translations('udahin_txt/kg_ru_udahin.txt')
    print(f"Loaded {len(entries)} dictionary entries")

    print("\nFinding unique Kyrgyz words (translated by 2+ Russian words)...")
    unique_words = find_unique_words(entries, min_russian_words=2)
    
    print(f"Found {len(unique_words)} unique words")

    # Group by category
    by_category = defaultdict(list)
    for word in unique_words:
        by_category[word['category']].append(word)

    print("\n" + "="*60)
    print("UNIQUE KYRGYZ WORDS BY CATEGORY")
    print("="*60)

    for category, words in sorted(by_category.items()):
        print(f"\n{category.upper()} ({len(words)} words):")
        for w in words[:5]:
            print(f"  {w['word']}: {w['translation'][:60]}...")

    # Prepare output for website
    # Select best examples (limit to manageable size)
    output_words = []
    
    # Get top examples from each category
    for category in ['general', 'nature', 'folklore', 'dialect', 'archaic']:
        cat_words = by_category.get(category, [])
        # Filter for cleaner examples
        good_examples = [
            w for w in cat_words 
            if len(w['word']) >= 3 
            and len(w['translation']) < 100
            and w['word_count'] >= 2
            and w['word_count'] <= 5
        ][:30]
        output_words.extend(good_examples)

    # Remove duplicates
    seen = set()
    deduped = []
    for w in output_words:
        if w['word'] not in seen:
            seen.add(w['word'])
            deduped.append(w)

    output = {
        'unique_words': deduped[:100],  # Limit to 100 best examples
        'stats': {
            'total_entries': len(entries),
            'unique_words_found': len(unique_words),
            'by_category': {cat: len(words) for cat, words in by_category.items()}
        },
        'categories': {
            'general': 'Жалпы сөздөр / General words',
            'nature': 'Жаратылыш / Nature',
            'folklore': 'Фольклор / Folklore',
            'dialect': 'Диалект / Dialect',
            'archaic': 'Эски сөздөр / Archaic',
            'mythology': 'Мифология / Mythology',
            'loanword': 'Кириш сөздөр / Loanwords',
            'technical': 'Техникалык / Technical'
        }
    }

    with open('unique_words_output.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\nSaved {len(deduped)} examples to unique_words_output.json")

if __name__ == '__main__':
    main()
