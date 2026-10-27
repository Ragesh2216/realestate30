/**
 * Stackly Real Estate - Main Script
 * Handles Sticky Header state & Full-Screen Mobile Navigation Overlay
 */

// Global Toggle & Close functions for inline onclick handlers
function toggleMobileNav() {
    const nav = document.querySelector('.main-navigation');
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const body = document.body;
    if (!nav) return;

    const isOpen = nav.classList.toggle('is-open');
    body.classList.toggle('nav-menu-open', isOpen);

    if (toggleBtn) {
        toggleBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', isOpen ? 'Close Navigation Menu' : 'Open Navigation Menu');
    }
}

function closeMobileNav() {
    const nav = document.querySelector('.main-navigation');
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-menu-open');
        if (toggleBtn) {
            toggleBtn.innerHTML = '&#9776;';
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.setAttribute('aria-label', 'Open Navigation Menu');
        }
    }
}

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile navigation link click auto-close
    const navLinks = document.querySelectorAll('.main-navigation a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMobileNav();
        });
    });

    // 2. Close full-screen menu when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeMobileNav();
        }
    });

    // 3. Auto-close full-screen menu when resizing to desktop width
    window.addEventListener('resize', function () {
        if (window.innerWidth > 992) {
            closeMobileNav();
        }
    });

    // 4. Sticky Header dynamic shadow/backdrop on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        const handleHeaderScroll = function () {
            if (window.scrollY > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };

        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        handleHeaderScroll(); // Initialize on load
    }
});
