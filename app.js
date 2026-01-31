// Kyrgyz Phonology Interactive Application

// English translations for common Kyrgyz words in minimal pairs
const WORD_TRANSLATIONS = {
    // Common words
    "бар": { ru: "есть, имеется", en: "there is, exists" },
    "пар": { ru: "пар", en: "steam" },
    "бал": { ru: "мёд", en: "honey" },
    "мал": { ru: "скот", en: "livestock" },
    "тал": { ru: "ива", en: "willow" },
    "дал": { ru: "точно", en: "exactly" },
    "кал": { ru: "останься", en: "stay" },
    "сал": { ru: "положи", en: "put" },
    "ат": { ru: "лошадь; имя", en: "horse; name" },
    "от": { ru: "огонь; трава", en: "fire; grass" },
    "ит": { ru: "собака", en: "dog" },
    "эт": { ru: "мясо", en: "meat" },
    "ак": { ru: "белый", en: "white" },
    "ок": { ru: "пуля", en: "bullet" },
    "ук": { ru: "слушай", en: "listen" },
    "кол": { ru: "рука", en: "hand, arm" },
    "көл": { ru: "озеро", en: "lake" },
    "кул": { ru: "раб", en: "slave" },
    "күл": { ru: "пепел", en: "ash" },
    "тор": { ru: "сеть", en: "net" },
    "той": { ru: "праздник, пир", en: "feast, celebration" },
    "бор": { ru: "мел", en: "chalk" },
    "жар": { ru: "обрыв; супруг", en: "cliff; spouse" },
    "чар": { ru: "крик", en: "cry, shout" },
    "шар": { ru: "шар", en: "ball, sphere" },
    "сар": { ru: "жёлтый (диал.)", en: "yellow (dial.)" },
    "зар": { ru: "плач, стон", en: "lament, moan" },
    "нар": { ru: "верблюд", en: "camel" },
    "тар": { ru: "узкий", en: "narrow" },
    "кар": { ru: "снег", en: "snow" },
    "бак": { ru: "сад; счастье", en: "garden; happiness" },
    "так": { ru: "точно; подкова", en: "exact; horseshoe" },
    "сан": { ru: "число; бедро", en: "number; thigh" },
    "тан": { ru: "рассвет", en: "dawn" },
    "ан": { ru: "зверь", en: "animal, beast" },
    "аң": { ru: "зверь (охотн.)", en: "game animal" },
    "кан": { ru: "кровь; хан", en: "blood; khan" },
    "хан": { ru: "хан", en: "khan" },
    "жол": { ru: "дорога", en: "road, way" },
    "тол": { ru: "наполнись", en: "fill up" },
    "бул": { ru: "это", en: "this" },
    "кыл": { ru: "волос; делай", en: "hair; do" },
    "тыл": { ru: "тыл", en: "rear (military)" },
    "тил": { ru: "язык", en: "tongue, language" },
    "бил": { ru: "знай", en: "know" },
    "кир": { ru: "грязь; войди", en: "dirt; enter" },
    "кыр": { ru: "гребень; режь", en: "ridge; cut" },
    "түн": { ru: "ночь", en: "night" },
    "күн": { ru: "солнце; день", en: "sun; day" },
    "көн": { ru: "привыкни", en: "get used to" },
    "тын": { ru: "дыхание", en: "breath" },
    "эл": { ru: "народ", en: "people, nation" },
    "ел": { ru: "ветер", en: "wind" },
    "ал": { ru: "он; возьми", en: "he/she; take" },
    "ам": { ru: "теперь", en: "now" },
    "ар": { ru: "честь; каждый", en: "honor; each" },
    "аш": { ru: "еда; поминки", en: "food; funeral feast" },
    "ач": { ru: "открой; голодный", en: "open; hungry" },
    "аж": { ru: "паломничество", en: "pilgrimage" },
    "бел": { ru: "поясница", en: "waist, back" },
    "жал": { ru: "грива", en: "mane" },
    "шал": { ru: "старик", en: "old man" },
    "чал": { ru: "старик", en: "old man" },
    "калам": { ru: "перо, ручка", en: "pen" },
    "салам": { ru: "привет", en: "hello, greeting" },
    "талам": { ru: "грабёж", en: "robbery" },
    "халат": { ru: "халат", en: "robe" },
    "калат": { ru: "останется", en: "will stay" },
    "араак": { ru: "водка", en: "vodka, spirits" },
    "арбак": { ru: "дух предков", en: "ancestral spirit" },
    "факты": { ru: "факты", en: "facts" },
    "бакты": { ru: "счастье", en: "happiness" },
    "щит": { ru: "щит", en: "shield" },
    "бит": { ru: "вошь; кончись", en: "louse; end" },
    // Add more as needed...
};

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    updateLangButtons();
    initLetterPickers();
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

