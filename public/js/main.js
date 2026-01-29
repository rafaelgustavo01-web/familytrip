/* ============================================
   MAIN.JS
   Application Initialization & Entry Point
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌴 Iniciando Viagem Nordeste 2026 - App');

    // Initialize all modules
    window.reservationManager.init();
    window.sharingManager.loadSavedNotes();

    // Setup event listeners
    setupEventListeners();

    // Check for PWA support
    checkPWASupport();

    console.log('✅ App iniciado com sucesso');
});

// Event Listeners Setup
function setupEventListeners() {
    // Auto-save notes every 30 seconds
    const notesInput = document.getElementById('collaborativeNotes');
    if (notesInput) {
        notesInput.addEventListener('input', Utils.debounce(() => {
            Storage.saveNotes(notesInput.value);
        }, 3000));
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S = Save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            window.sharingManager.saveNotes();
        }

        // Ctrl/Cmd + E = Export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            window.sharingManager.exportTrip();
        }
    });
}

// PWA Support Check
function checkPWASupport() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => console.log('✅ Service Worker registrado'))
            .catch(err => console.log('❌ Service Worker erro:', err));
    }

    // Check if app is installed
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('💾 PWA pode ser instalada');
    });
}

// Global API for console access
window.TripApp = {
    getData: () => TRIP_DATA,
    getReservations: () => Storage.getReservations(),
    getNotes: () => Storage.getNotes(),
    exportData: () => Storage.exportData(),
    importData: (json) => Storage.importData(json),
    clearAll: () => {
        if (confirm('Tem certeza que deseja limpar TODOS os dados? Esta ação é irreversível!')) {
            Storage.clearAll();
            location.reload();
        }
    },
    getTravelSummary: () => window.sharingManager.getTravelSummary()
};

console.log('💡 Dica: Use window.TripApp para acessar funções globais (ex: TripApp.exportData())');

// Auto-save to prevent data loss
window.addEventListener('beforeunload', () => {
    const textarea = document.getElementById('collaborativeNotes');
    if (textarea) {
        Storage.saveNotes(textarea.value);
    }
});