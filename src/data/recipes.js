// Recetas Keto adaptadas al mercado argentino
// isHiddenVegFriendly: true = receta apta para quien no come hojas crudas (vegetales cocidos/ocultos)

export const recipes = [
    // ============ CARNES ============
    {
        id: 1,
        name: "Bondiola al Horno con Costra de Hierbas",
        category: "carnes",
        image: "🥩",
        prepTime: 90,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 480,
            fat: 38,
            protein: 32,
            carbs: 2
        },
        ingredients: [
            { item: "Bondiola de cerdo", amount: "1 kg", category: "Carnicería" },
            { item: "Manteca", amount: "100 g", category: "Lácteos" },
            { item: "Romero fresco", amount: "3 ramitas", category: "Verdulería" },
            { item: "Tomillo fresco", amount: "3 ramitas", category: "Verdulería" },
            { item: "Ajo", amount: "6 dientes", category: "Verdulería" },
            { item: "Sal gruesa", amount: "2 cdas", category: "Almacén" },
            { item: "Pimienta negra", amount: "1 cda", category: "Almacén" },
            { item: "Aceite de oliva", amount: "4 cdas", category: "Almacén" }
        ],
        instructions: [
            "Precalentar el horno a 180°C.",
            "Mezclar las hierbas picadas con la manteca blanda, ajo picado, sal y pimienta.",
            "Hacer cortes en la bondiola y untarla completamente con la mezcla.",
            "Sellar en una sartén caliente por todos los lados.",
            "Hornear por 1 hora y 15 minutos, rociando con sus jugos cada 20 min.",
            "Dejar reposar 10 minutos antes de cortar."
        ]
    },
    {
        id: 2,
        name: "Matambre Tiernizado a la Pizza",
        category: "carnes",
        image: "🥓",
        prepTime: 45,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 520,
            fat: 42,
            protein: 35,
            carbs: 3
        },
        ingredients: [
            { item: "Matambre de cerdo", amount: "800 g", category: "Carnicería" },
            { item: "Salsa de tomate sin azúcar", amount: "150 g", category: "Almacén" },
            { item: "Queso mozzarella", amount: "200 g", category: "Lácteos" },
            { item: "Queso parmesano rallado", amount: "50 g", category: "Lácteos" },
            { item: "Orégano seco", amount: "2 cdas", category: "Almacén" },
            { item: "Aceitunas negras", amount: "100 g", category: "Almacén" },
            { item: "Aceite de oliva", amount: "3 cdas", category: "Almacén" }
        ],
        instructions: [
            "Golpear el matambre para tiernizarlo uniformemente.",
            "Salpimentar y sellar en sartén caliente con aceite.",
            "Pasar a fuente de horno, cubrir con salsa de tomate.",
            "Agregar mozzarella, parmesano y aceitunas.",
            "Espolvorear orégano generosamente.",
            "Hornear a 200°C por 25 minutos hasta que el queso gratine."
        ]
    },
    {
        id: 3,
        name: "Hamburguesas Caseras al Plato",
        category: "carnes",
        image: "🍔",
        prepTime: 25,
        servings: 2,
        isHiddenVegFriendly: true,
        macros: {
            calories: 580,
            fat: 48,
            protein: 36,
            carbs: 2
        },
        ingredients: [
            { item: "Carne picada especial", amount: "400 g", category: "Carnicería" },
            { item: "Panceta ahumada", amount: "100 g", category: "Carnicería" },
            { item: "Queso cheddar", amount: "80 g", category: "Lácteos" },
            { item: "Huevo", amount: "2 unidades", category: "Lácteos" },
            { item: "Mayonesa casera", amount: "4 cdas", category: "Almacén" },
            { item: "Mostaza Dijon", amount: "2 cdas", category: "Almacén" },
            { item: "Palta", amount: "1 unidad", category: "Verdulería" }
        ],
        instructions: [
            "Formar hamburguesas con la carne, salpimentar generosamente.",
            "Cocinar en sartén de hierro a fuego alto, 4 min por lado.",
            "En los últimos 2 min, agregar cheddar encima para que funda.",
            "En paralelo, dorar la panceta hasta crocante.",
            "Freír los huevos en la grasa de la panceta.",
            "Servir hamburguesas con huevo, panceta, palta y mayonesa."
        ]
    },
    {
        id: 4,
        name: "Pastel de Carne Keto (Sin Papa)",
        category: "carnes",
        image: "🥧",
        prepTime: 60,
        servings: 6,
        isHiddenVegFriendly: true,
        macros: {
            calories: 420,
            fat: 35,
            protein: 24,
            carbs: 4
        },
        ingredients: [
            { item: "Carne picada común", amount: "600 g", category: "Carnicería" },
            { item: "Coliflor", amount: "1 cabeza grande", category: "Verdulería" },
            { item: "Manteca", amount: "80 g", category: "Lácteos" },
            { item: "Crema de leche", amount: "100 ml", category: "Lácteos" },
            { item: "Queso parmesano", amount: "60 g", category: "Lácteos" },
            { item: "Cebolla", amount: "1 mediana", category: "Verdulería" },
            { item: "Caldo de carne", amount: "100 ml", category: "Almacén" },
            { item: "Comino", amount: "1 cdita", category: "Almacén" },
            { item: "Pimentón dulce", amount: "1 cdita", category: "Almacén" }
        ],
        instructions: [
            "Hervir la coliflor hasta que esté muy tierna. Escurrir bien.",
            "Procesar con manteca, crema y parmesano hasta obtener puré suave.",
            "Rehogar cebolla picada, agregar carne y especias. Cocinar 15 min.",
            "Añadir caldo y cocinar hasta que reduzca.",
            "En fuente de horno, poner la carne y cubrir con el puré de coliflor.",
            "Gratinar a 200°C por 20 minutos."
        ]
    },
    {
        id: 5,
        name: "Milanesas de Pollo con Cobertura de Queso",
        category: "carnes",
        image: "🍗",
        prepTime: 35,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 390,
            fat: 28,
            protein: 32,
            carbs: 3
        },
        ingredients: [
            { item: "Supremas de pollo", amount: "4 unidades", category: "Carnicería" },
            { item: "Queso rallado parmesano", amount: "100 g", category: "Lácteos" },
            { item: "Harina de almendras", amount: "80 g", category: "Almacén" },
            { item: "Huevo", amount: "2 unidades", category: "Lácteos" },
            { item: "Ajo en polvo", amount: "1 cdita", category: "Almacén" },
            { item: "Orégano seco", amount: "1 cda", category: "Almacén" },
            { item: "Manteca", amount: "60 g", category: "Lácteos" }
        ],
        instructions: [
            "Aplanar las supremas entre films.",
            "Mezclar harina de almendras con parmesano, ajo y orégano.",
            "Pasar pollo por huevo batido, luego por la mezcla seca.",
            "Derretir manteca en sartén amplia a fuego medio.",
            "Cocinar 5-6 minutos por lado hasta dorar.",
            "Servir inmediatamente."
        ]
    },

    // ============ VEGETALES (Para estrategia mujer) ============
    {
        id: 6,
        name: "Espinacas a la Crema con Parmesano",
        category: "vegetales",
        image: "🥬",
        prepTime: 20,
        servings: 4,
        isHiddenVegFriendly: true, // ¡Clave! Espinaca cocida con grasa
        macros: {
            calories: 280,
            fat: 26,
            protein: 8,
            carbs: 4
        },
        ingredients: [
            { item: "Espinaca fresca", amount: "500 g", category: "Verdulería" },
            { item: "Crema de leche", amount: "200 ml", category: "Lácteos" },
            { item: "Queso parmesano rallado", amount: "60 g", category: "Lácteos" },
            { item: "Manteca", amount: "40 g", category: "Lácteos" },
            { item: "Ajo", amount: "3 dientes", category: "Verdulería" },
            { item: "Nuez moscada", amount: "1/4 cdita", category: "Almacén" },
            { item: "Sal y pimienta", amount: "a gusto", category: "Almacén" }
        ],
        instructions: [
            "Lavar bien la espinaca y blanquearla 2 minutos en agua hirviendo.",
            "Escurrir y exprimir para quitar el exceso de agua.",
            "Picar groseramente.",
            "Derretir manteca, dorar el ajo picado.",
            "Agregar espinaca y saltar 2 minutos.",
            "Verter la crema, añadir nuez moscada, sal y pimienta.",
            "Cocinar 5 minutos a fuego bajo, agregar parmesano y mezclar."
        ]
    },
    {
        id: 7,
        name: "Puré de Coliflor con Mucha Manteca",
        category: "vegetales",
        image: "🥦",
        prepTime: 25,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 220,
            fat: 20,
            protein: 4,
            carbs: 5
        },
        ingredients: [
            { item: "Coliflor", amount: "1 cabeza grande", category: "Verdulería" },
            { item: "Manteca", amount: "100 g", category: "Lácteos" },
            { item: "Crema de leche", amount: "80 ml", category: "Lácteos" },
            { item: "Queso crema", amount: "60 g", category: "Lácteos" },
            { item: "Cebollín picado", amount: "2 cdas", category: "Verdulería" },
            { item: "Sal y pimienta", amount: "a gusto", category: "Almacén" }
        ],
        instructions: [
            "Cortar la coliflor en floretes.",
            "Hervir en agua con sal hasta que esté muy tierna (15 min).",
            "Escurrir MUY BIEN (esto es clave para la textura).",
            "Procesar con manteca, crema y queso crema hasta obtener puré suave.",
            "Ajustar sal y pimienta. Servir con cebollín por encima.",
            "Opcional: gratinar con más queso."
        ]
    },
    {
        id: 8,
        name: "Torrejas de Acelga y Queso Fritas",
        category: "vegetales",
        image: "🧀",
        prepTime: 30,
        servings: 4,
        isHiddenVegFriendly: true, // Acelga oculta en queso y frita
        macros: {
            calories: 320,
            fat: 28,
            protein: 12,
            carbs: 4
        },
        ingredients: [
            { item: "Acelga", amount: "1 atado grande", category: "Verdulería" },
            { item: "Huevo", amount: "3 unidades", category: "Lácteos" },
            { item: "Queso sardo rallado", amount: "80 g", category: "Lácteos" },
            { item: "Queso pategrás rallado", amount: "60 g", category: "Lácteos" },
            { item: "Harina de almendras", amount: "40 g", category: "Almacén" },
            { item: "Aceite de oliva o grasa de cerdo", amount: "para freír", category: "Almacén" }
        ],
        instructions: [
            "Hervir la acelga (hojas y tallos) hasta tierna. Escurrir y picar fino.",
            "Mezclar con huevos batidos, los dos quesos y harina de almendras.",
            "Salpimentar bien.",
            "Calentar abundante aceite en sartén.",
            "Formar torrejas con cuchara y freír de ambos lados hasta dorar.",
            "Escurrir sobre papel absorbente. Servir calientes."
        ]
    },
    {
        id: 9,
        name: "Brócoli Gratinado con Cheddar y Panceta",
        category: "vegetales",
        image: "🥦",
        prepTime: 30,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 340,
            fat: 30,
            protein: 14,
            carbs: 5
        },
        ingredients: [
            { item: "Brócoli", amount: "600 g", category: "Verdulería" },
            { item: "Panceta ahumada", amount: "150 g", category: "Carnicería" },
            { item: "Queso cheddar", amount: "150 g", category: "Lácteos" },
            { item: "Crema de leche", amount: "150 ml", category: "Lácteos" },
            { item: "Manteca", amount: "30 g", category: "Lácteos" },
            { item: "Ajo", amount: "2 dientes", category: "Verdulería" }
        ],
        instructions: [
            "Cocinar brócoli al vapor hasta que esté tierno pero firme.",
            "Dorar la panceta en cubos hasta crocante.",
            "En la misma sartén, dorar el ajo en la grasa.",
            "Agregar crema y la mitad del cheddar. Mezclar hasta fundir.",
            "Poner brócoli en fuente, bañar con la salsa y panceta.",
            "Cubrir con resto de cheddar y gratinar 10 min a 200°C."
        ]
    },

    // ============ ENSALADAS (Solo Usuario A) ============
    {
        id: 10,
        name: "Ensalada César Keto con Pollo",
        category: "ensaladas",
        image: "🥗",
        prepTime: 20,
        servings: 2,
        isHiddenVegFriendly: false, // Hojas crudas - NO apta para Usuario B
        macros: {
            calories: 450,
            fat: 38,
            protein: 28,
            carbs: 4
        },
        ingredients: [
            { item: "Lechuga romana", amount: "1 planta grande", category: "Verdulería" },
            { item: "Pechuga de pollo", amount: "300 g", category: "Carnicería" },
            { item: "Queso parmesano en lascas", amount: "60 g", category: "Lácteos" },
            { item: "Panceta", amount: "100 g", category: "Carnicería" },
            { item: "Mayonesa casera", amount: "4 cdas", category: "Almacén" },
            { item: "Mostaza Dijon", amount: "1 cda", category: "Almacén" },
            { item: "Limón", amount: "1 unidad", category: "Verdulería" },
            { item: "Ajo", amount: "1 diente", category: "Verdulería" },
            { item: "Aceite de oliva", amount: "4 cdas", category: "Almacén" }
        ],
        instructions: [
            "Grillar el pollo salpimentado y cortar en tiras.",
            "Dorar panceta hasta crocante, cortar en trozos.",
            "Para el aderezo: mezclar mayo, mostaza, ajo picado, jugo de limón y aceite.",
            "Cortar lechuga en trozos, mezclar con aderezo.",
            "Agregar pollo, panceta y lascas de parmesano.",
            "Servir inmediatamente."
        ],
        substituteFor: 9 // Sugerir Brócoli Gratinado como alternativa
    },
    {
        id: 11,
        name: "Ensalada de Rúcula, Jamón Crudo y Burrata",
        category: "ensaladas",
        image: "🥗",
        prepTime: 10,
        servings: 2,
        isHiddenVegFriendly: false,
        macros: {
            calories: 480,
            fat: 42,
            protein: 22,
            carbs: 3
        },
        ingredients: [
            { item: "Rúcula fresca", amount: "150 g", category: "Verdulería" },
            { item: "Jamón crudo", amount: "100 g", category: "Carnicería" },
            { item: "Burrata o mozzarella fresca", amount: "150 g", category: "Lácteos" },
            { item: "Aceite de oliva extra virgen", amount: "4 cdas", category: "Almacén" },
            { item: "Aceto balsámico", amount: "1 cda", category: "Almacén" },
            { item: "Nueces", amount: "30 g", category: "Almacén" }
        ],
        instructions: [
            "Disponer rúcula en plato.",
            "Colocar burrata en el centro.",
            "Rodear con fetas de jamón crudo.",
            "Espolvorear nueces picadas.",
            "Rociar con aceite de oliva y unas gotas de aceto.",
            "Servir inmediatamente."
        ],
        substituteFor: 6 // Sugerir Espinacas a la Crema como alternativa
    },

    // ============ HUEVOS ============
    {
        id: 12,
        name: "Omelette de Tres Quesos",
        category: "huevos",
        image: "🍳",
        prepTime: 15,
        servings: 1,
        isHiddenVegFriendly: true,
        macros: {
            calories: 520,
            fat: 44,
            protein: 28,
            carbs: 2
        },
        ingredients: [
            { item: "Huevo", amount: "3 unidades", category: "Lácteos" },
            { item: "Queso crema", amount: "30 g", category: "Lácteos" },
            { item: "Queso gruyere rallado", amount: "40 g", category: "Lácteos" },
            { item: "Queso de cabra", amount: "30 g", category: "Lácteos" },
            { item: "Manteca", amount: "25 g", category: "Lácteos" },
            { item: "Cebollín", amount: "1 cda", category: "Verdulería" }
        ],
        instructions: [
            "Batir los huevos con queso crema hasta integrar.",
            "Derretir manteca en sartén antiadherente a fuego medio-bajo.",
            "Verter la mezcla y dejar cuajar suavemente.",
            "Cuando la base esté firme pero arriba aún húmedo, agregar los quesos.",
            "Plegar, dejar 1 minuto más y servir.",
            "Decorar con cebollín picado."
        ]
    },
    {
        id: 13,
        name: "Huevos Revueltos Cremosos con Salmón",
        category: "huevos",
        image: "🥚",
        prepTime: 12,
        servings: 2,
        isHiddenVegFriendly: true,
        macros: {
            calories: 480,
            fat: 40,
            protein: 26,
            carbs: 1
        },
        ingredients: [
            { item: "Huevo", amount: "4 unidades", category: "Lácteos" },
            { item: "Salmón ahumado", amount: "80 g", category: "Carnicería" },
            { item: "Crema de leche", amount: "60 ml", category: "Lácteos" },
            { item: "Manteca", amount: "40 g", category: "Lácteos" },
            { item: "Cebollín", amount: "2 cdas", category: "Verdulería" },
            { item: "Eneldo fresco", amount: "1 cda", category: "Verdulería" }
        ],
        instructions: [
            "Batir huevos con crema, sal y pimienta.",
            "Derretir manteca a fuego MUY bajo.",
            "Verter huevos y revolver constantemente con espátula.",
            "Cuando empiecen a cuajar pero aún cremosos, retirar del fuego.",
            "Agregar salmón en tiras y cebollín.",
            "Servir con eneldo por encima."
        ]
    },

    // ============ PAN KETO ============
    {
        id: 14,
        name: "Pan de Lino y Almendras",
        category: "panadería",
        image: "🍞",
        prepTime: 50,
        servings: 10,
        isHiddenVegFriendly: true,
        macros: {
            calories: 180,
            fat: 15,
            protein: 7,
            carbs: 3
        },
        ingredients: [
            { item: "Harina de almendras", amount: "200 g", category: "Almacén" },
            { item: "Harina de lino (linaza molida)", amount: "100 g", category: "Almacén" },
            { item: "Huevo", amount: "4 unidades", category: "Lácteos" },
            { item: "Queso crema", amount: "100 g", category: "Lácteos" },
            { item: "Polvo de hornear", amount: "2 cditas", category: "Almacén" },
            { item: "Sal", amount: "1 cdita", category: "Almacén" },
            { item: "Manteca derretida", amount: "60 g", category: "Lácteos" }
        ],
        instructions: [
            "Precalentar horno a 180°C. Enmantecar un molde de budín.",
            "Mezclar harinas, polvo de hornear y sal.",
            "Batir huevos con queso crema ablandado hasta homogéneo.",
            "Incorporar manteca derretida a la mezcla de huevo.",
            "Unir los secos con los húmedos. Mezclar bien.",
            "Verter en molde y hornear 40-45 minutos.",
            "Dejar enfriar completamente antes de cortar."
        ]
    },

    // ============ ACOMPAÑAMIENTOS ============
    {
        id: 15,
        name: "Zucchinis Rellenos de Carne y Queso",
        category: "acompañamientos",
        image: "🥒",
        prepTime: 45,
        servings: 4,
        isHiddenVegFriendly: true,
        macros: {
            calories: 380,
            fat: 30,
            protein: 22,
            carbs: 5
        },
        ingredients: [
            { item: "Zucchini grande", amount: "4 unidades", category: "Verdulería" },
            { item: "Carne picada", amount: "400 g", category: "Carnicería" },
            { item: "Queso mozzarella", amount: "150 g", category: "Lácteos" },
            { item: "Salsa de tomate sin azúcar", amount: "100 g", category: "Almacén" },
            { item: "Cebolla", amount: "1 pequeña", category: "Verdulería" },
            { item: "Ajo", amount: "2 dientes", category: "Verdulería" },
            { item: "Orégano", amount: "1 cdita", category: "Almacén" },
            { item: "Aceite de oliva", amount: "3 cdas", category: "Almacén" }
        ],
        instructions: [
            "Cortar zucchinis a la mitad y ahuecar con cuchara.",
            "Picar la pulpa extraída.",
            "Rehogar cebolla y ajo, agregar carne. Cocinar 10 min.",
            "Añadir pulpa de zucchini, salsa de tomate y orégano.",
            "Rellenar los zucchinis con la mezcla.",
            "Cubrir con mozzarella y hornear a 200°C por 25 min."
        ]
    }
];

