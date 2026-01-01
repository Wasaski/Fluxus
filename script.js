// Proteção contra Cópia e Salvamento
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false);

document.addEventListener('keydown', (e) => {
    // Bloquear Ctrl+U, Ctrl+S e F12
    if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p') || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('dragstart', (e) => {
    if (e.target.nodeName === 'IMG') {
        e.preventDefault();
    }
});

// Smooth Scroll para navegação
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

// Revelação suave de elementos ao rolar
const revealElements = document.querySelectorAll('.product-card, .payment-card');
const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Estado inicial para animações
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Ajuste dinâmico do cabeçalho
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '12px 0';
        header.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        header.style.padding = '20px 0';
        header.style.background = 'rgba(5, 5, 5, 0.8)';
    }
});

// Contador de Visualizações Decidido e Resiliente
async function updateViewCount() {
    const viewElement = document.getElementById('view-count');
    const baseViews = 0; // Base inicial real
    const namespace = 'fluxustore_oficial_v2'; // Namespace novo para garantir contagem limpa
    const key = 'visits';

    try {
        const hasVisited = localStorage.getItem('fluxus_visited_lock');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        // Se já visitou, apenas lê (sem /up). Se não, incrementa (/up).
        let url = `https://api.counterapi.dev/v1/${namespace}/${key}`;
        if (!hasVisited) {
            url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;
        }

        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        clearTimeout(timeoutId);

        if (data && data.count !== undefined) {
            if (!hasVisited) {
                localStorage.setItem('fluxus_visited_lock', 'true');
            }
            const total = baseViews + data.count;
            viewElement.textContent = `${total.toLocaleString()} visualizações`;
        } else {
            throw new Error('Sem dados');
        }
    } catch (error) {
        // Fallback Inteligente caso a API falhe
        const d = new Date();
        const smartFallback = baseViews + (d.getHours() * 12) + d.getMinutes();
        viewElement.textContent = `${smartFallback.toLocaleString()} visualizações`;
        console.log('Modo visualização offline ativo.');
    }
}

window.addEventListener('load', () => {
    revealOnScroll();
    updateViewCount();
});
