/**
 * 🔔 SISTEMA DE NOTIFICAÇÕES
 */
class NotificationManager {
    constructor() {
        this.queue = [];
        this.init();
    }

    init() {
        this.requestPermission();
        this.scheduleUpcomingReminders();
        console.log('🔔 Notification Manager initialized');
    }

    async requestPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }

    show(title, message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `notification-toast ${type}`;
        
        const icons = {
            success: '✅',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };
        
        toast.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type]}</span>
                <div class="notification-text">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, duration);
    }

    scheduleUpcomingReminders() {
        const reminders = [
            { day: 1, time: '08:00', message: '🏁 Hoje é dia de partir! Boa viagem para Pium!' },
            { day: 2, time: '07:00', message: '🏖️ Dia de praias! Não esqueça o protetor solar' },
            { day: 3, time: '09:00', message: '🌊 Parrachos hoje! Maré ideal às 09h45' },
            { day: 5, time: '08:00', message: '💼 Lembre-se: plantão hoje' },
            { day: 8, time: '07:00', message: '📍 Ponta Negra e Pipa no roteiro hoje!' },
            { day: 10, time: '10:00', message: '🏁 Último dia! Aproveite cada momento' }
        ];
        
        // Simular notificação de teste
        setTimeout(() => {
            this.show(
                'Sistema de Notificações Ativo',
                'Você receberá lembretes sobre suas atividades',
                'success'
            );
        }, 2000);
    }

    sendBrowserNotification(title, message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico'
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.notificationManager = new NotificationManager();
    });
} else {
    window.notificationManager = new NotificationManager();
}
