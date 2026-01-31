// Vowel & Consonant Harmony Page JavaScript

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('open');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.menu-btn');
    if (mobileNav && mobileNav.classList.contains('open')) {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileNav.classList.remove('open');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    updateLangButtons();
    initLetterButtons();
    
    // Select "А" by default
    const defaultBtn = document.querySelector('.letter-btn[data-letter="а"]');
    if (defaultBtn) {
        defaultBtn.click();
    }
});

// Letter buttons interaction
function initLetterButtons() {
    document.querySelectorAll('.letter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            document.querySelectorAll('.letter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const letter = btn.dataset.letter;
            const type = btn.dataset.type;
            showWords(letter, type);
        });
    });
}

function showWords(letter, type) {
    const data = type === 'vowel' ? VOWEL_HARMONY_WORDS : CONSONANT_HARMONY_WORDS;
    const words = data[letter] || [];
    const container = document.getElementById('wordsContainer');
    const resultHeader = document.getElementById('resultHeader');
    const badge = document.getElementById('resultBadge');
    const countEl = document.getElementById('resultCount');
    const typeEl = document.getElementById('resultType');
    const lang = getCurrentLang();
    
    // Update header
    badge.textContent = letter.toUpperCase();
    badge.className = 'result-badge ' + type;
    
    const wordLabel = TRANSLATIONS[lang]?.harmony_words_label || 'сөз';
    countEl.textContent = `${words.length} ${wordLabel}`;
    
    if (words.length === 0) {
        container.innerHTML = `
            <div class="no-results-msg">
                <p>${TRANSLATIONS[lang]?.harmony_no_words || 'Сөз табылган жок'}</p>
            </div>
        `;
        return;
    }
    
    // Create word cards
    let html = '<div class="harmony-words-grid">';
    
    words.forEach((item, index) => {
        const highlightedWord = highlightLetter(item.word, letter);
        const delay = Math.min(index * 20, 200);
        
        html += `
            <div class="harmony-word-card" style="animation-delay: ${delay}ms">
                <div class="word-main">${highlightedWord}</div>
                <div class="word-translation">${item.translation}</div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

function highlightLetter(word, letter) {
    const regex = new RegExp(letter, 'gi');
    return word.replace(regex, `<span class="hl">$&</span>`);
}