// Síntomas del Keto Flu y recomendaciones
export const ketoFluSymptoms = [
    {
        id: 'headache',
        name: 'Dolor de cabeza',
        icon: '🤕',
        recommendation: '¡Toma agua con sal ahora mismo! Media cucharadita de sal en un vaso de agua.',
        supplement: 'Sodio',
        urgency: 'high'
    },
    {
        id: 'fatigue',
        name: 'Fatiga / Cansancio',
        icon: '😴',
        recommendation: 'Puede ser falta de electrolitos. Toma caldo de huesos o agua con sal. Descansa un poco.',
        supplement: 'Sodio + Descanso',
        urgency: 'medium'
    },
    {
        id: 'cramps',
        name: 'Calambres musculares',
        icon: '💪',
        recommendation: 'Necesitás más magnesio. Tomate un suplemento de citrato de magnesio (400mg).',
        supplement: 'Magnesio',
        urgency: 'high'
    },
    {
        id: 'dizziness',
        name: 'Mareos',
        icon: '😵',
        recommendation: 'Presión baja por falta de sodio. Agua con sal urgente + sentate un rato.',
        supplement: 'Sodio',
        urgency: 'high'
    },
    {
        id: 'irritability',
        name: 'Irritabilidad',
        icon: '😤',
        recommendation: 'Tu cerebro se está adaptando. Paciencia, comé más grasa y asegurate de dormir bien.',
        supplement: 'Grasas + Sueño',
        urgency: 'low'
    },
    {
        id: 'constipation',
        name: 'Estreñimiento',
        icon: '🚽',
        recommendation: 'Tomá más agua, agregá más verduras bajas en carbs y considerá agregar psyllium.',
        supplement: 'Agua + Fibra',
        urgency: 'medium'
    },
    {
        id: 'cravings',
        name: 'Antojos de azúcar',
        icon: '🍬',
        recommendation: 'Es normal los primeros días. Comé algo graso (queso, panceta) para saciarte.',
        supplement: 'Más grasa',
        urgency: 'low'
    },
    {
        id: 'brain_fog',
        name: 'Niebla mental',
        icon: '🧠',
        recommendation: 'Tu cerebro necesita adaptarse a las cetonas. Tomá café con manteca (bulletproof).',
        supplement: 'MCT Oil / Manteca',
        urgency: 'medium'
    }
];

