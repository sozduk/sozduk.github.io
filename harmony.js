// Vowel Harmony Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initVowelButtons();
});

// Language handling
function initLanguage() {
    const savedLang = localStorage.getItem('phonology-lang') || 'ky';
    setLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
}

function setLanguage(lang) {
    localStorage.setItem('phonology-lang', lang);
    document.documentElement.lang = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    });
}

// Vowel buttons
function initVowelButtons() {
    document.querySelectorAll('.vowel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            document.querySelectorAll('.vowel-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const vowel = btn.dataset.vowel;
            showVowelWords(vowel);
        });
    });
}

function showVowelWords(vowel) {
    const words = VOWEL_HARMONY_WORDS[vowel] || [];
    const container = document.getElementById('wordsContainer');
    const vowelDisplay = document.getElementById('selectedVowel');
    const countDisplay = document.getElementById('wordCount');
    const lang = localStorage.getItem('phonology-lang') || 'ky';
    
    vowelDisplay.textContent = vowel.toUpperCase();
    
    // Update count with translation
    const wordLabel = TRANSLATIONS[lang]?.harmony_words_label || 'сөз';
    countDisplay.textContent = `${words.length} ${wordLabel}`;
    
    if (words.length === 0) {
        container.innerHTML = `<p class="placeholder-text">${TRANSLATIONS[lang]?.harmony_no_words || 'Сөз табылган жок'}</p>`;
        return;
    }
    
    // Create words grid
    let html = '<div class="harmony-words-grid">';
    
    words.forEach(item => {
        // Highlight the vowel in the word
        const highlightedWord = highlightVowel(item.word, vowel);
        
        html += `
            <div class="harmony-word-card">
                <div class="word-main">${highlightedWord}</div>
                <div class="word-meta">${item.count} ${vowel.toUpperCase()}</div>
                <div class="word-translation">${item.translation}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function highlightVowel(word, vowel) {
    // Highlight all instances of the vowel
    const regex = new RegExp(vowel, 'gi');
    return word.replace(regex, `<span class="highlighted-vowel">$&</span>`);
}
