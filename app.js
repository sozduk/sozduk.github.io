// Kyrgyz Phonology Interactive Application

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    updateLangButtons();
    initLetterPickers();
    initContrastsGrid();
    initSmoothScroll();
});

// State
let selectedLetter1 = null;
let selectedLetter2 = null;

// Initialize letter picker grids
function initLetterPickers() {
    const picker1 = document.getElementById('picker1');
    const picker2 = document.getElementById('picker2');
    if (!picker1 || !picker2) return;

    PHONOLOGY_DATA.alphabet.forEach(letter => {
        // Picker 1
        const btn1 = document.createElement('button');
        btn1.className = 'picker-btn';
        btn1.textContent = letter.toUpperCase();
        btn1.dataset.letter = letter;
        if (PHONOLOGY_DATA.nativeLetters.includes(letter)) {
            btn1.classList.add('native');
        }
        btn1.onclick = () => selectLetter(1, letter);
        picker1.appendChild(btn1);

        // Picker 2
        const btn2 = document.createElement('button');
        btn2.className = 'picker-btn';
        btn2.textContent = letter.toUpperCase();
        btn2.dataset.letter = letter;
        if (PHONOLOGY_DATA.nativeLetters.includes(letter)) {
            btn2.classList.add('native');
        }
        btn2.onclick = () => selectLetter(2, letter);
        picker2.appendChild(btn2);
    });
}

// Select a letter in picker
function selectLetter(picker, letter) {
    if (picker === 1) {
        selectedLetter1 = letter;
        // Update picker 1 buttons
        document.querySelectorAll('#picker1 .picker-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.letter === letter);
        });
    } else {
        selectedLetter2 = letter;
        // Update picker 2 buttons
        document.querySelectorAll('#picker2 .picker-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.letter === letter);
        });
    }

    // Show contrast if both selected
    if (selectedLetter1 && selectedLetter2) {
        showContrast(selectedLetter1, selectedLetter2);
    }
}

// Show contrast between two letters
function showContrast(letter1, letter2) {
    const display = document.getElementById('contrast-display');
    if (!display) return;

    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];

    // Create key (alphabetically sorted)
    const key = [letter1, letter2].sort().join('-');
    const contrast = PHONOLOGY_DATA.contrasts[key];

    if (letter1 === letter2) {
        display.innerHTML = `
            <div class="contrast-not-found">
                <p>${t.same_letter || 'Бир эле тамганы тандадыңыз'}</p>
            </div>
        `;
        return;
    }

    if (!contrast) {
        display.innerHTML = `
            <div class="contrast-not-found">
                <p>${t.no_contrast || 'Бул эки тамга үчүн минималдык жуп табылган жок'}</p>
            </div>
        `;
        return;
    }

    // Highlight the differing letters
    const word1Html = highlightDiff(contrast.word1, contrast.position - 1, false);
    const word2Html = highlightDiff(contrast.word2, contrast.position - 1, true);

    display.innerHTML = `
        <div class="contrast-result">
            <div class="contrast-header">
                <div class="contrast-letter">${letter1.toUpperCase()}</div>
                <span class="contrast-vs">≠</span>
                <div class="contrast-letter second">${letter2.toUpperCase()}</div>
            </div>
            <div class="contrast-proof">
                <span class="proof-word">${word1Html}</span>
                <span class="proof-separator">⟷</span>
                <span class="proof-word second">${word2Html}</span>
            </div>
            <p style="margin-top: var(--space-lg); color: var(--color-text-light); font-size: 0.9rem;">
                ${t.position || 'Позиция'}: ${contrast.position}
            </p>
        </div>
    `;
}

// Highlight differing letter in word
function highlightDiff(word, position, isSecond) {
    const before = word.slice(0, position);
    const letter = word[position];
    const after = word.slice(position + 1);
    return `${before}<span class="diff">${letter}</span>${after}`;
}

// Initialize all contrasts grid
function initContrastsGrid() {
    const grid = document.getElementById('contrasts-grid');
    if (!grid) return;

    Object.keys(PHONOLOGY_DATA.contrasts).forEach(key => {
        const [l1, l2] = key.split('-');
        const chip = document.createElement('div');
        chip.className = 'contrast-chip';
        chip.innerHTML = `<span class="letter1">${l1.toUpperCase()}</span> ≠ <span class="letter2">${l2.toUpperCase()}</span>`;
        chip.onclick = () => {
            selectLetter(1, l1);
            selectLetter(2, l2);
            // Scroll to display
            document.getElementById('contrast-display')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
        grid.appendChild(chip);
    });
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
