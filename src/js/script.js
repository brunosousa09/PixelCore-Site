// navbar.js

document.addEventListener("DOMContentLoaded", function () {
    // ============================
    // 0. Inicializa tema (claro/escuro)
    // ============================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Carrega estado inicial do localStorage ou do prefers-color-scheme
    if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
        darkIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        lightIcon.classList.remove('hidden');
    }

    // ============================
    // 1. Alterna tema ao clicar no botão
    // ============================
    themeToggleBtn.addEventListener('click', () => {
        // alterna ícones
        darkIcon.classList.toggle('hidden');
        lightIcon.classList.toggle('hidden');

        // verifica atual e alterna
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    });


    // ============================
    // 2. Toggle Menu Mobile
    // ============================
    const toggleBtn = document.querySelector('[data-collapse-toggle]');
    const menu = document.getElementById('navbar-sticky');

    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // ============================
    // 3. Fechar menu ao clicar em um link (mobile)
    // ============================
    document.querySelectorAll('#navbar-sticky a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768 && menu) {
                menu.classList.add('hidden');
            }
        });
    });

    // ============================
    // 4. Mostrar navbar ao rolar para cima, esconder ao rolar para baixo
    // ============================
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // rolando para baixo
            navbar.classList.add('-translate-y-full');
        } else {
            // rolando para cima
            navbar.classList.remove('-translate-y-full');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // ============================
    // 5. Hover para expandir navbar oculta (desktop)
    // ============================
    navbar.addEventListener('mouseover', () => {
        navbar.classList.remove('-translate-y-full');
    });
    navbar.addEventListener('mouseout', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('-translate-y-full');
        }
    });
});
