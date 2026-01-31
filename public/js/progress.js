/**
 * 📊 BARRA DE PROGRESSO DA VIAGEM
 */
class TripProgressManager {
    constructor() {
        this.tripStart = new Date('2026-02-13');
        this.tripEnd = new Date('2026-02-23');
        this.totalDays = 10;
        this.init();
    }

    init() {
        this.createProgressBar();
        this.updateProgress();
        setInterval(() => this.updateProgress(), 60000); // Atualiza a cada minuto
    }

    calculateProgress() {
        const now = new Date();
        const totalMs = this.tripEnd - this.tripStart;
        const elapsedMs = now - this.tripStart;
        const percentage = Math.max(0, Math.min(100, (elapsedMs / totalMs) * 100));
        
        return {
            percentage: percentage.toFixed(1),
            daysElapsed: Math.floor(elapsedMs / (1000 * 60 * 60 * 24)),
            daysRemaining: Math.ceil((this.tripEnd - now) / (1000 * 60 * 60 * 24)),
            isActive: now >= this.tripStart && now <= this.tripEnd
        };
    }

    createProgressBar() {
        const container = document.createElement('div');
        container.className = 'trip-progress-wrapper';
        container.id = 'tripProgress';
        
        container.innerHTML = `
            <div class="progress-header">
                <div class="progress-title">📍 Progresso da Viagem</div>
                <div class="progress-stats" id="progressStats">--</div>
            </div>
            <div class="progress-countdown" id="progressCountdown">--</div>
            <div class="progress-bar-container">
                <div class="progress-bar-fill" id="progressBarFill" style="width: 0%">
                    <span class="progress-percentage" id="progressPercentage">0%</span>
                </div>
            </div>
            <div class="progress-milestones" id="progressMilestones"></div>
        `;
        
        const mainContent = document.querySelector('.container') || document.querySelector('main') || document.body;
        const firstSection = mainContent.querySelector('section') || mainContent.firstChild;
        mainContent.insertBefore(container, firstSection);
    }

    updateProgress() {
        const progress = this.calculateProgress();
        const fillEl = document.getElementById('progressBarFill');
        const percentEl = document.getElementById('progressPercentage');
        const statsEl = document.getElementById('progressStats');
        const countdownEl = document.getElementById('progressCountdown');
        
        if (fillEl) fillEl.style.width = `${progress.percentage}%`;
        if (percentEl) percentEl.textContent = `${progress.percentage}%`;
        
        if (statsEl) {
            statsEl.textContent = `Dia ${progress.daysElapsed + 1} de ${this.totalDays}`;
        }
        
        if (countdownEl) {
            if (progress.isActive) {
                countdownEl.textContent = progress.daysRemaining > 0 
                    ? `⏰ Faltam ${progress.daysRemaining} dias` 
                    : `🎉 Último dia!`;
            } else if (progress.daysRemaining > 0) {
                countdownEl.textContent = `🗓️ Viagem começa em ${progress.daysRemaining} dias`;
            } else {
                countdownEl.textContent = `✅ Viagem concluída!`;
            }
        }
        
        this.updateMilestones(progress.daysElapsed);
    }

    updateMilestones(currentDay) {
        const milestonesEl = document.getElementById('progressMilestones');
        if (!milestonesEl) return;
        
        const milestones = [
            { day: 0, label: '🏁 Início' },
            { day: 3, label: '🏖️ Praias' },
            { day: 6, label: '🌊 Parrachos' },
            { day: 9, label: '🏁 Final' }
        ];
        
        milestonesEl.innerHTML = milestones.map(m => `
            <div class="milestone ${currentDay >= m.day ? 'completed' : ''} ${currentDay === m.day ? 'active' : ''}">
                ${m.label}
            </div>
        `).join('');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.tripProgressManager = new TripProgressManager();
    });
} else {
    window.tripProgressManager = new TripProgressManager();
}
