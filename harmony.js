// Vowel Harmony Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    updateLangButtons();
    initVowelPills();
});

// Vowel pills interaction
function initVowelPills() {
    document.querySelectorAll('.vowel-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all
            document.querySelectorAll('.vowel-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            const vowel = pill.dataset.vowel;
            showVowelWords(vowel);
        });
    });
}

function showVowelWords(vowel) {
    const words = VOWEL_HARMONY_WORDS[vowel] || [];
    const container = document.getElementById('wordsContainer');
    const resultHeader = document.getElementById('resultHeader');
    const vowelBadge = document.getElementById('vowelBadge');
    const resultCount = document.getElementById('resultCount');
    const lang = getCurrentLang();
    
    // Show result header
    resultHeader.style.display = 'flex';
    vowelBadge.textContent = vowel.toUpperCase();
    vowelBadge.className = 'result-vowel-badge';
    
    // Add color class based on vowel type
    const backVowels = ['а', 'о', 'у', 'ы'];
    if (backVowels.includes(vowel)) {
        vowelBadge.classList.add('back');
    } else {
        vowelBadge.classList.add('front');
    }
    
    // Update count
    const wordLabel = TRANSLATIONS[lang]?.harmony_words_label || 'сөз';
    resultCount.textContent = `${words.length} ${wordLabel}`;
    
    if (words.length === 0) {
        container.innerHTML = `
            <div class="harmony-placeholder">
                <div class="placeholder-icon">∅</div>
                <p>${TRANSLATIONS[lang]?.harmony_no_words || 'Сөз табылган жок'}</p>
            </div>
        `;
        return;
    }
    
    // Create modern word cards
    let html = '<div class="harmony-words-grid">';
    
    words.forEach((item, index) => {
        const highlightedWord = highlightVowel(item.word, vowel);
        const delay = Math.min(index * 30, 300);
        
        html += `
            <div class="harmony-word-card" style="animation-delay: ${delay}ms">
                <div class="word-header">
                    <span class="word-main">${highlightedWord}</span>
                    <span class="vowel-badge">${item.count}×${vowel.toUpperCase()}</span>
                </div>
                <div class="word-translation">${item.translation}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function highlightVowel(word, vowel) {
    const regex = new RegExp(vowel, 'gi');
    return word.replace(regex, `<span class="hl-vowel">$&</span>`);
}
