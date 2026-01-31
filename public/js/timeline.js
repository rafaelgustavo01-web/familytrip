/**
 * 🎯 TIMELINE VISUAL INTERATIVA
 * Gerencia a visualização de dias em formato timeline
 */

class TimelineManager {
    constructor() {
        this.days = [];
        this.currentDayIndex = -1;
        this.init();
    }

    init() {
        this.identifyCurrentDay();
        this.enhanceExistingDays();
        console.log('✅ Timeline Manager initialized');
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

    enhanceExistingDays() {
        const dayCards = document.querySelectorAll('[id^="day-"]');
        
        dayCards.forEach((card, index) => {
            this.enhanceDayCard(card, index);
        });
    }

    enhanceDayCard(card, index) {
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
        
        // Adicionar marker
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.textContent = index + 1;
        marker.title = `Dia ${index + 1}`;
        card.insertBefore(marker, card.firstChild);
        
        // Tornar card expansível
        this.makeCardExpandable(card);
    }

    makeCardExpandable(card) {
        const header = card.querySelector('h3') || card.querySelector('.day-title');
        if (!header) return;
        
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    }

    createTimelineContainer(parentElement) {
        const container = document.createElement('div');
        container.className = 'timeline-container';
        
        const line = document.createElement('div');
        line.className = 'timeline-line';
        container.appendChild(line);
        
        if (parentElement) {
            parentElement.insertBefore(container, parentElement.firstChild);
        }
        
        return container;
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.timelineManager = new TimelineManager();
    });
} else {
    window.timelineManager = new TimelineManager();
}
