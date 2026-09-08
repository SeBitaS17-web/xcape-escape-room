/* ===============================================
   JAVASCRIPT ESPECÍFICO - PÁGINAS DE SALAS
   =============================================== */

// ===============================================
// INICIALIZACIÓN Y ANIMACIONES AL CARGAR
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    initSalaAnimations();
    initGaleria();
    initEspacios();
    initTestimonios();
    initScrollEffects();
    log('Página de SALA - Sistema cargado ✓');
});

// ===============================================
// ANIMACIONES DE SALA
// ===============================================

function initSalaAnimations() {
    const salaTitle = document.querySelector('.sala-title');
    const salaSubtitle = document.querySelector('.sala-subtitle');
    
    if (salaTitle) {
        // Efecto de aparición progresiva
        salaTitle.style.animation = 'fadeInDown 1s ease-out';
    }
    
    if (salaSubtitle) {
        salaSubtitle.style.animation = 'fadeInUp 1s ease-out 0.2s both';
    }

    // Animar estadísticas
    const stats = document.querySelectorAll('.sala-stats .stat');
    stats.forEach((stat, index) => {
        stat.style.animation = `slideInUp 0.6s ease-out ${0.3 + (index * 0.1)}s both`;
    });
}

// ===============================================
// GALERÍA INTERACTIVA
// ===============================================

function initGaleria() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });

        // Efecto zoom al hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Lightbox simple
