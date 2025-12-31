// 1. Digitalização de Textos (Typewriter Effect)
const texts = [
    "LOGOS_QUE_REDEFINEM_PADRÕES",
    "CÓDIGO_LIMPO_DESIGN_VIVO",
    "SISTEMAS_VISUAIS_DE_ALTA_PERFORMANCE",
    "FLUXUS_O_FUTURO_DA_SUA_MARCA"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa no final da frase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// 2. Motion Animation no Scroll (Intersection Observer)
const revealOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const productObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// 3. Header Dynamic State
const header = document.querySelector('header');
const logo = document.querySelector('.logo-img');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(13, 13, 13, 0.95)';
        logo.style.height = '60px';
    } else {
        header.style.padding = '20px 0';
        header.style.background = 'rgba(13, 13, 13, 0.8)';
        logo.style.height = '100px';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    type();
    document.querySelectorAll('.product-card').forEach(card => {
        productObserver.observe(card);
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
