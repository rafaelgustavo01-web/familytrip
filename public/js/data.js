/* ============================================
   DATA.JS
   Trip Data Structure & Constants
   ============================================ */

const TRIP_DATA = {
    days: [
        {
            day: 1,
            date: "13/02",
            title: "Chegada a Pium",
            activities: [
                "Saída de Cabedelo/João Pessoa pela BR-101 (~150 km, 2h20)",
                "Check-in no resort",
                "Passeio a pé pela região de Pium",
                "Compras de frutas, água, snacks no mercado local"
            ],
            meals: ["Lanche de estrada", "Jantar simples no resort"],
            notes: "Viagem tranquila, chegar com luz do dia"
        },
        {
            day: 2,
            date: "14/02",
            title: "Praias Locais: Pium e Cotovelo",
            activities: [
                "Caminhada e corrida leve na praia cedo (antes das 9h)",
                "Banho de mar e exercícios na areia",
                "Descanso no resort à tarde",
                "Retorno à praia para pôr de sol"
            ],
            meals: ["Café no resort", "Almoço leve em barraca (peixe grelhado)", "Jantar em casa"],
            notes: "Foco em exercício e sol. Evite calor extremo do meio-dia"
        },
        {
            day: 3,
            date: "15/02",
            title: "Cajueiro de Pirangi + Praia de Pirangi",
            activities: [
                "Saída cedo para o Cajueiro de Pirangi (maior do mundo)",
                "Banho de mar em Pirangi do Norte/Sul",
                "Compras de lembrancinhas simples",
                "Retorno ao resort para descanso"
            ],
            meals: ["Café no resort", "Almoço junto ao Cajueiro", "Jantar em casa"],
            notes: "Ir cedo para evitar ônibus de excursão. Ingresso barato (~R$ 10-20)"
        },
        {
            day: 4,
            date: "16/02",
            title: "Parrachos de Pirangi 🎯 (MARÉ BOA)",
            activities: [
                "Saída cedo para Marina Badauê (embarque ~09h45)",
                "Passeio de catamarã/lancha aos Parrachos (~2h de atividade)",
                "Mergulho livre e snorkel (equipamento incluído)",
                "Retorno e descanso na piscina do resort"
            ],
            meals: ["Café rápido", "Lanche leve antes do passeio", "Almoço em ponto de apoio (pago à parte)", "Jantar no resort"],
            notes: "✅ MARÉ BAIXA ÀS 09h45 (~0,5m) - EXCELENTE! Confirme na véspera."
        },
        {
            day: 5,
            date: "17/02",
            title: "Ponta Negra (Praia + Gastronomia Saudável)",
            activities: [
                "Dirigir até Ponta Negra (~25 km, 30 min)",
                "Caminhada pela orla e Morro do Careca",
                "Banho de mar e fotos",
                "Almoço em restaurante saudável (Oásis Natural, Casa de Taipa ou Chapéu de Palha)",
                "Descanso à tarde, retorno antes do trânsito"
            ],
            meals: ["Café no resort", "Almoço em restaurante saudável", "Lanche na volta", "Jantar em casa"],
            notes: "Restaurantes com foco em vegetariano, vegano, low-carb e sucos naturais"
        },
        {
            day: 6,
            date: "18/02",
            title: "Maracajaú + Litoral Norte",
            activities: [
                "Saída cedo para ponto de encontro em Natal (Ponta Negra/Via Costeira)",
                "Passeio full day com receptivo: van até Maracajaú",
                "Embarque em catamarã ou lancha",
                "Snorkel nas piscinas naturais (~2-3h na água)",
                "Almoço em restaurante de apoio",
                "Retorno fim de tarde"
            ],
            meals: ["Café rápido", "Almoço no ponto de apoio (pago à parte)", "Lanche na volta", "Jantar leve no resort"],
            notes: "Contracte antecipadamente (~R$ 220/pessoa com transporte). Empresa ajusta marés."
        },
        {
            day: 7,
            date: "19/02",
            title: "Plantão de Trabalho + Resort",
            activities: [
                "🏥 PLANTÃO HOJE - Atividades reduzidas",
                "Caminhada rápida matinal no resort",
                "Trabalho em local próximo ao resort (boa internet)",
                "Piscina e leitura entre atendimentos",
                "Evitar deslocamentos longos"
            ],
            meals: ["Café no resort", "Almoço leve no resort", "Café da tarde", "Jantar simples"],
            notes: "Dia de descanso relativo. Permaneça próximo à base."
        },
        {
            day: 8,
            date: "20/02",
            title: "Plantão de Trabalho + Tabatinga (opcional)",
            activities: [
                "🏥 PLANTÃO HOJE - Atividades reduzidas",
                "Exercícios curtos no próprio resort (academia, caminhada)",
                "Se plantão permitir: Deslocamento curto a Tabatinga (pôr do sol)",
                "Mirante dos Golfinhos (curtinho)"
            ],
            meals: ["Café no resort", "Almoço no resort", "Lanche", "Jantar"],
            notes: "Dia flexível. Só saia se o plantão permitir. Volte cedo."
        },
        {
            day: 9,
            date: "21/02",
            title: "Pipa + Praia do Amor",
            activities: [
                "Saída cedo evitando trânsito (~70-80 km, 1h30)",
                "Caminhada pela vila de Pipa",
                "Praia do Amor (mirante panorâmico)",
                "Alternativa: Praia do Madeiro (acesso por escadarias)",
                "Almoço local em restaurante simples",
                "Retorno no meio da tarde"
            ],
            meals: ["Café no hotel", "Almoço em Pipa (peixe grelhado/tapioca)", "Lanche na volta", "Jantar em casa"],
            notes: "Dia de paisagem. Pipa é famosa por beleza natural. Evite sábado/domingo por muvuca."
        },
        {
            day: 10,
            date: "22/02",
            title: "Centro de Natal (Cultura & City Tour)",
            activities: [
                "Manhã dedicada a cultura e história",
                "Centro histórico, Catedral, Forte dos Reis Magos",
                "Compras leves e lembrancinhas",
                "Almoço no centro ou volta a Ponta Negra",
                "Retorno antes de pôr do sol"
            ],
            meals: ["Café no resort", "Almoço no centro de Natal", "Lanche", "Jantar de despedida"],
            notes: "Dia urbano. Verifique horários de funcionamento das atrações com antecedência."
        },
        {
            day: 11,
            date: "23/02",
            title: "Manhã no Resort + Retorno a João Pessoa",
            activities: [
                "Manhã livre para piscina e despedida",
                "Almoço no resort ou leve",
                "Saída após o almoço (via BR-101 norte, ~180 km, 2h30)",
                "Chegada em Cabedelo/João Pessoa no fim da tarde"
            ],
            meals: ["Café no resort", "Almoço no resort", "Lanche de estrada"],
            notes: "Despedida tranquila. Não esqueça itens pessoais no quarto!"
        }
    ],

    budget: [
        { category: "Combustível", estimate: "R$ 380 - 450", details: "900 km ÷ 14 km/l × R$ 6/l" },
        { category: "Pedágio", estimate: "R$ 0", details: "BR-101 sem pedágio neste trecho" },
        { category: "Estacionamento", estimate: "R$ 120 - 150", details: "5-6 dias de estacionamento em média" },
        { category: "Alimentação (fam. 3-4)", estimate: "R$ 2.700 - 3.800", details: "Supermercado, almoços, jantares" },
        { category: "Passeios/Turismo", estimate: "R$ 1.350 - 1.800", details: "Parrachos, Maracajaú, entradas" }
    ],

    economyTips: [
        "Compre passagens de passeios com antecedência (desconto 15-20%)",
        "Alterne restaurantes com supermercado (self-service e lanches em casa)",
        "Estacione em zona azul em vez de estacionamentos pagos",
        "Caminhe em praias não turísticas (Cotovelo, Tabatinga)",
        "Maneire na gasolina: evite esperas em trânsito intenso"
    ],

    tides: [
        { date: "13/02", time: "Chegada", lowTide: "Maré variável", status: "Monitorar" },
        { date: "16/02", time: "~09h45", lowTide: "0,5m", status: "IDEAL" },
        { date: "18/02", time: "~11h30", lowTide: "0,6m", status: "BOM" },
        { date: "20/02", time: "~12h10", lowTide: "0,34m", status: "EXCELENTE" },
        { date: "21/02", time: "~12h50", lowTide: "0,40m", status: "BOM" }
    ],

    tidesImportant: [
        "🎯 Parrachos de Pirangi (16/02): Maré baixa às 09h45 (~0,5m) - EXCELENTE",
        "🎯 Maracajaú (18/02): Marés intermediárias - BOM (empresa ajusta horário)",
        "📱 Confirme na véspera: Sempre consulte o site de marés no dia anterior",
        "⏰ Chegue cedo: Sempre 30-40 min antes do passeio para check-in"
    ],

    operadores: {
        parrachos: [
            {
                name: "Marina Badauê - Parrachos de Pirangi",
                url: "https://marinabadaue.com.br/passeio/barco-mergulho-nos-parrachos-de-pirangi",
                price: "A partir de R$ 70",
                details: "Mergulho + Snorkel"
            },
            {
                name: "Whel Tour - Parrachos de Pirangi",
                url: "https://www.wheltour.com.br/passeio/parrachos-de-pirangi-catamara-incluso",
                price: "Catamarã incluso",
                details: "Com transfer opcional"
            },
            {
                name: "Civitatis - Parrachos Pirangi",
                url: "https://www.civitatis.com/br/natal/excursao-parrachos-pirangi/",
                price: "Preço competitivo",
                details: "Passeio em grupo"
            }
        ],
        maracajau: [
            {
                name: "Maracajaú - TripAdvisor",
                url: "https://www.tripadvisor.com.br/AttractionProductReview-g303518-d15777716-Passeio_a_Maracajau_com_lancha_Full_Day-Natal_State_of_Rio_Grande_do_Norte.html",
                price: "De R$ 110 - 250",
                details: "Lancha + Snorkel"
            },
            {
                name: "Civitatis - Natal",
                url: "https://www.civitatis.com/br/natal/",
                price: "Múltiplos passeios",
                details: "Fácil cancelamento"
            }
        ],
        restaurantes: [
            {
                name: "Oásis Natural",
                description: "Vegano | Ambiente arborizado | Sucos naturais"
            },
            {
                name: "Casa de Taipa",
                description: "Tapiocas naturais | Opções vegetarianas"
            },
            {
                name: "Chapéu de Palha",
                description: "Low-carb | Saladas frescas | Sucos"
            }
        ],
        tools: [
            {
                name: "QUALP - Rotas",
                url: "https://www.qualp.com.br",
                description: "Cálculo de pedágios, combustível, distância"
            },
            {
                name: "Rotas Brasil",
                url: "https://rotasbrasil.com.br",
                description: "Planejador de rotas e custos"
            },
            {
                name: "Como chegar em Pipa",
                url: "https://pipa.com.br/como-chegar/",
                description: "Guia completo de acesso"
            }
        ],
        tides: [
            {
                name: "Apollo 11 - Marés Natal",
                url: "https://www.apolo11.com/mare.php?local=24",
                description: "Tábua detalhada com horários precisos"
            },
            {
                name: "Tábua de Marés Brasil",
                url: "https://tabuademares.com/br/rio-grande-do-norte/natal",
                description: "Consulta por data e localidade"
            },
            {
                name: "Marinha do Brasil - Oficial",
                url: "https://www.marinha.mil.br/chm/tabuas-de-mare-6",
                description: "Dados governamentais confiáveis"
            },
            {
                name: "Surf Guru - Marés",
                url: "https://surfguru.com.br/previsao/mare/30461",
                description: "Previsão com visualização gráfica"
            }
        ]
    },

    headerInfo: [
        { label: "Período", value: "13-23 de fevereiro 2026" },
        { label: "Duração", value: "10 dias" },
        { label: "Local Base", value: "Pium, RN" },
        { label: "Distância Total", value: "~900 km" }
    ],

    shareChecklist: [
        "Enviar link para todos os participantes",
        "Confirmar datas de trabalho (19-20/02)",
        "Coordenar saída de Cabedelo (13/02 às 7h)",
        "Reservar Parrachos de Pirangi (16/02 - 09h45)",
        "Reservar Maracajaú (18/02)",
        "Confirmar alimentação saudável / refeições em casa"
    ]
};