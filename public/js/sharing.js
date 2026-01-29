/* ============================================
   SHARING.JS
   Sharing & Collaboration Features
   ============================================ */

window.sharingManager = {
    generateShareLink: () => {
        const shareDiv = document.getElementById('shareLink');
        const tripInfo = {
            reservations: Storage.getReservations(),
            notes: Storage.getNotes(),
            exportDate: new Date().toISOString()
        };
        
        const encoded = btoa(JSON.stringify(tripInfo));
        const link = `${window.location.origin}${window.location.pathname}`;
        
        shareDiv.innerHTML = `
            <div class="card">
                <strong>🔗 Link compartilhável:</strong>
                <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-top: 10px;">
                    Compartilhe este link com amigos e família para colaborarem na viagem:
                </p>
                <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
                    <input type="text" value="${link}" style="flex: 1; min-width: 200px; padding: 8px; border: 1px solid var(--color-border); border-radius: 6px; background: var(--color-bg-dark); color: var(--color-text-primary); font-size: 0.9rem;" readonly>
                    <button class="btn btn-small" onclick="Utils.copyToClipboard('${link}')">📋 Copiar URL</button>
                </div>
                <button class="btn" style="margin-top: 10px;" onclick="window.sharingManager.generateWhatsApp()">📱 Compartilhar no WhatsApp</button>
            </div>
        `;
    },

    saveNotes: () => {
        const notes = document.getElementById('collaborativeNotes').value;
        Storage.saveNotes(notes);
        
        const notesDisplay = document.getElementById('notesDisplay');
        notesDisplay.innerHTML = `
            <div class="card">
                <strong style="color: var(--color-accent);">✅ Notas salvas com sucesso!</strong>
                <div class="share-notes">${notes || '(Sem notas ainda)'}</div>
            </div>
        `;
        
        Utils.showNotification('✅ Notas salvas localmente', 'success');
    },

    generateWhatsApp: () => {
        const contactName = document.getElementById('contactName').value || 'Pessoal';
        const message = encodeURIComponent(
            `🌴 Oi ${contactName}! Vem comigo para a viagem ao Nordeste (Pium - 13/02 a 23/02)? ` +
            `Tenho um planejador interativo com roteiro, orçamento, marés e passeios. Compartilho? 🏖️🌊`
        );
        window.open(`https://wa.me/?text=${message}`, '_blank');
    },

    loadSavedNotes: () => {
        const savedNotes = Storage.getNotes();
        const textarea = document.getElementById('collaborativeNotes');
        const display = document.getElementById('notesDisplay');
        
        if (savedNotes && textarea) {
            textarea.value = savedNotes;
            display.innerHTML = `
                <div class="card">
                    <strong>📝 Notas anteriores carregadas:</strong>
                    <div class="share-notes" style="margin-top: 10px;">${savedNotes}</div>
                </div>
            `;
        }
    },

    exportTrip: () => {
        const exportData = Storage.exportData();
        const blob = new Blob([exportData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `viagem-nordeste-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        Utils.showNotification('✅ Dados exportados', 'success');
    },

    importTrip: () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const success = Storage.importData(event.target.result);
                    if (success) {
                        Utils.showNotification('✅ Dados importados com sucesso', 'success');
                        window.reservationManager.init();
                        window.sharingManager.loadSavedNotes();
                    } else {
                        Utils.showNotification('❌ Erro ao importar dados', 'error');
                    }
                } catch (err) {
                    Utils.showNotification('❌ Erro ao ler arquivo', 'error');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    getTravelSummary: () => {
        const reservations = Storage.getReservations();
        const totalCost = reservations.reduce((sum, r) => sum + (r.price * r.people), 0);
        
        return {
            totalReservations: reservations.length,
            estimatedCost: totalCost,
            totalPeople: reservations.reduce((sum, r) => sum + r.people, 0),
            reservationList: reservations.map(r => `${r.name} (${r.date} - ${r.time})`).join(', ')
        };
    }
};