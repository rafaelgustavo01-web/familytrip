/**
 * 🏷️ BADGES E INDICADORES VISUAIS
 */
class BadgeManager {
    constructor() {
        this.badges = {
            plantao: { icon: '💼', text: 'Plantão', class: 'badge-plantao' },
            mare_ideal: { icon: '🌊', text: 'Maré Ideal', class: 'badge-mare-ideal' },
            mare: { icon: '🌊', text: 'Atenção Maré', class: 'badge-mare' },
            caro: { icon: '💰', text: 'Dia Caro', class: 'badge-caro' },
            economico: { icon: '💵', text: 'Econômico', class: 'badge-economico' },
            recomendado: { icon: '⭐', text: 'Recomendado', class: 'badge-recomendado' },
            imperdivel: { icon: '🔥', text: 'Imperdível', class: 'badge-imperdivel' },
            tempo_bom: { icon: '☀️', text: 'Tempo Bom', class: 'badge-tempo-bom' },
            tempo_ruim: { icon: '🌧️', text: 'Chuva', class: 'badge-tempo-ruim' }
        };
        this.init();
    }

    init() {
        this.addBadgesToDays();
        console.log('🏷️ Badge Manager initialized');
    }

    addBadgesToDays() {
        const dayConfigs = [
            { day: 0, badges: ['tempo_bom'] },
            { day: 1, badges: ['tempo_bom', 'economico'] },
            { day: 2, badges: ['mare_ideal', 'imperdivel'] },
            { day: 3, badges: ['tempo_bom', 'recomendado'] },
            { day: 4, badges: ['plantao', 'caro'] },
            { day: 5, badges: ['plantao', 'tempo_bom'] },
            { day: 6, badges: ['mare_ideal', 'imperdivel'] },
            { day: 7, badges: ['tempo_bom', 'recomendado'] },
            { day: 8, badges: ['caro', 'imperdivel'] },
            { day: 9, badges: ['tempo_bom'] }
        ];

        dayConfigs.forEach(config => {
            const dayElement = document.querySelector(`[id*="day-${config.day}"]`) || 
                             document.querySelector(`[data-day="${config.day}"]`);
            
            if (dayElement) {
                this.addBadgesToElement(dayElement, config.badges);
            }
        });
    }

    addBadgesToElement(element, badgeKeys) {
        let container = element.querySelector('.badges-container');
        
        if (!container) {
            container = document.createElement('div');
            container.className = 'badges-container';
            
            const title = element.querySelector('h3') || element.querySelector('.day-title');
            if (title) {
                title.after(container);
            } else {
                element.insertBefore(container, element.firstChild);
            }
        }

        badgeKeys.forEach(key => {
            if (this.badges[key]) {
                const badge = this.createBadge(this.badges[key]);
                container.appendChild(badge);
            }
        });
    }

    createBadge(badgeConfig) {
        const badge = document.createElement('span');
        badge.className = `badge ${badgeConfig.class}`;
        badge.innerHTML = `${badgeConfig.icon} ${badgeConfig.text}`;
        return badge;
    }

    addCustomBadge(element, icon, text, className) {
        const badge = document.createElement('span');
        badge.className = `badge ${className}`;
        badge.innerHTML = `${icon} ${text}`;
        
        let container = element.querySelector('.badges-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'badges-container';
            element.appendChild(container);
        }
        
        container.appendChild(badge);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.badgeManager = new BadgeManager();
    });
} else {
    window.badgeManager = new BadgeManager();
}
