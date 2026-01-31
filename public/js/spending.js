/**
 * 💰 RASTREAMENTO DE GASTOS
 */
class SpendingTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.budget = {
            combustivel: 800,
            alimentacao: 1500,
            passeios: 1200,
            outros: 500
        };
        this.init();
    }

    init() {
        this.createWidget();
        this.updateDisplay();
    }

    loadExpenses() {
        const saved = localStorage.getItem('tripExpenses');
        return saved ? JSON.parse(saved) : {
            combustivel: 0,
            alimentacao: 0,
            passeios: 0,
            outros: 0
        };
    }

    saveExpenses() {
        localStorage.setItem('tripExpenses', JSON.stringify(this.expenses));
    }

    addExpense(category, amount) {
        if (this.expenses.hasOwnProperty(category)) {
            this.expenses[category] += parseFloat(amount);
            this.saveExpenses();
            this.updateDisplay();
            
            window.notificationManager?.show(
                'Gasto Registrado',
                `${category}: R$ ${amount.toFixed(2)}`,
                'success'
            );
        }
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'spending-widget';
        widget.id = 'spendingWidget';
        
        widget.innerHTML = `
            <div class="spending-header">
                <div class="spending-title">💰 Controle de Gastos</div>
                <button onclick="window.spendingTracker.resetExpenses()" 
                        style="padding: 8px 16px; border-radius: 8px; background: var(--color-red-500); 
                               color: white; border: none; cursor: pointer; font-size: 12px;">
                    🔄 Resetar
                </button>
            </div>
            <div class="spending-comparison" id="spendingComparison"></div>
            <div class="spending-chart" id="spendingChart"></div>
        `;
        
        const budgetSection = document.querySelector('#budget') || document.querySelector('[id*="orcamento"]');
        if (budgetSection) {
            budgetSection.appendChild(widget);
        }
    }

    updateDisplay() {
        const totalBudget = Object.values(this.budget).reduce((a, b) => a + b, 0);
        const totalSpent = Object.values(this.expenses).reduce((a, b) => a + b, 0);
        const difference = totalBudget - totalSpent;
        
        const comparisonEl = document.getElementById('spendingComparison');
        if (comparisonEl) {
            comparisonEl.innerHTML = `
                <div class="spending-col">
                    <div class="spending-label">Estimado</div>
                    <div class="spending-value estimado">R$ ${totalBudget.toFixed(2)}</div>
                </div>
                <div class="spending-col">
                    <div class="spending-label">Gasto Real</div>
                    <div class="spending-value real">R$ ${totalSpent.toFixed(2)}</div>
                </div>
                <div class="spending-col">
                    <div class="spending-label">${difference >= 0 ? 'Economia' : 'Deficit'}</div>
                    <div class="spending-value ${difference >= 0 ? 'economia' : 'deficit'}">
                        R$ ${Math.abs(difference).toFixed(2)}
                    </div>
                    <div class="spending-difference ${difference >= 0 ? 'positive' : 'negative'}">
                        ${difference >= 0 ? '✓' : '⚠'} ${((difference / totalBudget) * 100).toFixed(1)}%
                    </div>
                </div>
            `;
        }
        
        this.updateChart(totalBudget, totalSpent);
    }

    updateChart(budget, spent) {
        const chartEl = document.getElementById('spendingChart');
        if (!chartEl) return;
        
        const budgetPercent = 50;
        const spentPercent = Math.min(50, (spent / budget) * 50);
        
        chartEl.innerHTML = `
            <div class="spending-chart-bar estimado" style="width: ${budgetPercent}%"></div>
            <div class="spending-chart-bar real" style="width: ${spentPercent}%"></div>
        `;
    }

    resetExpenses() {
        if (confirm('Deseja realmente resetar todos os gastos?')) {
            this.expenses = {
                combustivel: 0,
                alimentacao: 0,
                passeios: 0,
                outros: 0
            };
            this.saveExpenses();
            this.updateDisplay();
            
            window.notificationManager?.show(
                'Gastos Resetados',
                'Todos os gastos foram limpos',
                'success'
            );
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.spendingTracker = new SpendingTracker();
    });
} else {
    window.spendingTracker = new SpendingTracker();
}