// Días de la semana en español
export const weekDays = [
    { short: 'Lun', full: 'Lunes' },
    { short: 'Mar', full: 'Martes' },
    { short: 'Mié', full: 'Miércoles' },
    { short: 'Jue', full: 'Jueves' },
    { short: 'Vie', full: 'Viernes' },
    { short: 'Sáb', full: 'Sábado' },
    { short: 'Dom', full: 'Domingo' }
];

// Categorías para la lista de compras
export const shoppingCategories = [
    { id: 'Carnicería', icon: '🥩', color: 'red' },
    { id: 'Verdulería', icon: '🥬', color: 'green' },
    { id: 'Lácteos', icon: '🧀', color: 'yellow' },
    { id: 'Almacén', icon: '🏪', color: 'blue' }
];

// Perfiles de usuario
export const userProfiles = {
    A: {
        id: 'A',
        name: 'Usuario A',
        icon: '👨',
        description: 'Keto Estándar',
        hiddenVegRequired: false,
        dailyMacros: {
            calories: 2000,
            fat: 160,
            protein: 100,
            carbs: 20
        }
    },
    B: {
        id: 'B',
        name: 'Usuario B',
        icon: '👩',
        description: 'Keto sin hojas crudas',
        hiddenVegRequired: true,
        dailyMacros: {
            calories: 1600,
            fat: 130,
            protein: 80,
            carbs: 20
        }
    }
};

