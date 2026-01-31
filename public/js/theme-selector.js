/**
 * 🎨 DARK MODE TOGGLE MELHORADO
 */
class ThemeSelector {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.createSelector();
        this.applyTheme(this.currentTheme);
        this.setupAutoTheme();
        console.log('🎨 Theme Selector initialized');
    }

    loadTheme() {
        const saved = localStorage.getItem('tripTheme');
        if (saved) return saved;
        
        // Detectar preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    saveTheme(theme) {
        localStorage.setItem('tripTheme', theme);
    }

    createSelector() {
        // Evitar duplicação
        if (document.querySelector('.theme-selector')) return;

        const selector = document.createElement('div');
        selector.className = 'theme-selector';
        selector.innerHTML = `
            <button class="theme-button" data-theme="light" title="Modo Claro">
                ☀️
            </button>
            <button class="theme-button" data-theme="dark" title="Modo Escuro">
                🌙
            </button>
            <button class="theme-button" data-theme="auto" title="Automático">
                🌓
            </button>
        `;
        
        document.body.appendChild(selector);
        
        // Adicionar event listeners
        selector.querySelectorAll('.theme-button').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.setTheme(theme);
            });
        });
        
        // Marcar tema atual como ativo
        this.updateActiveButton();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.saveTheme(theme);
        
        if (theme === 'auto') {
            this.applyAutoTheme();
        } else {
            this.applyTheme(theme);
        }
        
        this.updateActiveButton();
        
        // Notificar
        if (window.notificationManager) {
            const themeNames = {
                light: 'Claro ☀️',
                dark: 'Escuro 🌙',
                auto: 'Automático 🌓'
            };
            window.notificationManager.show(
                'Tema Alterado',
                `Modo ${themeNames[theme]} ativado`,
                'success',
                2000
            );
        }
    }

    applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'dark') {
            html.setAttribute('data-color-scheme', 'dark');
            html.style.colorScheme = 'dark';
        } else {
            html.setAttribute('data-color-scheme', 'light');
            html.style.colorScheme = 'light';
        }
        
        // Transição suave
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }

    applyAutoTheme() {
        const hour = new Date().getHours();
        
        // Modo escuro entre 18h e 6h
        if (hour >= 18 || hour < 6) {
            this.applyTheme('dark');
        } else {
            this.applyTheme('light');
        }
    }

    setupAutoTheme() {
        // Verificar mudança na preferência do sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (this.currentTheme === 'auto') {
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
        
        // Atualizar automaticamente a cada hora (se modo auto)
        setInterval(() => {
            if (this.currentTheme === 'auto') {
                this.applyAutoTheme();
            }
        }, 3600000); // 1 hora
    }

    updateActiveButton() {
        document.querySelectorAll('.theme-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-theme="${this.currentTheme}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
}

// Inicialização
function initThemeSelector() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.themeSelector = new ThemeSelector();
        });
    } else {
        window.themeSelector = new ThemeSelector();
    }
}

initThemeSelector();
