#!/usr/bin/env python3
"""
Find minimal pairs for Kyrgyz phonemes from dictionary.
Minimal pair: two words that differ by exactly one letter.
This demonstrates the phonemic status of each grapheme.
"""
import re
from collections import defaultdict
import json

# Kyrgyz alphabet (36 letters)
KYRGYZ_ALPHABET = [
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н',
    'ң', 'о', 'ө', 'п', 'р', 'с', 'т', 'у', 'ү', 'ф', 'х', 'ц', 'ч', 'ш', 'щ',
    'ъ', 'ы', 'ь', 'э', 'ю', 'я'
]

def load_dictionary(filepath):
    """Load words from dictionary file"""
    words = set()
    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            parts = line.strip().split('\t')
            if parts:
                word = parts[0].lower().strip()
                # Only single words without spaces/punctuation
                if word and ' ' not in word and '-' not in word:
                    words.add(word)
    return words

def find_pairs_for_each_letter(words):
    """Find minimal pairs demonstrating each letter"""
    letter_pairs = {letter: [] for letter in KYRGYZ_ALPHABET}
    word_list = sorted(words)
    
    for i, word1 in enumerate(word_list):
        for word2 in word_list[i+1:]:
            if len(word1) != len(word2):
                continue
            
            diff_positions = []
            for pos, (c1, c2) in enumerate(zip(word1, word2)):
                if c1 != c2:
                    diff_positions.append((pos, c1, c2))
            
            if len(diff_positions) == 1:
                pos, c1, c2 = diff_positions[0]
                pair_info = {
                    'word1': word1,
                    'word2': word2,
                    'position': pos + 1,
                    'letter1': c1,
                    'letter2': c2
                }
                
                if c1 in letter_pairs and len(letter_pairs[c1]) < 5:
                    letter_pairs[c1].append(pair_info)
                if c2 in letter_pairs and len(letter_pairs[c2]) < 5:
                    letter_pairs[c2].append(pair_info)
    
    return letter_pairs

def main():
    print("Loading dictionary...")
    words = load_dictionary('udahin_txt/kg_ru_udahin.txt')
    print(f"Loaded {len(words)} unique words")

    print("\nFinding minimal pairs for each letter...")
    letter_pairs = find_pairs_for_each_letter(words)

    # Statistics
    found_letters = [l for l in KYRGYZ_ALPHABET if letter_pairs.get(l)]
    not_found_letters = [l for l in KYRGYZ_ALPHABET if not letter_pairs.get(l)]

    print("\n" + "="*60)
    print("MINIMAL PAIRS BY LETTER")
    print("="*60)

    for letter in KYRGYZ_ALPHABET:
        pairs = letter_pairs.get(letter, [])
        if pairs:
            print(f"\n{letter.upper()} ({len(pairs)} pairs found):")
            for p in pairs[:3]:
                print(f"  {p['word1']} / {p['word2']} (position {p['position']})")
        else:
            print(f"\n{letter.upper()}: No pairs found")

    print("\n" + "="*60)
    print(f"Letters with pairs found: {len(found_letters)}")
    print(f"Letters without pairs: {not_found_letters}")

    # Save to JSON
    output = {
        'alphabet': KYRGYZ_ALPHABET,
        'letter_pairs': letter_pairs,
        'stats': {
            'total_words': len(words),
            'letters_with_pairs': len(found_letters),
            'letters_without_pairs': not_found_letters
        }
    }

    with open('minimal_pairs_output.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print("\nSaved to minimal_pairs_output.json")

if __name__ == '__main__':
    main()
