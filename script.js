/* ============================================================
   CABINET AMÉLIE CONSEIL & PATRIMOINE — Premium JS v2
   Custom cursor, particles, scroll reveals, loader, nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- PAGE LOADER ----
    const loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('loaded'), 1800);
        });
        setTimeout(() => loader.classList.add('loaded'), 3000);
    }

    // ---- CUSTOM CURSOR ----
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    if (dot && outline && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let outX = 0, outY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX - 4 + 'px';
            dot.style.top = mouseY - 4 + 'px';
        });

        function animateCursor() {
            outX += (mouseX - outX) * 0.12;
            outY += (mouseY - outY) * 0.12;
            outline.style.left = outX - 20 + 'px';
            outline.style.top = outY - 20 + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverEls = document.querySelectorAll('a, button, .pillar-card, .service-card, .partner-card, .cta-card, .devis-card, .process-step');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => outline.classList.add('hover'));
            el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
        });
    }

    // ---- GOLD PARTICLES ----
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.fadeDir = Math.random() > 0.5 ? 1 : -1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += this.fadeDir * 0.003;
                if (this.opacity <= 0.05 || this.opacity >= 0.6) this.fadeDir *= -1;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(198, 169, 98, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ---- HEADER SCROLL ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // ---- MOBILE MENU ----
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (menuOverlay) menuOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ---- SCROLL REVEAL ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-in');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-in')) : [];
                const siblingIndex = siblings.indexOf(entry.target);
                const delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;
                setTimeout(() => { entry.target.classList.add('visible'); }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- SCROLL TO TOP ----
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- SMOOTH ANCHOR SCROLL ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- COUNTER ANIMATION ----
    const counters = document.querySelectorAll('.about-stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.getAttribute('data-target') || el.textContent;
                const num = parseInt(target);
                const suffix = target.replace(/[0-9]/g, '');
                if (!isNaN(num) && num > 0 && num < 10000) {
                    let current = 0;
                    const step = Math.ceil(num / 40);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= num) { current = num; clearInterval(timer); }
                        el.textContent = current + suffix;
                    }, 30);
                } else {
                    el.textContent = target;
                }
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // ---- ACTIVE NAV LINK ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.split('#')[0] === currentPage && !link.classList.contains('nav-cta')) {
            link.classList.add('active');
        } else if (!link.classList.contains('nav-cta')) {
            link.classList.remove('active');
        }
    });

    // ---- CONTACT FORM ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const required = contactForm.querySelectorAll('[required]');
            let valid = true;
            required.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            if (valid) {
                const btn = contactForm.querySelector('.btn');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                btn.style.background = '#27ae60';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    contactForm.reset();
                }, 3000);
            }
        });
    }

    // ---- URL PARAMS FOR DEVIS ----
    const urlParams = new URLSearchParams(window.location.search);
    const devisType = urlParams.get('type');
    if (devisType) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            if (devisType === 'sante') subjectSelect.value = 'devis-sante';
            else if (devisType === 'prevoyance') subjectSelect.value = 'devis-prevoyance';
        }
    }

});
