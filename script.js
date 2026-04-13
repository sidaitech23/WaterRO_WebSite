document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observers.observe(el);
    });

    // Mouse Parallax effect for floating elements
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const floatingElements = document.querySelectorAll('.floating, .floating-delayed');
        floatingElements.forEach(el => {
            const speed = 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // Create background particles
    const createParticles = () => {
        const body = document.body;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Add to body
            body.appendChild(particle);

            // Animate
            animateParticle(particle);
        }
    };

    const animateParticle = (p) => {
        const duration = Math.random() * 10000 + 5000;
        const xMove = (Math.random() - 0.5) * 100;
        const yMove = (Math.random() - 0.5) * 100;

        p.animate([
            { transform: 'translate(0, 0)', opacity: 0.1 },
            { transform: `translate(${xMove}px, ${yMove}px)`, opacity: 0.4 },
            { transform: 'translate(0, 0)', opacity: 0.1 }
        ], {
            duration: duration,
            iterations: Infinity,
            easing: 'linear'
        });
    };

    createParticles();
});

// CSS Injection for reveal animations
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.2, 1, 0.3, 1);
    }
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
