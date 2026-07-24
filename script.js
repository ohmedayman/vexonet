// Vexonet — Premium

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Navbar scroll
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const toggle = document.getElementById('toggle');
    const links = document.getElementById('links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('active'));
    });

    // Smooth scroll
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

    // Counter animation
    const counters = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                if (isNaN(target)) return;
                
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        el.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target;
                    }
                };

                update();
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    // Form submission
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            btn.disabled = true;

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    toast.classList.add('show');
                    form.reset();
                    setTimeout(() => toast.classList.remove('show'), 3000);
                } else {
                    throw new Error('Failed');
                }
            })
            .catch(() => form.submit())
            .finally(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            });
        });
    }

    // Tilt effect on cards
    document.querySelectorAll('.service-card, .why-card, .testimonial-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Parallax on hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            hero.style.opacity = 1 - (scrolled * 0.001);
        }
    });

    // Notify form (Coming Soon)
    const notifyBtn = document.querySelector('.notify-btn');
    const notifyInput = document.querySelector('.notify-input');
    if (notifyBtn && notifyInput) {
        notifyBtn.addEventListener('click', () => {
            const email = notifyInput.value.trim();
            if (!email || !email.includes('@')) {
                notifyInput.style.borderColor = '#ef4444';
                setTimeout(() => notifyInput.style.borderColor = '', 2000);
                return;
            }
            const originalHTML = notifyBtn.innerHTML;
            notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            notifyBtn.disabled = true;
            
            fetch('https://formspree.io/f/mjgpaozd', {
                method: 'POST',
                body: JSON.stringify({ email: email, subject: 'QCV Mobile App - Notify Me', message: 'User wants to be notified about QCV mobile app launch: ' + email }),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                notifyBtn.innerHTML = '<i class="fas fa-check"></i> تم التسجيل!';
                notifyBtn.style.background = '#10b981';
                notifyInput.value = '';
                setTimeout(() => {
                    notifyBtn.innerHTML = originalHTML;
                    notifyBtn.style.background = '';
                    notifyBtn.disabled = false;
                }, 3000);
            })
            .catch(() => {
                notifyBtn.innerHTML = '<i class="fas fa-check"></i> تم التسجيل!';
                notifyBtn.style.background = '#10b981';
                notifyInput.value = '';
                setTimeout(() => {
                    notifyBtn.innerHTML = originalHTML;
                    notifyBtn.style.background = '';
                    notifyBtn.disabled = false;
                }, 3000);
            });
        });
    }

    // Mobile toggle animation
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
    });

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});