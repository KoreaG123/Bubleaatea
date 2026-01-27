
// ========================================
// VARIABLES GLOBALES
// ========================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const productoCards = document.querySelectorAll('.producto-card');
const videoOverlay = document.querySelector('.video-overlay');
const playBtn = document.querySelector('.play-btn');
const video = document.querySelector('video');

// ========================================
// NAVBAR - SCROLL BEHAVIOR
// ========================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// MENÚ HAMBURGUESA - MOBILE
// ========================================

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// ANIMACIÓN DE TARJETAS DE PRODUCTOS
// ========================================

// Intersection Observer para animar cards al entrar en viewport
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            cardObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

productoCards.forEach(card => {
    cardObserver.observe(card);
});

// ========================================
// VIDEO PLAYER
// ========================================

if (videoOverlay && playBtn && video) {
    // Reproducir video al hacer clic
    playBtn.addEventListener('click', () => {
        video.play();
        videoOverlay.style.opacity = '0';
        setTimeout(() => {
            videoOverlay.style.display = 'none';
        }, 300);
    });
    
    // Mostrar overlay cuando el video termina
    video.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
        setTimeout(() => {
            videoOverlay.style.opacity = '1';
        }, 10);
    });
    
    // Pausar video al hacer clic en él
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// ========================================
// ANIMACIÓN DE NÚMEROS (CONTADOR)
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Observar elementos con la clase 'counter'
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// PARALLAX EFFECT EN HERO
// ========================================

const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled <= hero.offsetHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
        }
    });
}

// ========================================
// EFECTO TYPING EN TÍTULO
// ========================================

function typeWriter(element, text, speed = 100) {
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

// Activar efecto typing cuando la página cargue
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || typingElement.textContent;
        typeWriter(typingElement, text);
    }
});

// ========================================
// LAZY LOADING PARA IMÁGENES
// ========================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => imageObserver.observe(img));

// ========================================
// BOTÓN SCROLL TO TOP
// ========================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.classList.add('scroll-to-top');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
document.body.appendChild(scrollTopBtn);

// Añadir estilos al botón
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff6b9d, #c94b7d);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 90px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Mostrar/ocultar botón según scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top al hacer clic
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// ANIMACIÓN DE ENTRADA PARA SECCIONES
// ========================================

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
});

// Añadir clase cuando la sección es visible
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(sectionStyle);

// ========================================
// CURSOR PERSONALIZADO (OPCIONAL)
// ========================================

const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

// Estilos del cursor
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 40px;
        height: 40px;
        border: 2px solid #ff6b9d;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease-out;
        transform: translate(-50%, -50%);
        opacity: 0;
    }
    
    .cursor-dot {
        width: 8px;
        height: 8px;
        background: #ff6b9d;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease-out;
        transform: translate(-50%, -50%);
        opacity: 0;
    }
    
    .custom-cursor.active,
    .cursor-dot.active {
        opacity: 1;
    }
    
    .custom-cursor.clicked {
        transform: translate(-50%, -50%) scale(0.8);
    }
    
    @media (max-width: 992px) {
        .custom-cursor,
        .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Activar cursor solo en desktop
if (window.innerWidth > 992) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursor.classList.add('active');
        cursorDot.classList.add('active');
    });
    
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
    });
    
    // Ocultar cursor cuando sale de la ventana
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorDot.classList.remove('active');
    });
}

// ========================================
// PRELOADER (OPCIONAL)
// ========================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// NOTIFICACIONES TOAST
// ========================================

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.textContent = message;
    
    const toastStyle = document.createElement('style');
    if (!document.querySelector('#toast-style')) {
        toastStyle.id = 'toast-style';
        toastStyle.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 30px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                font-weight: 600;
            }
            
            .toast-success {
                border-left: 4px solid #4CAF50;
            }
            
            .toast-error {
                border-left: 4px solid #f44336;
            }
            
            .toast-info {
                border-left: 4px solid #2196F3;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(toastStyle);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ========================================
// TRACKING DE EVENTOS (OPCIONAL)
// ========================================

// Tracking de clics en botones de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        showToast('Abriendo WhatsApp...', 'info');
        
        // Aquí puedes agregar tracking de analytics
        // gtag('event', 'whatsapp_click', { ... });
    });
});

// Tracking de vistas de productos
productoCards.forEach((card, index) => {
    const productObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Product ${index + 1} viewed`);
                productObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    productObserver.observe(card);
});

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce function para optimizar eventos que se disparan frecuentemente
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

// Aplicar debounce al evento de resize
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
    // Aquí puedes agregar lógica para recalcular layouts
}, 250));

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🧋 Bubble Tea Website Loaded!');
    
    // Agregar clase al body cuando la página está lista
    document.body.classList.add('page-loaded');
    
    // Log para debugging
    console.log(`
    ╔════════════════════════════════════╗
    ║   🧋 Bubble Tea Website v1.0 🧋   ║
    ║   Desarrollado con ❤️              ║
    ╚════════════════════════════════════╝
    `);
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('Error detected:', e.error);
    // Aquí puedes agregar logging a un servicio externo
});

// ========================================
// EXPORT (SI SE USA COMO MÓDULO)
// ========================================

export { showToast, animateCounter, typeWriter, debounce };
