/* ============================================
   STORAGE.JS
   LocalStorage Management & Utilities
   ============================================ */

const STORAGE_KEYS = {
    RESERVATIONS: 'trip_reservations',
    NOTES: 'trip_notes',
    SETTINGS: 'trip_settings'
};

const Storage = {
    // Reservations
    getReservations: () => {
        const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
        return data ? JSON.parse(data) : [];
    },

    saveReservations: (reservations) => {
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
    },

    addReservation: (reservation) => {
        const reservations = Storage.getReservations();
        reservations.push({
            ...reservation,
            id: Date.now(),
            createdAt: new Date().toISOString()
        });
        Storage.saveReservations(reservations);
        return reservations;
    },

    deleteReservation: (id) => {
        const reservations = Storage.getReservations().filter(r => r.id !== id);
        Storage.saveReservations(reservations);
        return reservations;
    },

    updateReservation: (id, updates) => {
        const reservations = Storage.getReservations().map(r =>
            r.id === id ? { ...r, ...updates } : r
        );
        Storage.saveReservations(reservations);
        return reservations;
    },

    // Notes
    getNotes: () => {
        return localStorage.getItem(STORAGE_KEYS.NOTES) || '';
    },

    saveNotes: (notes) => {
        localStorage.setItem(STORAGE_KEYS.NOTES, notes);
    },

    // Settings
    getSettings: () => {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : { theme: 'dark', currency: 'BRL' };
    },

    saveSettings: (settings) => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    },

    // Clear All
    clearAll: () => {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    },

    // Export Data
    exportData: () => {
        return JSON.stringify({
            reservations: Storage.getReservations(),
            notes: Storage.getNotes(),
            settings: Storage.getSettings(),
            exportDate: new Date().toISOString()
        }, null, 2);
    },

    // Import Data
    importData: (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            if (data.reservations) Storage.saveReservations(data.reservations);
            if (data.notes) Storage.saveNotes(data.notes);
            if (data.settings) Storage.saveSettings(data.settings);
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }
};

// Utilities
const Utils = {
    copyToClipboard: (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copiado para área de transferência');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    },

    formatCurrency: (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-${type === 'success' ? 'accent' : 'error'});
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
};