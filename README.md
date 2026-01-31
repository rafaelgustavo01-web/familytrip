# 🌴 Viagem Nordeste 2026 - Planejador Interativo

Aplicação web responsiva e colaborativa para planejamento de viagem ao Nordeste (Pium, RN) com suporte a PWA, sincronização offline e compartilhamento em tempo real.

## ✨ Funcionalidades

### Core Features
- ✅ **Roteiro Completo**: 10 dias detalhados com atividades, refeições e notas
- ✅ **Controle de Orçamento**: Estimativas dinâmicas de gastos (combustível, alimentação, passeios)
- ✅ **Gerenciamento de Reservas**: Adicione, edite e remova reservas com geração de vouchers
- ✅ **Tábua de Marés**: Previsão com status (BOM/EXCELENTE) e links para consulta
- ✅ **Links Úteis**: Operadores confiáveis, restaurantes saudáveis, ferramentas de planejamento
- ✅ **Compartilhamento**: Notas colaborativas, links compartilháveis, integração WhatsApp

### Recursos Avançados
- 📱 **PWA (Progressive Web App)**: Instale como app nativo (iOS/Android/Desktop)
- 💾 **Offline First**: Funciona totalmente offline com sincronização
- 🔐 **Dados Locais**: Tudo salvo no localStorage (sem servidor)
- ⌨️ **Atalhos de Teclado**: Ctrl+S (salvar), Ctrl+E (exportar)
- 📊 **Export/Import**: Exporte dados em JSON, importe em outro dispositivo
- 🎨 **Responsivo**: Otimizado para mobile, tablet e desktop
- 🌙 **Dark Mode**: Interface elegante com suporte a preferências do sistema

## 🚀 Deploy no Firebase Hosting

### Pré-requisitos
```bash
# Node.js e npm instalados
node --version  # v16+
npm --version   # v8+

# Firebase CLI instalado globalmente
npm install -g firebase-tools
```

### Passo 1: Clonar ou Preparar o Projeto
```bash
# Se clonando do Git
git clone seu-repo
cd seu-projeto

# Ou preparar estrutura manualmente
# Certifique-se que tem a estrutura:
# public/
# ├── index.html
# ├── css/
# │   ├── styles.css
# │   └── responsive.css
# ├── js/
# │   ├── data.js
# │   ├── storage.js
# │   ├── ui.js
# │   ├── reservations.js
# │   ├── sharing.js
# │   └── main.js
# ├── manifest.json
# └── service-worker.js (opcional para PWA)
```

### Passo 2: Configurar Firebase
```bash
# Login no Firebase
firebase login

# Inicializar Firebase no projeto
firebase init

# Selecione:
# - Hosting (pressione espaço para selecionar)
# - Use projeto existente ou crie novo
# - Public directory: public
# - Configure single-page app: Yes (reescrever em index.html)
# - Arquivo .firebaserc será criado automaticamente
```

### Passo 3: Configurar .firebaserc
```bash
# Edite .firebaserc
nano .firebaserc
# ou use seu editor favorito
```

Adicione seu projeto Firebase:
```json
{
  "projects": {
    "default": "seu-projeto-firebase-id"
  }
}
```

### Passo 4: Deploy
```bash
# Build (se houver build script)
npm run build  # Se aplicável

# Deploy para Firebase Hosting
firebase deploy

# Ou especificar apenas hosting:
firebase deploy --only hosting
```

### Passo 5: Acessar a App
```
https://seu-projeto-firebase.firebaseapp.com
```

## 📋 Estrutura de Arquivos

