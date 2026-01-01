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

// Contador de Visualizações Global e Persistente
async function updateViewCount() {
    const viewElement = document.getElementById('view-count');
    // Namespace único para garantir que a contagem seja global e não resete
    const namespace = 'fluxus_design_v4';
    const key = 'visitas_totais';

    try {
        const hasVisited = localStorage.getItem('fluxus_prod_visited');
        // Se é a primeira vez desse navegador, usamos 'up' para somar +1 global
        // Se já visitou, usamos apenas o link da chave para buscar o valor atual
        let url = `https://api.counterapi.dev/v1/${namespace}/${key}`;

        if (!hasVisited) {
            url = `https://api.counterapi.dev/v1/${namespace}/${key}/up`;
            localStorage.setItem('fluxus_prod_visited', 'true');
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data && data.count !== undefined) {
            // Exibe a contagem real de todas as pessoas que já entraram
            viewElement.textContent = `${data.count.toLocaleString()} visualizações`;
        }
    } catch (error) {
        console.error('Erro no contador:', error);
        viewElement.textContent = 'Site Protegido';
    }
}

window.addEventListener('load', () => {
    revealOnScroll();
    updateViewCount();
});
