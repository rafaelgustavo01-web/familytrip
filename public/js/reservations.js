/* ============================================
   RESERVATIONS.JS
   Reservation Management System
   ============================================ */

window.reservationManager = {
    reservations: [],

    init: () => {
        window.reservationManager.reservations = Storage.getReservations();
        window.reservationManager.render();
    },

    addReservation: () => {
        const name = prompt("Nome do passeio/reserva:");
        if (!name) return;

        const date = prompt("Data (DD/MM):");
        if (!date) return;

        const time = prompt("Horário (HH:MM):");
        if (!time) return;

        const operator = prompt("Operador/Empresa:");
        if (!operator) return;

        const price = prompt("Valor por pessoa (R$):");
        if (!price || isNaN(price)) return;

        const people = prompt("Quantas pessoas?");
        if (!people || isNaN(people)) return;

        const newReservation = {
            name,
            date,
            time,
            operator,
            price: parseFloat(price),
            people: parseInt(people)
        };

        window.reservationManager.reservations = Storage.addReservation(newReservation);
        window.reservationManager.render();
        Utils.showNotification(`✅ Reserva "${name}" adicionada!`, 'success');
    },

    deleteReservation: (id) => {
        if (confirm("Tem certeza que deseja remover esta reserva?")) {
            window.reservationManager.reservations = Storage.deleteReservation(id);
            window.reservationManager.render();
            Utils.showNotification('✅ Reserva removida', 'success');
        }
    },

    generateVoucher: (id) => {
        const res = window.reservationManager.reservations.find(r => r.id === id);
        if (!res) return;

        const total = res.price * res.people;
        const voucherText = `
╔════════════════════════════════════════╗
║         🎫 VOUCHER DE PASSEIO          ║
╚════════════════════════════════════════╝

📌 PASSEIO: ${res.name}
📅 DATA: ${res.date}/2026
⏰ HORÁRIO: ${res.time}
🏢 OPERADOR: ${res.operator}

👥 PARTICIPANTES: ${res.people} pessoa(s)
💰 VALOR UNITÁRIO: R$ ${res.price.toFixed(2)}
💵 TOTAL: R$ ${total.toFixed(2)}

✅ STATUS: Confirmado
📱 Apresente este voucher 30 min antes

Bom passeio! 🌴🌊
        `;

        alert(voucherText);
        Utils.copyToClipboard(voucherText);
        Utils.showNotification('✅ Voucher copiado', 'success');
    },

    copyInfo: (id) => {
        const res = window.reservationManager.reservations.find(r => r.id === id);
        if (!res) return;

        const total = res.price * res.people;
        const info = `Passeio: ${res.name} | Data: ${res.date} | Horário: ${res.time} | Pessoas: ${res.people} | Total: R$ ${total.toFixed(2)}`;
        Utils.copyToClipboard(info);
        Utils.showNotification('✅ Informações copiadas', 'success');
    },

    render: () => {
        const container = document.getElementById('reservasContainer');

        if (window.reservationManager.reservations.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 40px 20px;">Nenhuma reserva adicionada ainda.</p>';
            return;
        }

        container.innerHTML = window.reservationManager.reservations
            .map(res => `
                <div class="reservation-card">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h4>${res.name}</h4>
                        <button class="btn btn-secondary btn-small" onclick="window.reservationManager.deleteReservation(${res.id})">🗑️ Remover</button>
                    </div>
                    <div class="reservation-info">
                        <div class="reservation-info-item">
                            <strong>Data</strong>
                            <span>${res.date}</span>
                        </div>
                        <div class="reservation-info-item">
                            <strong>Horário</strong>
                            <span>${res.time}</span>
                        </div>
                        <div class="reservation-info-item">
                            <strong>Operador</strong>
                            <span>${res.operator}</span>
                        </div>
                        <div class="reservation-info-item">
                            <strong>Valor (p/ pessoa)</strong>
                            <span>R$ ${res.price.toFixed(2)}</span>
                        </div>
                        <div class="reservation-info-item">
                            <strong>Pessoas</strong>
                            <span>${res.people}</span>
                        </div>
                        <div class="reservation-info-item">
                            <strong>Total</strong>
                            <span style="color: var(--color-accent); font-weight: bold;">R$ ${(res.price * res.people).toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="btn btn-small" onclick="window.reservationManager.generateVoucher(${res.id})">🎫 Gerar Voucher</button>
                    <button class="btn btn-secondary btn-small" onclick="window.reservationManager.copyInfo(${res.id})">📋 Copiar Info</button>
                </div>
            `)
            .join('');
    }
};