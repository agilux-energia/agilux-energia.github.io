document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTop = document.getElementById('scroll-top');
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');

    // --- Menu ---
    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    }
    if (navClose) {
        navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    });

    // --- Active Link on Scroll ---
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav__link[href*=${sectionId}]`);
            
            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --- Scroll to Top Button ---
    function toggleScrollTop() {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }
    window.addEventListener('scroll', toggleScrollTop);

    // --- Contact Form ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            
            // Simulate sending message
            showMessage(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`, 'success');
            this.reset();
        });
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form__message ${type}`;
        setTimeout(() => {
            formMessage.className = 'form__message';
        }, 5000);
    }

    // --- Scroll Reveal Animation (Simple version) ---
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
        // reset: true // Uncomment to repeat animation on scroll
    });

    sr.reveal(`.hero__content, .about__image, .contact__content`);
    sr.reveal(`.hero__image, .about__content, .contact__form`, { origin: 'bottom' });
    sr.reveal(`.service__card`, { interval: 200 });

});

// You might need to include the ScrollReveal library for the animations to work.
// Add this to your HTML before your script.js tag:
// <script src="https://unpkg.com/scrollreveal"></script>
