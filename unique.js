// Unique Words Page Application

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

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    updateLangButtons();
    initCategoryFilters();
    initSearch();
    renderWords();
});

let currentCategory = 'all';
let searchTerm = '';

// Initialize category filter buttons
function initCategoryFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    const lang = getCurrentLang();
    const t = TRANSLATIONS[lang];
    
    // All button
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.dataset.category = 'all';
    allBtn.textContent = t.unique_all || 'All';
    allBtn.onclick = () => filterByCategory('all');
    container.appendChild(allBtn);

    // Category buttons
    const categories = ['general', 'family', 'nature', 'folklore', 'emotion', 'dialect', 'archaic'];
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = cat;
        btn.textContent = getCategoryName(cat, lang);
        btn.onclick = () => filterByCategory(cat);
        container.appendChild(btn);
    });
}

// Get category name in current language
function getCategoryName(category, lang) {
    const names = {
        general: { ky: 'Жалпы', ru: 'Общие', en: 'General' },
        family: { ky: 'Үй-бүлө', ru: 'Семья', en: 'Family' },
        nature: { ky: 'Жаратылыш', ru: 'Природа', en: 'Nature' },
        folklore: { ky: 'Фольклор', ru: 'Фольклор', en: 'Folklore' },
        emotion: { ky: 'Сезимдер', ru: 'Эмоции', en: 'Emotions' },
        dialect: { ky: 'Диалект', ru: 'Диалект', en: 'Dialect' },
        archaic: { ky: 'Эски', ru: 'Устаревшие', en: 'Archaic' }
    };
    return names[category]?.[lang] || category;
}

// Filter words by category
function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    renderWords();
}

// Initialize search functionality
function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    
    input.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderWords();
    });
}

// Render words grid
function renderWords() {
    const container = document.getElementById('words-grid');
    if (!container) return;

    let words = UNIQUE_WORDS_DATA.words;

    // Filter by category
    if (currentCategory !== 'all') {
        words = words.filter(w => w.category === currentCategory);
    }

    // Filter by search term
    if (searchTerm) {
        words = words.filter(w => 
            w.word.toLowerCase().includes(searchTerm) ||
            w.translation.toLowerCase().includes(searchTerm)
        );
    }

    // Render
    if (words.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <p>Сөз табылган жок / No words found</p>
            </div>
        `;
        return;
    }

    const lang = getCurrentLang();
    
    container.innerHTML = words.map(word => `
        <div class="word-card">
            <div class="word-header">
                <h3 class="word-title">${word.word}</h3>
                <span class="word-count">${word.wordCount} ${lang === 'en' ? 'words' : 'сөз'}</span>
            </div>
            <p class="word-translation">${word.translation}</p>
            <span class="word-category">${getCategoryName(word.category, lang)}</span>
        </div>
    `).join('');
}

// Override setLang to re-render on language change
const originalSetLang = setLang;
setLang = function(lang) {
    originalSetLang(lang);
    // Re-render category filters with new language
    const container = document.getElementById('category-filters');
    if (container) {
        container.innerHTML = '';
        initCategoryFilters();
    }
    renderWords();
};
