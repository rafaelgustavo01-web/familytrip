/**
 * 🎯 TIMELINE VISUAL INTERATIVA
 */
class TimelineManager {
    constructor() {
        this.days = [];
        this.currentDayIndex = -1;
        this.init();
    }

    init() {
        setTimeout(() => {
            this.identifyCurrentDay();
            this.createTimeline();
            this.enhanceExistingDays();
        }, 200);
    }

    identifyCurrentDay() {
        const today = new Date();
        const tripStart = new Date('2026-02-13');
        const tripEnd = new Date('2026-02-23');
        
        if (today >= tripStart && today <= tripEnd) {
            const daysPassed = Math.floor((today - tripStart) / (1000 * 60 * 60 * 24));
            this.currentDayIndex = daysPassed;
        }
    }

    createTimeline() {
        // Encontrar o container de roteiro
        const itinerary = document.querySelector('#itinerary, .itinerary-content, [id*="roteiro"]');
        if (!itinerary) return;

        // Verificar se já existe timeline
        let timelineContainer = itinerary.querySelector('.timeline-container');
        
        if (!timelineContainer) {
            timelineContainer = document.createElement('div');
            timelineContainer.className = 'timeline-container';
            
            const line = document.createElement('div');
            line.className = 'timeline-line';
            timelineContainer.appendChild(line);
            
            // Inserir após o título
            const title = itinerary.querySelector('h2');
            if (title) {
                title.after(timelineContainer);
            }
        }
    }

    enhanceExistingDays() {
        // Buscar cards de dias de várias formas possíveis
        const selectors = [
            '[id^="day"]',
            '[class*="day-card"]',
            '[class*="dia-"]',
            '.itinerary-day',
            'section[id*="dia"]'
        ];
        
        let dayCards = [];
        for (const selector of selectors) {
            const found = document.querySelectorAll(selector);
            if (found.length > 0) {
                dayCards = Array.from(found);
                break;
            }
        }
        
        dayCards.forEach((card, index) => {
            this.enhanceDayCard(card, index);
        });
    }

    enhanceDayCard(card, index) {
        // Evitar duplicação
        if (card.classList.contains('timeline-enhanced')) return;
        card.classList.add('timeline-enhanced');
        
        // Adicionar classe timeline
        card.classList.add('timeline-day');
        
        // Determinar status do dia
        if (index < this.currentDayIndex) {
            card.classList.add('completed');
        } else if (index === this.currentDayIndex) {
            card.classList.add('current');
        } else {
            card.classList.add('future');
        }
        
        // Adicionar marker se não existir
        if (!card.querySelector('.timeline-marker')) {
            const marker = document.createElement('div');
            marker.className = 'timeline-marker';
            marker.textContent = index + 1;
            marker.title = `Dia ${index + 1}`;
            
            // Inserir no início do card
            card.style.position = 'relative';
            card.insertBefore(marker, card.firstChild);
        }
        
        // Tornar expansível
        this.makeCardExpandable(card);
    }

    makeCardExpandable(card) {
        const header = card.querySelector('h3, h2, .day-title, [class*="title"]');
        if (!header) return;
        
        // Adicionar ícone de expand
        if (!header.querySelector('.activity-expand-icon')) {
            const expandIcon = document.createElement('span');
            expandIcon.className = 'activity-expand-icon';
            expandIcon.textContent = '▼';
            expandIcon.style.marginLeft = 'auto';
            expandIcon.style.float = 'right';
            header.appendChild(expandIcon);
        }
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    }
}

// Inicialização
function initTimelineManager() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.timelineManager = new TimelineManager();
        });
    } else {
        window.timelineManager = new TimelineManager();
    }
}

initTimelineManager();
