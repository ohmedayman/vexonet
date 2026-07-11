// ========================================
// VEXONET — Main Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== Navbar Scroll =====
    const nav = document.getElementById('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu =====
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // ===== Active Nav Link =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== Reveal on Scroll =====
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.stat-num');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;
                const match = text.match(/(\d+)/);
                
                if (match) {
                    const target = parseInt(match[0]);
                    const suffix = text.replace(match[0], '');
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const update = () => {
                        current += step;
                        if (current < target) {
                            el.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = target + suffix;
                        }
                    };
                    
                    update();
                }
                
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // ===== Contact Form =====
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            toast.classList.add('show');
            form.reset();
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }, 1500);
    });

    // ===== Tilt Effect on Cards =====
    document.querySelectorAll('.product-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===== Cursor Glow =====
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(108, 92, 231, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transition: transform 0.15s ease-out;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    });

    // Hide on mobile
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
    }
});