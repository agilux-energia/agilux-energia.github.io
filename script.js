// ===== NAVIGATION MENU =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__link[href*=' + sectionId + ']');

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

// ===== HEADER SHADOW ON SCROLL =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== SCROLL TO TOP BUTTON =====
const scrollTop = document.getElementById('scroll-top');

function toggleScrollTop() {
    if (scrollTop) {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    }
}

window.addEventListener('scroll', toggleScrollTop);

// Adicionar evento de click para o botão
if (scrollTop) {
    scrollTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL FOR ALL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showMessage('Orçamento solicitado com sucesso! Nossa equipe entrará em contato em breve.', 'success');
            contactForm.reset();
        }, 1000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form__message';
    }, 5000);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll(
    '.service__card, .portfolio__card, .testimonial__card, .about__content, .contact__content'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat__number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.getElementById('sobre');
    const statsSectionTop = statsSection.offsetTop;
    const statsSectionHeight = statsSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > statsSectionTop + (statsSectionHeight / 2)) {
        statsAnimated = true;

        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    stat.textContent = stat.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        });
    }
}

window.addEventListener('scroll', animateStats);

// ===== PRELOADER (OPTIONAL) =====
window.addEventListener('load', () => {
    // Add fade-in animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== TESTIMONIALS ROTATION (OPTIONAL) =====
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial__card');

function rotateTestimonials() {
    // This is a placeholder for auto-rotating testimonials
    // Can be implemented with a carousel library or custom code
}

// ===== DYNAMIC YEAR IN FOOTER =====
const footerCopy = document.querySelector('.footer__copy');
if (footerCopy) {
    const currentYear = new Date().getFullYear();
    footerCopy.textContent = footerCopy.textContent.replace('2024', currentYear);
}

// ===== MOUSE PARALLAX EFFECT (OPTIONAL) =====
const heroImage = document.querySelector('.hero__svg');

if (heroImage) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ===== LAZY LOADING IMAGES (OPTIONAL) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TYPING EFFECT FOR HERO TITLE (OPTIONAL) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero__title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText);
// }

// ===== HOW WE WORK TIMELINE ANIMATION =====
function animateTimeline() {
    const howWeWorkSection = document.querySelector('.howwework');
    if (!howWeWorkSection) return;

    const timelineProgress = document.querySelector('.timeline__progress');
    const dots = document.querySelectorAll('.timeline__dot');
    const steps = document.querySelectorAll('.step');

    if (!timelineProgress || dots.length === 0 || steps.length === 0) return;

    function updateTimeline() {
        const sectionTop = howWeWorkSection.offsetTop;
        const sectionHeight = howWeWorkSection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Posições dos dots em relação ao topo da seção
        const firstDotPosition = steps[0].offsetTop;
        const lastDotPosition = steps[steps.length - 1].offsetTop;
        const totalDistance = lastDotPosition - firstDotPosition;

        // Calcula o progresso baseado na posição do scroll
        const triggerPoint = scrollY + windowHeight * 0.7;
        const sectionStart = sectionTop + firstDotPosition;
        
        // Progresso de 0 a 1 entre o primeiro e o último dot
        const progress = Math.max(0, Math.min(1, (triggerPoint - sectionStart) / totalDistance));

        // Atualiza a altura da linha de progresso
        timelineProgress.style.height = `${progress * 100}%`;

        // Ativa os dots e steps progressivamente
        steps.forEach((step, index) => {
            const stepProgress = index / (steps.length - 1);
            const dot = dots[index];
            
            if (progress >= stepProgress) {
                dot.classList.add('active');
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            } else {
                dot.classList.remove('active');
                step.style.opacity = '0';
                step.style.transform = 'translateY(30px)';
            }
        });
    }

    // Inicializa os steps com opacidade 0
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Atualiza no scroll
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    updateTimeline(); // Executa uma vez no carregamento
}

// Inicializa a animação da timeline
animateTimeline();

// ===== FORM VALIDATION AND SUBMISSION =====
(function() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const honeypot = document.getElementById('company');
    const messageCounter = document.getElementById('message-counter');
    
    // Track form load time for bot detection
    const formLoadTime = Date.now();
    
    // Error messages
    const errorMessages = {
        nome: {
            minLength: 'Nome deve ter no mínimo 3 caracteres',
            invalid: 'Nome deve conter apenas letras',
            required: 'Nome é obrigatório'
        },
        email: {
            invalid: 'Digite um email válido (ex: nome@email.com)',
            required: 'Email é obrigatório'
        },
        telefone: {
            invalid: 'Telefone inválido. Use: (XX) XXXXX-XXXX',
            incomplete: 'Complete o número de telefone',
            required: 'Telefone é obrigatório'
        },
        mensagem: {
            minLength: 'Mensagem deve ter no mínimo 10 caracteres',
            maxLength: 'Mensagem pode ter no máximo 500 caracteres',
            required: 'Mensagem é obrigatória'
        }
    };
    
    // Initialize phone mask
    const phoneMask = IMask(phoneInput, {
        mask: [
            {
                mask: '(00) 0000-0000'
            },
            {
                mask: '(00) 00000-0000'
            }
        ]
    });
    
    // Validation functions
    function validateName(value) {
        const nameRegex = /^[a-záàâãéèêíïóôõöúçñ\s]+$/i;
        if (!value.trim()) {
            return { valid: false, error: errorMessages.nome.required };
        }
        if (value.trim().length < 3) {
            return { valid: false, error: errorMessages.nome.minLength };
        }
        if (!nameRegex.test(value)) {
            return { valid: false, error: errorMessages.nome.invalid };
        }
        return { valid: true, error: '' };
    }
    
    function validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            return { valid: false, error: errorMessages.email.required };
        }
        if (!emailRegex.test(value)) {
            return { valid: false, error: errorMessages.email.invalid };
        }
        return { valid: true, error: '' };
    }
    
    function validatePhone(value) {
        const unmasked = phoneMask.unmaskedValue;
        if (!unmasked) {
            return { valid: false, error: errorMessages.telefone.required };
        }
        if (unmasked.length < 10) {
            return { valid: false, error: errorMessages.telefone.incomplete };
        }
        const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
        if (!phoneRegex.test(value)) {
            return { valid: false, error: errorMessages.telefone.invalid };
        }
        return { valid: true, error: '' };
    }
    
    function validateMessage(value) {
        if (!value.trim()) {
            return { valid: false, error: errorMessages.mensagem.required };
        }
        if (value.trim().length < 10) {
            return { valid: false, error: errorMessages.mensagem.minLength };
        }
        if (value.length > 500) {
            return { valid: false, error: errorMessages.mensagem.maxLength };
        }
        return { valid: true, error: '' };
    }
    
    // Update field UI based on validation
    function updateFieldUI(input, validation, errorElementId) {
        const formGroup = input.closest('.form__group');
        const errorElement = document.getElementById(errorElementId);
        const icon = formGroup.querySelector('.form__icon');
        
        if (validation.valid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.textContent = '';
            icon.textContent = '✓';
            icon.style.color = '#10b981';
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorElement.textContent = validation.error;
            icon.textContent = '✗';
            icon.style.color = '#ef4444';
        }
    }
    
    // Check if all fields are valid
    function checkFormValidity() {
        const nameValid = validateName(nameInput.value).valid;
        const emailValid = validateEmail(emailInput.value).valid;
        const phoneValid = validatePhone(phoneInput.value).valid;
        const messageValid = validateMessage(messageInput.value).valid;
        const honeypotEmpty = !honeypot.value.trim();
        
        submitBtn.disabled = !(nameValid && emailValid && phoneValid && messageValid && honeypotEmpty);
    }
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Track which fields have been touched
    const touchedFields = {
        name: false,
        email: false,
        phone: false,
        message: false
    };
    
    // Add event listeners - validation only on blur (when leaving field)
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim()) {
            touchedFields.name = true;
            updateFieldUI(nameInput, validateName(nameInput.value), 'name-error');
        }
        checkFormValidity();
    });
    
    nameInput.addEventListener('input', () => {
        // Only revalidate if field was already touched
        if (touchedFields.name) {
            updateFieldUI(nameInput, validateName(nameInput.value), 'name-error');
        }
        checkFormValidity();
    });
    
    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim()) {
            touchedFields.email = true;
            updateFieldUI(emailInput, validateEmail(emailInput.value), 'email-error');
        }
        checkFormValidity();
    });
    
    emailInput.addEventListener('input', () => {
        // Only revalidate if field was already touched
        if (touchedFields.email) {
            updateFieldUI(emailInput, validateEmail(emailInput.value), 'email-error');
        }
        checkFormValidity();
    });
    
    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value.trim()) {
            touchedFields.phone = true;
            updateFieldUI(phoneInput, validatePhone(phoneInput.value), 'phone-error');
        }
        checkFormValidity();
    });
    
    phoneInput.addEventListener('input', () => {
        // Only revalidate if field was already touched
        if (touchedFields.phone) {
            updateFieldUI(phoneInput, validatePhone(phoneInput.value), 'phone-error');
        }
        checkFormValidity();
    });
    
    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim()) {
            touchedFields.message = true;
            updateFieldUI(messageInput, validateMessage(messageInput.value), 'message-error');
        }
        checkFormValidity();
    });
    
    messageInput.addEventListener('input', () => {
        // Only revalidate if field was already touched
        if (touchedFields.message) {
            updateFieldUI(messageInput, validateMessage(messageInput.value), 'message-error');
        }
        checkFormValidity();
    });
    
    // Message counter
    messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        messageCounter.textContent = `${length}/500`;
        if (length > 450) {
            messageCounter.style.color = '#ef4444';
        } else {
            messageCounter.style.color = '#6b7280';
        }
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Bot detection: check if form was filled too quickly
        const timeSinceLoad = Date.now() - formLoadTime;
        if (timeSinceLoad < 3000) {
            showFormMessage('Erro ao enviar. Tente novamente.', 'error');
            return;
        }
        
        // Check honeypot
        if (honeypot.value.trim() !== '') {
            showFormMessage('Erro ao enviar. Tente novamente.', 'error');
            return;
        }
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        formMessage.textContent = '';
        
        // IMPORTANTE: Substitua esta URL pela URL do seu Google Apps Script
        // Instruções em: /server/CONFIG.md
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxJlmfwX3Qc_HJFuLiHPzgxbVWetuPWzq8HPtMfZdLa45UsuBfdkX2kSXOQlnSBopqJvw/exec';
        
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form)
            });
            
            const result = await response.json();
            
            if (result.result === 'success') {
                showFormMessage('✓ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                phoneMask.value = '';
                messageCounter.textContent = '0/500';
                
                // Remove validation classes
                document.querySelectorAll('.form__input').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
                document.querySelectorAll('.form__icon').forEach(icon => {
                    icon.textContent = '';
                });
                
                // Keep button disabled for 5 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
                }, 5000);
            } else {
                const errorMsg = result.message || 'Erro ao enviar mensagem';
                showFormMessage(`✗ ${getErrorMessage(errorMsg)}`, 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
            }
        } catch (error) {
            showFormMessage('✗ Erro ao enviar mensagem. Verifique sua conexão e tente novamente.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    });
    
    // Show form message
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form__message form__message--${type}`;
        formMessage.style.display = 'block';
        
        // Auto hide after 8 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 8000);
    }
    
    // Translate backend error messages
    function getErrorMessage(backendMsg) {
        const errorMap = {
            'Spam detected': 'Spam detectado. Tente novamente mais tarde.',
            'Too many requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
            'Invalid name': 'Nome inválido.',
            'Invalid email': 'Email inválido.',
            'Invalid phone': 'Telefone inválido.',
            'Invalid message': 'Mensagem inválida.',
            'Internal error': 'Erro interno. Tente novamente mais tarde.'
        };
        
        return errorMap[backendMsg] || 'Erro ao enviar mensagem. Tente novamente.';
    }
})();

// ===== FAQ ACCORDION =====
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ===== FOOTER SERVICE LINKS - PRE-FILL FORM =====
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.footer__service-link');
    const messageField = document.getElementById('message');
    
    // Mensagens pré-definidas para cada serviço
    const serviceMessages = {
        'residencial': 'Olá! Gostaria de receber um orçamento para instalação de sistema de energia solar residencial.',
        'comercial': 'Olá! Gostaria de receber um orçamento para instalação de sistema de energia solar comercial/industrial.',
        'instalacao': 'Olá! Gostaria de saber mais sobre os serviços de projeto e instalação de energia solar.',
        'manutencao': 'Olá! Gostaria de solicitar um orçamento para manutenção de sistema de energia solar.'
    };
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const service = this.getAttribute('data-service');
            
            // Preencher o campo de mensagem
            if (messageField && serviceMessages[service]) {
                // Pequeno delay para garantir que a página rolou até o formulário
                setTimeout(() => {
                    messageField.value = serviceMessages[service];
                    messageField.focus();
                    
                    // Atualizar o contador de caracteres
                    const counter = document.getElementById('message-counter');
                    if (counter) {
                        counter.textContent = `${messageField.value.length}/500`;
                    }
                    
                    // Trigger validation se necessário
                    messageField.dispatchEvent(new Event('input'));
                }, 300);
            }
        });
    });
});

console.log('☀️ Agilux Energia Solar - Website carregado com sucesso!');