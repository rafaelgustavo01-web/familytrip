
/**
 * 📊 GOOGLE ANALYTICS 4 INTEGRATION
 */
class AnalyticsManager {
    constructor() {
        this.GA_ID = 'G-XXXXXXXXXX'; // SUBSTITUIR pelo seu ID do Google Analytics
        this.init();
    }

    init() {
        // this.loadGoogleAnalytics(); // Descomente quando tiver o GA_ID
        this.trackEvents();
        console.log('📊 Analytics Manager initialized');
    }

    loadGoogleAnalytics() {
        // Carregar script do Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_ID}`;
        document.head.appendChild(script);

        // Inicializar
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', this.GA_ID);
        
        window.gtag = gtag;
    }

    trackEvents() {
        // Rastrear cliques em tabs
        document.querySelectorAll('.tab-button, [role="tab"]').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.trackEvent('tab_view', {
                    tab_name: e.target.textContent.trim()
                });
            });
        });

        // Rastrear visualização de dias
        document.querySelectorAll('[id^="day-"]').forEach((day, index) => {
            day.addEventListener('click', () => {
                this.trackEvent('day_view', {
                    day_number: index + 1
                });
            });
        });

        // Rastrear uso de checklist
        const originalToggle = window.checklistManager?.toggleCheckbox;
        if (originalToggle) {
            window.checklistManager.toggleCheckbox = function(...args) {
                originalToggle.apply(this, args);
                this.trackEvent('checklist_toggle', {
                    item_key: args[0]
                });
            }.bind(this);
        }
    }

    trackEvent(eventName, params = {}) {
        // Log local para desenvolvimento
        console.log('📊 Event:', eventName, params);
        
        // Enviar para Google Analytics (quando configurado)
        if (window.gtag) {
            window.gtag('event', eventName, params);
        }
    }

    trackPageView(pageName) {
        console.log('📄 Page View:', pageName);
        
        if (window.gtag) {
            window.gtag('event', 'page_view', {
                page_title: pageName
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.analyticsManager = new AnalyticsManager();
    });
} else {
    window.analyticsManager = new AnalyticsManager();
}