// Get all letters that have a contrast with the given letter
function getAvailablePairs(letter) {
    const pairs = new Set();
    Object.keys(PHONOLOGY_DATA.contrasts).forEach(key => {
        const [l1, l2] = key.split('-');
        if (l1 === letter) pairs.add(l2);
        if (l2 === letter) pairs.add(l1);
    });
    return pairs;
}

// Select a letter in picker
function selectLetter(picker, letter) {
    if (picker === 1) {
        selectedLetter1 = letter;
        // Update picker 1 buttons
        document.querySelectorAll('#picker1 .picker-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.letter === letter);
        });
        
        // Highlight available pairs in picker 2
        const availablePairs = getAvailablePairs(letter);
        document.querySelectorAll('#picker2 .picker-btn').forEach(btn => {
            const btnLetter = btn.dataset.letter;
            btn.classList.remove('available', 'unavailable');
            if (btnLetter === letter) {
                btn.classList.add('unavailable');
            } else if (availablePairs.has(btnLetter)) {
                btn.classList.add('available');
            } else {
                btn.classList.add('unavailable');
            }
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
    const pairs = PHONOLOGY_DATA.contrasts[key];

    if (letter1 === letter2) {
        display.innerHTML = `
            <div class="contrast-not-found">
                <p>${t.same_letter || 'Бир эле тамганы тандадыңыз'}</p>
            </div>
        `;
        return;
    }

    if (!pairs || pairs.length === 0) {
        display.innerHTML = `
            <div class="contrast-not-found">
                <p>${t.no_contrast || 'Бул эки тамга үчүн минималдык жуп табылган жок'}</p>
            </div>
        `;
        return;
    }

    // Build HTML for all pairs
    let pairsHtml = '';
    pairs.forEach((pair, index) => {
        const delay = Math.min(index * 30, 300);
        
        // Highlight differing letter
        const word1Html = highlightDiff(pair.word1, pair.position - 1, false);
        const word2Html = highlightDiff(pair.word2, pair.position - 1, true);
        
        // Get translation based on language
        let trans1 = pair.trans1;
        let trans2 = pair.trans2;
        
        // For English, try to use WORD_TRANSLATIONS or show Russian translation
        if (lang === 'en') {
            const word1Trans = WORD_TRANSLATIONS[pair.word1];
            const word2Trans = WORD_TRANSLATIONS[pair.word2];
            if (word1Trans) trans1 = word1Trans.en;
            if (word2Trans) trans2 = word2Trans.en;
        }
        
        pairsHtml += `
            <div class="pair-card" style="animation-delay: ${delay}ms">
                <div class="pair-words">
                    <div class="pair-word">
                        <span class="word-main">${word1Html}</span>
                        <span class="word-trans">${trans1}</span>
                    </div>
                    <span class="pair-arrow">↔</span>
                    <div class="pair-word second">
                        <span class="word-main">${word2Html}</span>
                        <span class="word-trans">${trans2}</span>
                    </div>
                </div>
            </div>
        `;
    });

    display.innerHTML = `
        <div class="contrast-result-full">
            <div class="contrast-header">
                <div class="contrast-letter">${letter1.toUpperCase()}</div>
                <span class="contrast-vs">≠</span>
                <div class="contrast-letter second">${letter2.toUpperCase()}</div>
                <span class="pairs-count">${pairs.length} ${t.pairs_count || 'жуп'}</span>
            </div>
            <div class="pairs-grid">
                ${pairsHtml}
            </div>
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