// Helper: obtener receta por ID
export const getRecipeById = (recipes, id) => recipes.find(r => r.id === id);

// Helper: obtener recetas aptas para Usuario B
export const getHiddenVegFriendlyRecipes = (recipes) => recipes.filter(r => r.isHiddenVegFriendly);

// Helper: obtener sustituto para una receta
export const getSubstituteRecipe = (recipes, recipe) => {
    if (recipe.substituteFor) {
        return getRecipeById(recipes, recipe.substituteFor);
    }
    // Si no tiene sustituto definido, buscar una similar de la misma categoría
    return recipes.find(r =>
        r.isHiddenVegFriendly &&
        r.category === recipe.category &&
        r.id !== recipe.id
    );
};

// Helper: filtrar recetas por categoría
export const getRecipesByCategory = (recipes, category) => recipes.filter(r => r.category === category);

// Generar menú automático para la semana
export const generateWeeklyMenu = (userProfile, recipes) => {
    // Usar las recetas pasadas como argumento
    // Determinar disponibles según perfil
    const availableRecipes = userProfile.hiddenVegRequired
        ? recipes.filter(r => r.isHiddenVegFriendly)
        : recipes;

    const menu = {};
    const usedRecipes = new Set();

    weekDays.forEach((day, index) => {
        // Seleccionar almuerzo
        let lunch = selectRandomRecipe(availableRecipes, usedRecipes, ['carnes', 'huevos']);
        if (lunch) usedRecipes.add(lunch.id);

        // Seleccionar cena
        let dinner = selectRandomRecipe(availableRecipes, usedRecipes, ['carnes', 'vegetales']);
        if (dinner) usedRecipes.add(dinner.id);

        menu[index] = {
            day: day,
            lunch: lunch || availableRecipes[0], // Fallback simple
            dinner: dinner || availableRecipes[1]
        };
    });

    return menu;
};

// Helper interno para seleccionar receta aleatoria
const selectRandomRecipe = (pool, usedIds, preferredCategories) => {
    let candidates = pool.filter(r =>
        !usedIds.has(r.id) &&
        preferredCategories.includes(r.category)
    );

    // Si no hay candidatos de las categorías preferidas, usar cualquiera
    if (candidates.length === 0) {
        candidates = pool.filter(r => !usedIds.has(r.id));
    }

    // Si aún no hay, resetear y usar cualquiera
    if (candidates.length === 0) {
        candidates = pool;
    }

    if (candidates.length === 0) return null;

    return candidates[Math.floor(Math.random() * candidates.length)];
};