```
project-root/
├── public/
│   ├── index.html              # Arquivo principal HTML
│   ├── css/
│   │   ├── styles.css          # Estilos principais
│   │   └── responsive.css      # Media queries e responsividade
│   ├── js/
│   │   ├── data.js             # Dados da viagem (TRIP_DATA)
│   │   ├── storage.js          # LocalStorage e utilities
│   │   ├── ui.js               # Funções de renderização UI
│   │   ├── reservations.js     # Gerenciador de reservas
│   │   ├── sharing.js          # Compartilhamento e colaboração
│   │   └── main.js             # Inicialização e entry point
│   ├── manifest.json           # PWA manifest
│   └── service-worker.js       # Service Worker (PWA)
├── firebase.json               # Configuração Firebase Hosting
├── .firebaserc                 # Projeto Firebase
├── .gitignore                  # Git ignore rules
└── README.md                   # Este arquivo
```

## 🔧 Desenvolvimento Local

### Servir Localmente
```bash
# Com Firebase CLI
firebase serve

# Ou com servidor Python
python -m http.server 8000 --directory public

# Ou com http-server (npm)
npm install -g http-server
http-server public
```

Acesse: `http://localhost:8000` (ou porta configurada)

### Modificar Dados da Viagem
Edit `public/js/data.js` para customizar:
- Dias e atividades
- Orçamento
- Operadores e links
- Marés

### Adicionar Novos Recursos
1. Crie novo arquivo em `public/js/`
2. Carregue em `public/index.html`
3. Use namespaces globais (ex: `window.novoManager`)

## 💾 Dados e Storage

### LocalStorage Keys
- `trip_reservations`: Array de reservas [JSON]
- `trip_notes`: Notas colaborativas [String]
- `trip_settings`: Configurações do usuário [JSON]

### Console API (Developer Tools)
```javascript
// Acessar dados
TripApp.getData()                    // Dados da viagem
TripApp.getReservations()            // Reservas salvas
TripApp.getNotes()                   // Notas

// Ações
TripApp.exportData()                 // Exportar como JSON
TripApp.importData(jsonString)       // Importar de JSON
TripApp.getTravelSummary()           // Resumo da viagem
TripApp.clearAll()                   // Limpar TODOS os dados
```

## 🎨 Customização

### Cores (CSS Variables)
Edite em `public/css/styles.css`:
```css
:root {
    --color-primary: #38bdf8;
    --color-accent: #10b981;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
    /* ... mais variáveis */
}
```

### Dados da Viagem
Edite em `public/js/data.js`:
```javascript
const TRIP_DATA = {
    days: [ /* modifique os dias */ ],
    budget: [ /* modifique orçamento */ ],
    // ... mais dados
}
```

## 📱 PWA (Progressive Web App)

### Instalar como App
1. Abra a URL no navegador
2. Clique no ícone "Instalar" (Chrome/Edge) ou menu (Safari)
3. Escolha "Instalar app"
4. Acesse como app nativo!

### Benefícios PWA
- ✅ Funciona offline
- ✅ Ícone na tela inicial
- ✅ Sem barra de endereço
- ✅ Sincronização automática

## 🔒 Segurança

- Nenhum dado é enviado para servidor
- Tudo é armazenado localmente (localStorage)
- Sem login necessário
- Dados exportáveis em JSON

## 🐛 Troubleshooting

### Problema: Dados desaparecem ao limpar cache
**Solução**: Use a feature de Export para fazer backup regular

### Problema: Service Worker não está funcionando
**Solução**: Certifique-se que:
- App está em HTTPS (ou localhost)
- `manifest.json` está sendo servido
- Service Worker URL está correta

### Problema: PWA não instala no Safari
**Solução**: Safari requer:
- HTTPS ativo
- Arquivo `manifest.json`
- Meta tags de apple (adicionadas no HTML)

## 📞 Suporte & Feedback

Para reportar bugs ou sugerir melhorias:
1. Abra uma Issue no GitHub
2. Descreva o problema
3. Inclua screenshots se possível

## 📄 Licença

MIT License - Sinta-se livre para usar, modificar e compartilhar!

## 🙏 Créditos

Desenvolvido com ❤️ para tornar a viagem ao Nordeste ainda melhor!

---

**Bom descanso, sol, natureza e companhia!** 🌴🏖️🌊