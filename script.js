// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Initialize AOS (Animate On Scroll)
if (window.AOS) {
    AOS.init({
        duration: 700,
        easing: 'cubic-bezier(.2,.9,.2,1)',
        once: true,
        offset: 80
    });
}

// Theme toggle (persist in localStorage)
const themeToggle = document.getElementById('themeToggle');
function applyTheme(dark) {
    if (dark) document.body.classList.add('dark'); else document.body.classList.remove('dark');
    themeToggle.textContent = dark ? '☀️' : '🌙';
}
const isDark = localStorage.getItem('site-theme') === 'dark';
applyTheme(isDark);
themeToggle.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark');
    applyTheme(dark);
    localStorage.setItem('site-theme', dark ? 'dark' : 'light');
});

// Simple reveal on scroll for elements with .reveal (works alongside AOS)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Keyboard accessible hover effect: add hover state on focus
const hoverables = document.querySelectorAll('.service-card, .project-card, .review-card, .btn-primary, .navbar nav a');
hoverables.forEach(el => {
    el.addEventListener('focus', () => el.classList.add('keyboard-focus'));
    el.addEventListener('blur', () => el.classList.remove('keyboard-focus'));
});
