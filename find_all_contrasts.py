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
    """Load words from dictionary file."""
    words = set()
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split('\t')
            if parts:
                word = parts[0].strip().lower()
                # Only include words with valid Kyrgyz letters
                if word and all(c in KYRGYZ_ALPHABET for c in word):
                    words.add(word)
    return words

def find_all_contrasts(words):
    """Find all minimal pairs - words differing by exactly one letter."""
    contrasts = {}
    word_list = sorted(words)
    
    # Build index by length for efficiency
    by_length = defaultdict(list)
    for word in word_list:
        by_length[len(word)].append(word)
    
    # For each word length, find pairs
    for length, length_words in by_length.items():
        print(f"Processing {len(length_words)} words of length {length}...")
        
        # Build index by pattern (word with one position as wildcard)
        for word in length_words:
            for pos in range(length):
                # Create pattern: word with position 'pos' as wildcard
                pattern = word[:pos] + '*' + word[pos+1:]
                letter = word[pos]
                
                # Find all words matching this pattern
                for other_word in length_words:
                    if other_word == word:
                        continue
                    other_letter = other_word[pos]
                    if other_word[:pos] == word[:pos] and other_word[pos+1:] == word[pos+1:]:
                        # Found a minimal pair!
                        # Sort letters alphabetically for consistent key
                        letters = tuple(sorted([letter, other_letter]))
                        key = f"{letters[0]}-{letters[1]}"
                        
                        if key not in contrasts:
                            # Determine which word has which letter
                            if letter == letters[0]:
                                contrasts[key] = {
                                    'word1': word,
                                    'word2': other_word,
                                    'position': pos + 1  # 1-indexed
                                }
                            else:
                                contrasts[key] = {
                                    'word1': other_word,
                                    'word2': word,
                                    'position': pos + 1
                                }
    
    return contrasts

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dict_path = os.path.join(script_dir, 'udahin_txt', 'kg_ru_udahin.txt')
    
    print("Loading dictionary...")
    words = load_dictionary(dict_path)
    print(f"Loaded {len(words)} valid words")
    
    print("\nFinding all contrasts...")
    contrasts = find_all_contrasts(words)
    
    print(f"\nFound {len(contrasts)} unique letter contrasts")
    
    # Save to JSON
    output_path = os.path.join(script_dir, 'all_contrasts.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(contrasts, f, ensure_ascii=False, indent=2, sort_keys=True)
    
    print(f"Saved to {output_path}")
    
    # Print all contrasts
    print("\n=== ALL CONTRASTS ===")
    for key in sorted(contrasts.keys()):
        c = contrasts[key]
        print(f"{key}: {c['word1']} / {c['word2']} (pos {c['position']})")
    
    # Check which letter pairs are missing
    all_letters = sorted(KYRGYZ_ALPHABET)
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
    
    # Generate JavaScript
    js_path = os.path.join(script_dir, 'data.js')
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write('// All minimal pair contrasts from Yudakhin dictionary\n')
        f.write(f'// Total: {len(contrasts)} contrasts\n')
        f.write('const CONTRASTS = {\n')
        for key in sorted(contrasts.keys()):
            c = contrasts[key]
            f.write(f'    "{key}": {{ word1: "{c["word1"]}", word2: "{c["word2"]}", position: {c["position"]} }},\n')
        f.write('};\n')
    
    print(f"\nGenerated {js_path}")

if __name__ == '__main__':
    main()
