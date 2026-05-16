import { translations } from './data.js';

let currentLang = 'es';

const langToggle = document.getElementById('lang-toggle');

function updateContent(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    document.title = t.title;
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    updateContent(currentLang);
});

// Intersection Observer for staggered reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.cell').forEach(cell => {
    cell.style.animationPlayState = 'paused';
    observer.observe(cell);
});

updateContent(currentLang);
