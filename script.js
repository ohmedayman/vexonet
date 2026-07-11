// Vexonet

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const toggle = document.getElementById('toggle');
    const links = document.getElementById('links');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
        });
    });

    // Form
    const form = document.getElementById('form');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        toast.classList.add('show');
        form.reset();
        setTimeout(() => toast.classList.remove('show'), 3000);
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-text, .about-visual, .product-card, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});