/* ============================================
   UI.JS
   User Interface Rendering Functions
   ============================================ */

const UI = {
    // Tab Switching
    switchTab: (tabName) => {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected tab
        const tab = document.getElementById(tabName);
        if (tab) tab.classList.add('active');

        // Activate button
        const button = event.target;
        if (button) button.classList.add('active');
    },

    // Render Header Info
    renderHeaderInfo: () => {
        const container = document.getElementById('headerInfo');
        container.innerHTML = TRIP_DATA.headerInfo
            .map(info => `
                <div class="info-card">
                    <strong>${info.label}</strong>
                    <span>${info.value}</span>
                </div>
            `)
            .join('');
    },

    // Render Tabs
    renderTabs: () => {
        const container = document.getElementById('tabsContainer');
        const tabs = [
            { id: 'itinerary', label: '📅 Roteiro Completo' },
            { id: 'budget', label: '💰 Orçamento' },
            { id: 'reservas', label: '🎫 Reservas & Vouchers' },
            { id: 'tides', label: '🌊 Tábua de Marés' },
            { id: 'links', label: '🔗 Links Úteis' },
            { id: 'shared', label: '👥 Compartilhado' }
        ];

        container.innerHTML = tabs
            .map((tab, idx) => `
                <button class="tab-btn ${idx === 0 ? 'active' : ''}" onclick="UI.switchTab('${tab.id}')">
                    ${tab.label}
                </button>
            `)
            .join('');
    },

    // Render Itinerary
    renderItinerary: () => {
        const container = document.getElementById('itineraryContainer');
        container.innerHTML = TRIP_DATA.days
            .map(day => `
                <div class="day-card">
                    <h4>Dia ${day.day} - ${day.title}</h4>
                    <div class="date">${day.date}</div>
                    <div>
                        <strong style="color: var(--color-primary);">Atividades:</strong>
                        ${day.activities.map(a => `<div class="activity">• ${a}</div>`).join('')}
                    </div>
                    <div style="margin-top: 15px;">
                        <strong style="color: var(--color-text-secondary); font-size: 0.9rem;">Refeições:</strong>
                        <div style="margin-top: 8px;">
                            ${day.meals.map(m => `<span class="meal-badge">${m}</span>`).join('')}
                        </div>
                    </div>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--color-border);">
                        <small style="color: var(--color-text-muted);">💡 ${day.notes}</small>
                    </div>
                </div>
            `)
            .join('');
    },

    // Render Budget
    renderBudget: () => {
        const container = document.getElementById('budgetContainer');
        container.innerHTML = TRIP_DATA.budget
            .map((item, idx) => `
                <div class="budget-item">
                    <h4>${item.category}</h4>
                    <div class="budget-range">${item.estimate}</div>
                    <div class="budget-label">${item.details}</div>
                    <div class="budget-bar">
                        <div class="budget-fill" style="width: ${(idx + 1) * 20}%"></div>
                    </div>
                </div>
            `)
            .join('');

        // Render economy tips
        const tipsContainer = document.getElementById('economyTips');
        tipsContainer.innerHTML = TRIP_DATA.economyTips
            .map(tip => `<li style="padding: 10px 0; border-bottom: 1px solid var(--color-border);">${tip}</li>`)
            .join('');
    },

    // Render Tides
    renderTides: () => {
        const container = document.getElementById('tidesContainer');
        container.innerHTML = `
            <h4>Previsão de Marés - Dias Chave</h4>
            ${TRIP_DATA.tides
                .map(tide => `
                    <div class="tide-item">
                        <div class="tide-day">${tide.date}</div>
                        <div class="tide-data">
                            <span>${tide.time} - ${tide.lowTide}</span>
                            <span class="tide-status ${tide.status === 'IDEAL' || tide.status === 'EXCELENTE' ? 'good' : 'fair'}">
                                ${tide.status}
                            </span>
                        </div>
                    </div>
                `)
                .join('')}
        `;

        // Render tides important tips
        const tipsContainer = document.getElementById('tidesImportant');
        tipsContainer.innerHTML = TRIP_DATA.tidesImportant
            .map(tip => `<li style="padding: 8px 0;">${tip}</li>`)
            .join('');

        // Render tides links
        const linksContainer = document.getElementById('tidesLinksContainer');
        linksContainer.innerHTML = TRIP_DATA.operadores.tides
            .map(link => `
                <div class="link-card">
                    <a href="${link.url}" target="_blank">🌐 ${link.name}</a>
                    <p>${link.description}</p>
                </div>
            `)
            .join('');
    },

    // Render Links
    renderLinks: () => {
        const container = document.getElementById('linksContainer');
        
        let html = `
            <h3 style="color: var(--color-text-secondary); margin-top: 30px; margin-bottom: 15px;">🏖️ Passeios - Parrachos de Pirangi</h3>
            <div class="links-grid">
                ${TRIP_DATA.operadores.parrachos
                    .map(op => `
                        <div class="link-card">
                            <a href="${op.url}" target="_blank">${op.name}</a>
                            <p>${op.price} | ${op.details}</p>
                        </div>
                    `)
                    .join('')}
            </div>

            <h3 style="color: var(--color-text-secondary); margin-top: 30px; margin-bottom: 15px;">🌊 Passeios - Maracajaú</h3>
            <div class="links-grid">
                ${TRIP_DATA.operadores.maracajau
                    .map(op => `
                        <div class="link-card">
                            <a href="${op.url}" target="_blank">${op.name}</a>
                            <p>${op.price} | ${op.details}</p>
                        </div>
                    `)
                    .join('')}
            </div>

            <h3 style="color: var(--color-text-secondary); margin-top: 30px; margin-bottom: 15px;">🍽️ Restaurantes Saudáveis</h3>
            <div class="links-grid">
                ${TRIP_DATA.operadores.restaurantes
                    .map(rest => `
                        <div class="link-card">
                            <p style="color: var(--color-primary); font-weight: 600;">${rest.name}</p>
                            <p>${rest.description}</p>
                        </div>
                    `)
                    .join('')}
            </div>

            <h3 style="color: var(--color-text-secondary); margin-top: 30px; margin-bottom: 15px;">🚗 Ferramentas de Viagem</h3>
            <div class="links-grid">
                ${TRIP_DATA.operadores.tools
                    .map(tool => `
                        <div class="link-card">
                            <a href="${tool.url}" target="_blank">${tool.name}</a>
                            <p>${tool.description}</p>
                        </div>
                    `)
                    .join('')}
            </div>
        `;

        container.innerHTML = html;
    },

    // Render Share Checklist
    renderShareChecklist: () => {
        const container = document.getElementById('shareChecklistContainer');
        container.innerHTML = TRIP_DATA.shareChecklist
            .map(item => `
                <li style="padding: 10px 0; border-bottom: 1px solid var(--color-border);">
                    <input type="checkbox"> ${item}
                </li>
            `)
            .join('');
    }
};

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    UI.renderHeaderInfo();
    UI.renderTabs();
    UI.renderItinerary();
    UI.renderBudget();
    UI.renderTides();
    UI.renderLinks();
    UI.renderShareChecklist();
});