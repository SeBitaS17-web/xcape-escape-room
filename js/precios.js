/* ===============================================
   JAVASCRIPT ESPECÍFICO - PÁGINA DE PRECIOS
   =============================================== */

// ===============================================
// TOGGLE DE PRECIOS: POR PERSONA vs POR GRUPO
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const preciosPersona = document.getElementById('preciosPersona');
    const preciosGrupo = document.getElementById('preciosGrupo');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const toggle = this.getAttribute('data-toggle');

            // Remover clase active de todos los botones
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');

            // Mostrar/ocultar grillas de precios con animación
            if (toggle === 'persona') {
                preciosPersona.style.display = 'grid';
                preciosGrupo.style.display = 'none';
                preciosPersona.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                preciosPersona.style.display = 'none';
                preciosGrupo.style.display = 'grid';
                preciosGrupo.style.animation = 'fadeInUp 0.5s ease-out';
            }
        });
    });

    // Establecer el toggle activo por defecto en "Por Persona"
    const defaultToggle = document.querySelector('[data-toggle="persona"]');
    if (defaultToggle) {
        defaultToggle.classList.add('active');
    }
});

// ===============================================
// ACORDEÓN FAQ
// ===============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle del item actual
            item.classList.toggle('active');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

// ===============================================
// ANIMACIONES AL SCROLL PARA TARJETAS
// ===============================================

function observePrecioCards() {
    const cards = document.querySelectorAll('.precio-card, .promo-card');
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, options);

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observePrecioCards);
} else {
    observePrecioCards();
}

// ===============================================
// CONTADOR DE ANIMACIÓN PARA PRECIOS
// ===============================================

function animatePrices() {
    const priceAmounts = document.querySelectorAll('.amount');
    const pricesObserved = new Set();

    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !pricesObserved.has(entry.target)) {
                pricesObserved.add(entry.target);
                animatePrice(entry.target);
            }
        });
    }, options);

    priceAmounts.forEach(price => observer.observe(price));
}

function animatePrice(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;

    const updatePrice = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updatePrice);
        } else {
            element.textContent = target;
        }
    };

    updatePrice();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animatePrices);
} else {
    animatePrices();
}

// ===============================================
// EFECTO HOVER EN CARDS MEJORADO
// ===============================================

function enhancePriceCardHover() {
    const cards = document.querySelectorAll('.precio-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            
            // Agregar brillo dinámico
            const rect = this.getBoundingClientRect();
            this.style.setProperty('--hover-x', '50%');
            this.style.setProperty('--hover-y', '50%');
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--hover-x', x + 'px');
            this.style.setProperty('--hover-y', y + 'px');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhancePriceCardHover);
} else {
    enhancePriceCardHover();
}

// ===============================================
// TRACKING DE SELECCIÓN DE SALA
// ===============================================

function trackSalaSelection() {
    const reservarBtns = document.querySelectorAll('.btn-sala');

    reservarBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el nombre de la sala
            const card = this.closest('.precio-card');
            const salaName = card.querySelector('h3').textContent;
            const price = card.querySelector('.amount').textContent;
            
            // Log en consola (en producción enviar a analytics)
            log(`Usuario seleccionó sala: ${salaName} - Precio: $${price}`);

            // Redirigir a contacto con parámetro de sala
            const salaParam = salaName.toLowerCase().replace(/ /g, '-');
            window.location.href = `contacto.html?sala=${salaParam}`;
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackSalaSelection);
} else {
    trackSalaSelection();
}

// ===============================================
// FILTRO DINÁMICO DE PRECIOS (OPCIONAL)
// ===============================================

function initPriceFilter() {
    // Esta función puede expandirse para incluir filtros por dificultad, precio, etc.
    
    const priceCards = document.querySelectorAll('.precio-card');
    
    // Ejemplo: Agregar data attributes para filtrado futuro
    priceCards.forEach((card, index) => {
        const dificultad = card.querySelector('.dificultad').textContent;
        const price = card.querySelector('.amount').textContent;
        
        card.setAttribute('data-difficulty', dificultad.toLowerCase());
        card.setAttribute('data-price', price);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPriceFilter);
} else {
    initPriceFilter();
}

// ===============================================
// COMPARATIVA INTERACTIVA
// ===============================================

function initComparativaInteractiva() {
    const rows = document.querySelectorAll('.tabla-comparativa tbody tr');

    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 23, 68, 0.1)';
        });

        row.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComparativaInteractiva);
} else {
    initComparativaInteractiva();
}

// ===============================================
// NOTIFICACIÓN DE PROMOCIONES (OPCIONAL)
// ===============================================

function showPromoNotification() {
    // Esta función puede mostrar notificaciones de promociones activas
    const promoCards = document.querySelectorAll('.promo-card');
    
    promoCards.forEach((card, index) => {
        // Agregar animación de entrada escalonada
        setTimeout(() => {
            card.style.animation = `zoomIn 0.6s ease-out`;
        }, index * 150);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showPromoNotification);
} else {
    showPromoNotification();
}

// ===============================================
// VALIDACIÓN DE CONSULTAS DE CONTACTO
// ===============================================

function validateContactForm() {
    const contactForms = document.querySelectorAll('form');

    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]');
            const nombre = this.querySelector('input[name="nombre"]');
            const sala = this.querySelector('select[name="sala"]');

            let isValid = true;

            if (nombre && !nombre.value.trim()) {
                nombre.style.borderColor = 'var(--primary-red)';
                isValid = false;
            }

            if (email && !email.value.trim()) {
                email.style.borderColor = 'var(--primary-red)';
                isValid = false;
            }

            if (sala && !sala.value) {
                sala.style.borderColor = 'var(--primary-red)';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                log('Formulario incompleto');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', validateContactForm);
} else {
    validateContactForm();
}

// ===============================================
// EFECTO SCROLL PARALLAX EN HERO
// ===============================================

function parallaxPrecios() {
    const preciosHero = document.querySelector('.precios-hero');
    
    if (!preciosHero) return;

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroPosition = preciosHero.offsetTop;
        
        if (scrollPosition < heroPosition + 500) {
            const parallaxDistance = (scrollPosition - heroPosition) * 0.3;
            const heroBackground = preciosHero.querySelector('.hero-background');
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${parallaxDistance}px)`;
            }
        }
    });
}

parallaxPrecios();

// ===============================================
// DESCARGAR CATÁLOGO (OPCIONAL)
// ===============================================

function addDownloadCatalogo() {
    // Esta función puede agregar un botón para descargar catálogo PDF
    // Implementar según necesidades
}

// ===============================================
// ESTADÍSTICAS DE TASA DE ÉXITO
// ===============================================

function animateSuccessRates() {
    const successRates = [
        { selector: '.casa-embrujada-card', rate: 85 },
        { selector: '.tutankamon-card', rate: 70 },
        { selector: '.carcel-card', rate: 40 }
    ];

    successRates.forEach(item => {
        const card = document.querySelector(item.selector);
        if (card) {
            const rateElement = document.createElement('div');
            rateElement.className = 'success-rate';
            rateElement.textContent = `${item.rate}% de éxito`;
            rateElement.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(255, 23, 68, 0.2);
                color: var(--primary-red);
                padding: 0.3rem 0.8rem;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
            `;
            card.style.position = 'relative';
            // Descomentar si se quiere mostrar
            // card.appendChild(rateElement);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateSuccessRates);
} else {
    animateSuccessRates();
}

// ===============================================
// LOG DE INICIO
// ===============================================

log('Página de PRECIOS - Sistema cargado correctamente ✓');