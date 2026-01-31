/**
 * ✅ CHECKLIST INTERATIVO POR DIA
 */
class ChecklistManager {
    constructor() {
        this.checklists = this.loadChecklists();
        this.init();
    }

    init() {
        this.enhanceActivities();
        console.log('✅ Checklist Manager initialized');
    }

    loadChecklists() {
        const saved = localStorage.getItem('tripChecklists');
        return saved ? JSON.parse(saved) : {};
    }

    saveChecklists() {
        localStorage.setItem('tripChecklists', JSON.stringify(this.checklists));
    }

    enhanceActivities() {
        const activityLists = document.querySelectorAll('ul');
        
        activityLists.forEach((list, dayIndex) => {
            const items = list.querySelectorAll('li');
            
            items.forEach((item, itemIndex) => {
                this.addCheckbox(item, dayIndex, itemIndex);
            });
        });
    }

    addCheckbox(item, dayIndex, itemIndex) {
        const key = `day${dayIndex}_item${itemIndex}`;
        const isChecked = this.checklists[key] || false;
        
        item.classList.add('checklist-item');
        
        const checkbox = document.createElement('div');
        checkbox.className = `checklist-checkbox ${isChecked ? 'checked' : ''}`;
        checkbox.onclick = () => this.toggleCheckbox(key, checkbox, item);
        
        const textSpan = document.createElement('span');
        textSpan.className = `checklist-text ${isChecked ? 'completed' : ''}`;
        textSpan.textContent = item.textContent;
        
        item.textContent = '';
        item.appendChild(checkbox);
        item.appendChild(textSpan);
        
        if (isChecked) {
            item.classList.add('completed');
        }
    }

    toggleCheckbox(key, checkbox, item) {
        const isChecked = !this.checklists[key];
        this.checklists[key] = isChecked;
        this.saveChecklists();
        
        checkbox.classList.toggle('checked', isChecked);
        const textSpan = item.querySelector('.checklist-text');
        if (textSpan) {
            textSpan.classList.toggle('completed', isChecked);
        }
        item.classList.toggle('completed', isChecked);
        
        if (isChecked) {
            this.showCelebration();
        }
    }

    showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'checklist-celebration';
        celebration.textContent = '🎉';
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.remove(), 1000);
    }

    getDayProgress(dayIndex) {
        const dayKeys = Object.keys(this.checklists).filter(k => k.startsWith(`day${dayIndex}_`));
        const completed = dayKeys.filter(k => this.checklists[k]).length;
        const total = dayKeys.length;
        
        return {
            completed,
            total,
            percentage: total > 0 ? (completed / total) * 100 : 0
        };
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.checklistManager = new ChecklistManager();
    });
} else {
    window.checklistManager = new ChecklistManager();
}
