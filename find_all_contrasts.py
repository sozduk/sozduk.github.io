#!/usr/bin/env python3
"""
Find all minimal pairs (contrasts) in the Yudakhin Kyrgyz-Russian dictionary.
A minimal pair proves that two letters represent distinct phonemes.
"""

import os
import json
from collections import defaultdict

# Kyrgyz alphabet (lowercase)
KYRGYZ_ALPHABET = set('абвгдеёжзийклмнңоөпрстуүфхцчшщъыьэюя')

def load_dictionary(filepath):
    """Load words from dictionary file with translations."""
    words = {}
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split('\t')
            if len(parts) >= 2:
                word = parts[0].strip().lower()
                translation = parts[1].strip().replace('\n', ' ').replace('\\n', ' ')
                if len(translation) > 60:
                    translation = translation[:60] + '...'
                # Only include words with valid Kyrgyz letters
                if word and all(c in KYRGYZ_ALPHABET for c in word):
                    if word not in words:
                        words[word] = translation
    return words

def find_all_contrasts(words):
    """Find ALL minimal pairs - words differing by exactly one letter."""
    contrasts = defaultdict(list)
    word_list = sorted(words.keys())
    word_set = set(word_list)
    
    # For each word, try replacing each position with other letters
    for word in word_list:
        for pos in range(len(word)):
            original_letter = word[pos]
            
            # Try each letter in alphabet
            for new_letter in KYRGYZ_ALPHABET:
                if new_letter == original_letter:
                    continue
                
                # Create the potential pair word
                other_word = word[:pos] + new_letter + word[pos+1:]
                
                if other_word in word_set:
                    # Found a minimal pair!
                    # Sort letters alphabetically for consistent key
                    letters = tuple(sorted([original_letter, new_letter]))
                    key = f"{letters[0]}-{letters[1]}"
                    
                    # Determine word order (word1 has first letter alphabetically)
                    if original_letter == letters[0]:
                        pair = {
                            'word1': word,
                            'word2': other_word,
                            'trans1': words[word],
                            'trans2': words[other_word],
                            'position': pos + 1
                        }
                    else:
                        pair = {
                            'word1': other_word,
                            'word2': word,
                            'trans1': words[other_word],
                            'trans2': words[word],
                            'position': pos + 1
                        }
                    
                    # Check if this exact pair already exists
                    pair_key = (pair['word1'], pair['word2'])
                    existing = [p for p in contrasts[key] if (p['word1'], p['word2']) == pair_key]
                    if not existing:
                        contrasts[key].append(pair)
    
    # Sort pairs by word length, then alphabetically
    for key in contrasts:
        contrasts[key].sort(key=lambda p: (len(p['word1']), p['word1']))
    
    return dict(contrasts)

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dict_path = os.path.join(script_dir, 'udahin_txt', 'kg_ru_udahin.txt')
    
    print("Loading dictionary...")
    words = load_dictionary(dict_path)
    print(f"Loaded {len(words)} valid words")
    
    print("\nFinding all contrasts...")
    contrasts = find_all_contrasts(words)
    
    total_pairs = sum(len(pairs) for pairs in contrasts.values())
    print(f"\nFound {len(contrasts)} unique letter contrasts with {total_pairs} total pairs")
    
    # Save to JSON
    output_path = os.path.join(script_dir, 'all_contrasts.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(contrasts, f, ensure_ascii=False, indent=2, sort_keys=True)
    
    print(f"Saved to {output_path}")
    
    # Print sample contrasts
    print("\n=== SAMPLE CONTRASTS ===")
    for key in sorted(contrasts.keys())[:10]:
        pairs = contrasts[key]
        print(f"{key}: {len(pairs)} pairs")
        for p in pairs[:3]:
            print(f"  {p['word1']} / {p['word2']} (pos {p['position']})")
    
    # Check which letter pairs are missing
    found_pairs = set(contrasts.keys())
    
    print("\n=== COVERAGE CHECK ===")
    letters_with_contrasts = set()
    for key in found_pairs:
        l1, l2 = key.split('-')
        letters_with_contrasts.add(l1)
        letters_with_contrasts.add(l2)
    
    missing = KYRGYZ_ALPHABET - letters_with_contrasts
    print(f"Letters with contrasts: {len(letters_with_contrasts)}/36")
    if missing:
        print(f"Letters without any contrasts: {sorted(missing)}")
    
    # Generate JavaScript with ALL pairs
    js_path = os.path.join(script_dir, 'data.js')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write('// All minimal pair contrasts from Yudakhin dictionary\n')
        f.write(f'// Total: {len(contrasts)} contrasts, {total_pairs} pairs\n\n')
        f.write('var CONTRASTS = {\n')
        for key in sorted(contrasts.keys()):
            pairs = contrasts[key]
            f.write(f'    "{key}": [\n')
            for p in pairs:
                w1 = json.dumps(p['word1'], ensure_ascii=False)
                w2 = json.dumps(p['word2'], ensure_ascii=False)
                t1 = json.dumps(p['trans1'], ensure_ascii=False)
                t2 = json.dumps(p['trans2'], ensure_ascii=False)
                f.write(f'        {{ word1: {w1}, word2: {w2}, trans1: {t1}, trans2: {t2}, position: {p["position"]} }},\n')
            f.write('    ],\n')
        f.write('};\n\n')
        
        # Add PHONOLOGY_DATA object
        alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
                    'ң', 'о', 'ө', 'п', 'р', 'с', 'т', 'у', 'ү', 'ф', 'х', 'ц', 'ч', 'ш', 'щ',
                    'ъ', 'ы', 'ь', 'э', 'ю', 'я']
        f.write('var PHONOLOGY_DATA = {\n')
        f.write(f'    alphabet: {json.dumps(alphabet, ensure_ascii=False)},\n')
        f.write('    nativeLetters: ["ң", "ө", "ү"],\n')
        f.write('    contrasts: CONTRASTS\n')
        f.write('};\n')
    
    print(f"\nGenerated {js_path}")

if __name__ == '__main__':
    main()
