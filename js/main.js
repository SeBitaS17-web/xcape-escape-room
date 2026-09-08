/* ===============================================
   JAVASCRIPT PRINCIPAL - XCAPE ESCAPE ROOM
   =============================================== */

// ===============================================
// MENÚ HAMBURGUESA
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Dropdown en móvil
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
});

// ===============================================
// SCROLL SUAVE
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===============================================
// ANIMACIÓN DE CONTADOR (ESTADÍSTICAS)
// ===============================================

function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60 FPS

                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (target === 95 ? '%' : '');
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

// Llamar función cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounter);
} else {
    animateCounter();
}

// ===============================================
// EFECTO PARALLAX
// ===============================================

function parallax() {
    const scrollPosition = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
}

window.addEventListener('scroll', parallax);

// ===============================================
// ACTUALIZAR NAV LINK ACTIVO
// ===============================================

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===============================================
// EFECTO DE REVEAL AL SCROLL
// ===============================================

function revealOnScroll() {
    const elements = document.querySelectorAll('.sala-card, .feature-card, .stat-box');
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealOnScroll);
} else {
    revealOnScroll();
}

// ===============================================
// EFECTO GLITCH EN HOVER
// ===============================================

function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.hero-title, h2, h3');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'redGlitch 0.5s ease-in-out';
        });

        element.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGlitchEffect);
} else {
    addGlitchEffect();
}

// ===============================================
// SMOOTH HOVER EN BOTONES
// ===============================================

function enhanceButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--x', x + 'px');
            this.style.setProperty('--y', y + 'px');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceButtons);
} else {
    enhanceButtons();
}

// ===============================================
// EFECTOS DE SONIDO (OPCIONAL)
// ===============================================

function playSound(frequency, duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// Reproducir sonido en clicks de botones (comentado, descomenta si quieres)
function addButtonSounds() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // playSound(400, 0.1); // Descomentar para activar
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButtonSounds);
} else {
    addButtonSounds();
}

// ===============================================
// DETECCIÓN DE NAVEGADOR Y SOPORTE
// ===============================================

function detectBrowser() {
    const ua = navigator.userAgent;
    
    if (!CSS.supports('animation', 'test')) {
        console.warn('El navegador no soporta animaciones CSS avanzadas');
    }

    if (!window.IntersectionObserver) {
        console.warn('IntersectionObserver no soportado, algunas animaciones pueden no funcionar');
    }
}

detectBrowser();

// ===============================================
// MANEJO DE ERRORES Y DEBUGGING
// ===============================================

window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
});

// ===============================================
// PERFORMANCE OPTIMIZATION
// ===============================================

let ticking = false;

function updateOnScroll() {
    parallax();
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

// ===============================================
// CARGAR RECURSOS DE FORMA EFICIENTE
// ===============================================

function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

// ===============================================
// EFECTOS DE MOUSE PERSONALIZADO (OPCIONAL)
// ===============================================

function customCursor() {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let posX = 0, posY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        posX = e.clientX;
        posY = e.clientY;

        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';

        setTimeout(() => {
            outlineX = posX;
            outlineY = posY;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
        }, 50);
    });

    // Efecto hover en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
            cursorOutline.classList.add('cursor-hover');
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
            cursorOutline.classList.remove('cursor-hover');
        });
    });
}

// Descomentar si quieres activar cursor personalizado
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', customCursor);
// } else {
//     customCursor();
// }

// ===============================================
// VALIDACIÓN DE FORMULARIOS (Para páginas futuras)
// ===============================================

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input, textarea, select');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'var(--primary-red)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                console.warn('Por favor completa todos los campos');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFormValidation);
} else {
    initializeFormValidation();
}

// ===============================================
// FUNCIÓN HELPER PARA CONSOLE.LOG EN DESARROLLO
// ===============================================

const isDevelopment = !window.location.hostname.includes('xcapegame.com');

function log(...args) {
    if (isDevelopment) {
        console.log('%c[XCAPE]', 'color: #FF1744; font-weight: bold;', ...args);
    }
}

log('XCAPE Escape Room - Sistema de animaciones cargado correctamente ✓');