function openLightbox(src, alt) {
    // Crear modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
        cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        animation: slideInUp 0.5s ease-out;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: var(--primary-red);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        z-index: 10001;
    `;

    closeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

// ===============================================
// ESPACIOS INTERACTIVOS
// ===============================================

function initEspacios() {
    const espacios = document.querySelectorAll('.espacio-card');

    espacios.forEach((espacio, index) => {
        // Efecto de entrada escalonada
        espacio.style.animation = `slideInUp 0.8s ease-out ${0.1 + (index * 0.1)}s both`;

        // Efecto de revelación de número
        const numero = espacio.querySelector('.espacio-number');
        if (numero) {
            espacio.addEventListener('mouseenter', function() {
                numero.style.transform = 'scale(1.5) rotate(10deg)';
                numero.style.opacity = '0.4';
            });

            espacio.addEventListener('mouseleave', function() {
                numero.style.transform = 'scale(1) rotate(0)';
                numero.style.opacity = '0.2';
            });
        }
    });
}

// ===============================================
// TESTIMONIOS ANIMADOS
// ===============================================

function initTestimonios() {
    const testimonios = document.querySelectorAll('.testimonio-card');

    testimonios.forEach((testimonio, index) => {
        testimonio.style.animation = `slideInUp 0.8s ease-out ${0.1 + (index * 0.15)}s both`;

        // Rating animado
        const stars = testimonio.querySelector('.stars');
        if (stars) {
            const starElements = stars.querySelectorAll('i');
            
            testimonios.addEventListener('mouseenter', function() {
                starElements.forEach((star, idx) => {
                    setTimeout(() => {
                        star.style.transform = 'scale(1.2)';
                        star.style.color = '#FF1744';
                    }, idx * 50);
                });
            });

            testimonio.addEventListener('mouseleave', function() {
                starElements.forEach(star => {
                    star.style.transform = 'scale(1)';
                });
            });
        }
    });
}

// ===============================================
// EFECTOS AL HACER SCROLL
// ===============================================

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar tarjetas de features
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInUp 0.6s ease-out';
                }

                // Animar números de espacios
                if (entry.target.classList.contains('espacio-card')) {
                    const numero = entry.target.querySelector('.espacio-number');
                    if (numero) {
                        numero.style.animation = 'pulse 2s ease-in-out infinite';
                    }
                }

                // Animar requisitos
                if (entry.target.classList.contains('requisito-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'slideInUp 0.6s ease-out';
                }

                // Animar estadísticas
                if (entry.target.classList.contains('stat-card')) {
                    const numero = entry.target.querySelector('.stat-number');
                    if (numero) {
                        animateCounter(numero);
                    }
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos animables
    document.querySelectorAll('.feature-card, .espacio-card, .requisito-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===============================================
// CONTADOR ANIMADO
// ===============================================

function animateCounter(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';

    const text = element.textContent;
    const number = parseFloat(text);
    const duration = 1500;
    const increment = number / (duration / 16);
    let current = 0;

    const updateNumber = () => {
        current += increment;
        if (current < number) {
            if (number % 1 === 0) {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = current.toFixed(1);
            }
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = text;
        }
    };

    updateNumber();
}

// ===============================================
// PARALLAX EN DESCRIPCIONES
// ===============================================

function initParallaxEffects() {
    const descripcionImages = document.querySelectorAll('.descripcion-image img');

    window.addEventListener('scroll', () => {
        descripcionImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollY = window.pageYOffset;
            const elementY = scrollY + rect.top;
            const distance = (scrollY - elementY) * 0.5;

            img.style.transform = `translateY(${distance}px)`;
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParallaxEffects);
} else {
    initParallaxEffects();
}

// ===============================================
// TRACKING DE INTERACCIÓN
// ===============================================

function trackSalaInteraction() {
    // Track clicks en botones de reserva
    const reservaBtns = document.querySelectorAll('a[href*="contacto"]');
    
    reservaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sala = document.querySelector('.sala-title').textContent;
            log(`Usuario iniciando reserva para: ${sala}`);
        });
    });

    // Track visualización de galería
    const galeriaItems = document.querySelectorAll('.galeria-item');
    galeriaItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const sala = document.querySelector('.sala-title').textContent;
            log(`Galería - Imagen ${index + 1} visualizada de ${sala}`);
        });
    });

    // Track scroll profundidad
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (currentScroll > maxScroll) {
            maxScroll = currentScroll;
            if (maxScroll > 25 && maxScroll < 26) {
                log('Usuario scrolleó 25% de la página');
            }
            if (maxScroll > 50 && maxScroll < 51) {
                log('Usuario scrolleó 50% de la página');
            }
            if (maxScroll > 75 && maxScroll < 76) {
                log('Usuario scrolleó 75% de la página');
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackSalaInteraction);
} else {
    trackSalaInteraction();
}

// ===============================================
// MODAL DE VIDEO (OPCIONAL)
// ===============================================

function initVideoModals() {
    const videoTriggers = document.querySelectorAll('[data-video]');

    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.video;
            openVideoModal(videoId);
        });
    });
}

function openVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 800px;
        padding-bottom: 56.25%;
        animation: slideInUp 0.5s ease-out;
    `;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
    `;
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = true;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: -50px;
        right: 0;
        background: var(--primary-red);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        z-index: 10001;
    `;

    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    videoContainer.appendChild(iframe);
    videoContainer.appendChild(closeBtn);
    modal.appendChild(videoContainer);
    document.body.appendChild(modal);
}

// ===============================================
// COMPARTIR EN REDES SOCIALES
// ===============================================

function initSocialShare() {
    const shareButtons = document.querySelectorAll('[data-share]');

    shareButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.share;
            const url = window.location.href;
            const title = document.querySelector('.sala-title').textContent;
            
            let shareUrl = '';

            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocialShare);
} else {
    initSocialShare();
}

// ===============================================
// NOTIFICACIÓN DE RESERVA
// ===============================================

function showBookingNotification(salaName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-red) 0%, #e00000 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 23, 68, 0.4);
        z-index: 9999;
        animation: slideInUp 0.5s ease-out;
        font-weight: 600;
    `;

    notification.textContent = `¡Redirigiendo a ${salaName}...`;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}

// ===============================================
// LOG DE FINALIZACIÓN
// ===============================================

log('Salas - Sistema de interactividad cargado correctamente ✓');