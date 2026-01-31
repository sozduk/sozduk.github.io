#!/usr/bin/env python3
"""
Find words with vowel harmony in the Yudakhin Kyrgyz-Russian dictionary.
Kyrgyz has vowel harmony - words tend to use either front vowels or back vowels.
This script finds words where ALL vowels are the same.
"""

import os
import json
from collections import defaultdict

# Kyrgyz vowels
FRONT_VOWELS = set('эеиөү')  # Front vowels
BACK_VOWELS = set('аоуыё')   # Back vowels (ё is back in Kyrgyz context)
ALL_VOWELS = FRONT_VOWELS | BACK_VOWELS | {'ю', 'я'}  # ю, я are diphthongs

# Kyrgyz alphabet (lowercase)
KYRGYZ_ALPHABET = set('абвгдеёжзийклмнңоөпрстуүфхцчшщъыьэюя')

def load_dictionary(filepath):
    """Load words with their translations from dictionary file."""
    words = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split('\t')
            if len(parts) >= 2:
                word = parts[0].strip().lower()
                translation = parts[1].strip()
                # Only include words with valid Kyrgyz letters, min 2 chars
                if word and len(word) >= 2 and all(c in KYRGYZ_ALPHABET for c in word):
                    if word not in words:
                        words[word] = translation
    return words

def get_vowels_in_word(word):
    """Return list of vowels in a word."""
    return [c for c in word if c in ALL_VOWELS]

def find_same_vowel_words(words):
    """Find words where all vowels are the same."""
    result = defaultdict(list)
    
    for word, translation in words.items():
        vowels = get_vowels_in_word(word)
        if len(vowels) >= 2:  # At least 2 vowels
            unique_vowels = set(vowels)
            if len(unique_vowels) == 1:  # All vowels are the same
                vowel = vowels[0]
                result[vowel].append({
                    'word': word,
                    'translation': translation,
                    'vowel_count': len(vowels)
                })
    
    # Sort each vowel's words by length and vowel count
    for vowel in result:
        result[vowel].sort(key=lambda x: (-x['vowel_count'], len(x['word'])))
    
    return result

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dict_path = os.path.join(script_dir, 'udahin_txt', 'kg_ru_udahin.txt')
    
    print("Loading dictionary...")
    words = load_dictionary(dict_path)
    print(f"Loaded {len(words)} valid words")
    
    print("\nFinding words with same vowels...")
    same_vowel_words = find_same_vowel_words(words)
    
    # Statistics
    print("\n=== STATISTICS ===")
    total = 0
    for vowel in sorted(same_vowel_words.keys()):
        count = len(same_vowel_words[vowel])
        total += count
        print(f"{vowel}: {count} words")
    print(f"Total: {total} words")
    
    # Save to JSON
    output_path = os.path.join(script_dir, 'vowel_harmony_data.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(dict(same_vowel_words), f, ensure_ascii=False, indent=2)
    print(f"\nSaved to {output_path}")
    
    # Generate JavaScript data file
    js_path = os.path.join(script_dir, 'vowel_harmony_data.js')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write('// Words with same vowel throughout (vowel harmony examples)\n')
        f.write('// Generated from Yudakhin dictionary\n\n')
        f.write('const VOWEL_HARMONY_WORDS = {\n')
        
        for vowel in sorted(same_vowel_words.keys()):
            words_list = same_vowel_words[vowel]
            # Take top 50 words per vowel (most vowels first)
            top_words = words_list[:50]
            
            f.write(f'    "{vowel}": [\n')
            for item in top_words:
                word = item['word'].replace('"', '\\"')
                trans = item['translation'].replace('"', '\\"').replace('\n', ' ')[:100]
                f.write(f'        {{ word: "{word}", translation: "{trans}", count: {item["vowel_count"]} }},\n')
            f.write('    ],\n')
        
        f.write('};\n\n')
        
        # Add vowel categories
        f.write('const VOWEL_CATEGORIES = {\n')
        f.write('    front: ["э", "е", "и", "ө", "ү"],\n')
        f.write('    back: ["а", "о", "у", "ы"],\n')
        f.write('    special: ["ю", "я", "ё"]\n')
        f.write('};\n')
    
    print(f"Generated {js_path}")
    
    # Print examples
    print("\n=== EXAMPLES ===")
    for vowel in sorted(same_vowel_words.keys()):
        words_list = same_vowel_words[vowel][:5]
        print(f"\n{vowel.upper()}:")
        for item in words_list:
            print(f"  {item['word']} ({item['vowel_count']} vowels) - {item['translation'][:50]}...")

if __name__ == '__main__':
    main()
