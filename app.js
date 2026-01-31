// Kyrgyz Phonology Interactive Application

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    updateLangButtons();
    initAlphabetGrid();
    initLetterSelector();
    initSmoothScroll();
});

// Initialize the alphabet grid in the dark section
function initAlphabetGrid() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid) return;

    PHONOLOGY_DATA.alphabet.forEach(letter => {
        const div = document.createElement('div');
        div.className = 'alphabet-letter';
        div.textContent = letter.toUpperCase();
        
        // Add special classes
        if (PHONOLOGY_DATA.nativeLetters.includes(letter)) {
            div.classList.add('native');
        } else if (!PHONOLOGY_DATA.noPairs.includes(letter)) {
            div.classList.add('proven');
        } else {
            div.classList.add('no-pairs');
        }
        
        // Click to scroll to pairs section
        div.addEventListener('click', () => {
            const pairsSection = document.getElementById('pairs');
            if (pairsSection) {
                pairsSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => selectLetter(letter), 500);
            }
        });
        
        grid.appendChild(div);
    });
}

// Initialize the letter selector tabs
function initLetterSelector() {
    const tabs = document.getElementById('selector-tabs');
    if (!tabs) return;

    PHONOLOGY_DATA.alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'selector-tab';
        button.textContent = letter.toUpperCase();
        button.dataset.letter = letter;
        
        if (PHONOLOGY_DATA.noPairs.includes(letter)) {
            button.classList.add('no-pairs');
        }
        
        button.addEventListener('click', () => {
            if (!PHONOLOGY_DATA.noPairs.includes(letter)) {
                selectLetter(letter);
            }
        });
        
        tabs.appendChild(button);
    });
}

// Select a letter and display its minimal pairs
function selectLetter(letter) {
    // Update active tab
    const tabs = document.querySelectorAll('.selector-tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.letter === letter);
    });

    // Display pairs
    const display = document.getElementById('pairs-display');
    if (!display) return;

    const pairs = PHONOLOGY_DATA.letterPairs[letter];
    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];
    
    if (!pairs || pairs.length === 0) {
        display.innerHTML = `
            <div class="pairs-placeholder">
                <span class="placeholder-icon">∅</span>
                <p>${t.pairs_not_found}</p>
            </div>
        `;
        return;
    }

    const pairsHTML = pairs.map(pair => {
        const word1 = highlightLetter(pair.word1, pair.position - 1);
        const word2 = highlightLetter(pair.word2, pair.position - 1);
        
        return `
            <div class="pair-card">
                <span class="pair-word">${word1}</span>
                <span class="pair-separator">⟷</span>
                <span class="pair-word">${word2}</span>
                <span class="pair-position">${pair.position}${t.pairs_position}</span>
            </div>
        `;
    }).join('');

    display.innerHTML = `
        <div class="pairs-content">
            <div class="pairs-header">
                <div class="pairs-letter">${letter.toUpperCase()}</div>
                <p class="pairs-count">${pairs.length} ${t.pairs_found}</p>
            </div>
            <div class="pairs-list">
                ${pairsHTML}
            </div>
        </div>
    `;
}

// Highlight a specific letter in a word
function highlightLetter(word, position) {
    if (position < 0 || position >= word.length) return word;
    
    const before = word.slice(0, position);
    const letter = word[position];
    const after = word.slice(position + 1);
    
    return `${before}<span class="highlight">${letter}</span>${after}`;
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});
