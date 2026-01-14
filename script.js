/* ========================================
   Catalyst Gen AI - Interactive Features
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeNavigation();
    initializeScrollAnimations();
    initializeTypingAnimation();
    initializeGalleryLightbox();
    initializeContactForm();
    initializeBackToTop();
    initializeParticlesBackground();
    initializeTestimonialSlider();
    initializeFeatherIcons();
    
});

/* ========================================
   Navigation
   ======================================== */
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   Scroll Animations (AOS)
   ======================================== */
function initializeScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out'
        });
    }
}

/* ========================================
   Typing Animation for Tagline
   ======================================== */
function initializeTypingAnimation() {
    const taglineElement = document.querySelector('.typing-animation');
    if (!taglineElement) return;
    
    const taglines = [
        'Igniting Innovation. Empowering Intelligence.',
        'Where Ideas Evolve into Intelligence.',
        'Building the Future with AI.',
        'Discover. Design. Deploy.',
        'Shaping Tomorrow with Technology.'
    ];
    
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentTagline = '';
    
    function type() {
        const fullText = taglines[taglineIndex];
        
        if (isDeleting) {
            currentTagline = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            currentTagline = fullText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        taglineElement.textContent = currentTagline;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === fullText.length) {
            typeSpeed = 3000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typeSpeed = 500; // Pause before starting new tagline
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation after initial delay
    setTimeout(type, 1000);
}

/* ========================================
   Particles Background (Simple Canvas Animation)
   ======================================== */
function initializeParticlesBackground() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    
    // Create a canvas element for particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.style.position = 'absolute';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    canvas.appendChild(particleCanvas);
    
    const ctx = particleCanvas.getContext('2d');
    let particles = [];
    let particleCount = 50;
    
    // Set canvas size
    function setCanvasSize() {
        particleCanvas.width = canvas.offsetWidth;
        particleCanvas.height = canvas.offsetHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > particleCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particleCanvas.width;
            if (this.y > particleCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particleCanvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

/* ========================================
   Gallery Lightbox
   ======================================== */
function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    
    if (!lightbox) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageUrl = this.querySelector('.gallery-image').style.backgroundImage;
            const url = imageUrl.slice(5, -2); // Extract URL from url("...")
            
            if (url && url !== '') {
                lightboxImage.src = url;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ========================================
   Contact Form Validation
   ======================================== */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const status = document.createElement('p');
    status.className = 'form-status';
    contactForm.appendChild(status);

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        // Optional frontend validation
        const email = formData.get('_replyto') || formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            status.textContent = 'Please enter a valid email address.';
            status.style.color = '#ff4d4d';
            return;
        }

        try {
            status.textContent = 'Sending...';
            status.style.color = '#00d4ff';

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.textContent = 'Message sent successfully 🚀';
                status.style.color = '#00ffcc';
                contactForm.reset();
            } else {
                status.textContent = 'Something went wrong. Please try again.';
                status.style.color = '#ff4d4d';
            }
        } catch (error) {
            status.textContent = 'Network error. Please try again later.';
            status.style.color = '#ff4d4d';
        }
    });
}

/* ========================================
   Back to Top Button
   ======================================== */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Testimonial Slider (Swiper)
   ======================================== */
function initializeTestimonialSlider() {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                }
            }
        });
    }
}

/* ========================================
   Initialize Feather Icons
   ======================================== */
function initializeFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/* ========================================
   Smooth Scroll Behavior for All Links
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ========================================
   Intersection Observer for Advanced Animations
   ======================================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

/* ========================================
   Dynamic Year in Footer
   ======================================== */
const currentYear = new Date().getFullYear();
document.querySelectorAll('.footer-bottom p').forEach(p => {
    if (p.textContent.includes('2024-2025')) {
        p.textContent = p.textContent.replace('2024-2025', `2024-${currentYear}`);
    }
});

/* ========================================
   Preloader (Optional - Uncomment if needed)
   ======================================== */
/*
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});
*/

/* ========================================
   Console Message (Easter Egg)
   ======================================== */
console.log('%c🚀 Catalyst Gen AI', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%cIgniting Innovation. Empowering Intelligence.', 'color: #00ffff; font-size: 14px;');
console.log('%cInterested in joining? Visit our website!', 'color: #a855f7; font-size: 12px;');
