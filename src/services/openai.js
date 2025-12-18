// Helper function to normalize ingredients
const normalizeIngredient = (ing) => {
    const itemKeys = ['item', 'name', 'ingredient', 'ingrediente', 'nombre', 'producto', 'descripcion'];
    const amountKeys = ['amount', 'quantity', 'cantidad', 'cant', 'qty'];

    let itemValue = '';
    let amountValue = '';

    // Buscar item en keys conocidas
    for (const key of itemKeys) {
        if (ing[key] && typeof ing[key] === 'string') {
            itemValue = ing[key];
            break;
        }
    }

    // Buscar amount en keys conocidas
    for (const key of amountKeys) {
        if (ing[key] && typeof ing[key] === 'string') {
            amountValue = ing[key];
            break;
        }
    }

    // Si no encontró item, buscar cualquier string que no parezca cantidad
    if (!itemValue) {
        for (const [key, value] of Object.entries(ing)) {
            if (typeof value === 'string' && !amountKeys.includes(key) && !/^\d/.test(value)) {
                itemValue = value;
                break;
            }
        }
    }

    // Si no encontró amount, buscar cualquier string que empiece con número
    if (!amountValue) {
        for (const [key, value] of Object.entries(ing)) {
            if (typeof value === 'string' && /^\d/.test(value)) {
                amountValue = value;
                break;
            }
        }
    }

    return {
        item: itemValue,
        amount: amountValue,
        category: ing.category || ing.categoria || 'Almacén'
    };
};

export const generateRecipeFromImage = async (base64Image) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) throw new Error("Falta configuración de API Key en el servidor (.env.local)");

    const prompt = `
    Analiza esta imagen de comida y genera una receta Keto estructurada en JSON.
    
    Reglas importantes:
    1. La receta debe ser Keto (alta en grasa, muy baja en carbos).
    2. Si hay ingredientes no-keto evidentes, sugiere sustitutos keto en la lista.
    3. Determina 'isHiddenVegFriendly':
       - TRUE si NO tiene hojas crudas (lechuga, rúcula) y los vegetales están cocidos/procesados.
       - FALSE si es una ensalada cruda o tiene muchas hojas sin cocinar.
    4. Categoriza en: carnes, vegetales, ensaladas, huevos, panadería, acompañamientos.
    5. Estima los macros por porción.
    
    Formato JSON requerido (USA EXACTAMENTE ESTOS NOMBRES DE CAMPOS):
    {
      "name": "Nombre del plato",
      "category": "una de las categorias",
      "image": "emoji",
      "prepTime": numero,
      "servings": numero,
      "isHiddenVegFriendly": true o false,
      "macros": {
        "calories": numero,
        "fat": numero,
        "protein": numero,
        "carbs": numero
      },
      "ingredients": [
        { "item": "nombre del ingrediente", "amount": "cantidad con unidad" }
      ],
      "instructions": [
        "paso 1", "paso 2"
      ]
    }
  `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: {
                                    url: base64Image
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 1000,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);

        console.log('AI Response (Image):', JSON.stringify(parsed, null, 2));

        // Normalizar ingredientes
        if (parsed.ingredients && Array.isArray(parsed.ingredients)) {
            parsed.ingredients = parsed.ingredients.map(normalizeIngredient);
        }

        return parsed;

    } catch (error) {
        console.error("Error generating recipe:", error);
        throw error;
    }
};

export const generateRecipeFromText = async (description) => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) throw new Error("Falta configuración de API Key en el servidor (.env.local)");

    const prompt = `
    Genera una receta Keto completa basada en esta descripción: "${description}".
    
    Reglas importantes:
    1. Actúa como nutricionista experto en Keto.
    2. Calcula/Estima los MACROS para UNA porción.
    3. Si la descripción es vaga, asume una receta estándar keto-friendly.
    
    Formato JSON Requerido (USA EXACTAMENTE ESTOS NOMBRES DE CAMPOS):
    {
      "name": "Nombre del plato",
      "category": "carnes|vegetales|ensaladas|huevos|panadería|acompañamientos",
      "image": "emoji",
      "prepTime": numero,
      "servings": 1, 
      "isHiddenVegFriendly": true o false,
      "macros": {
        "calories": numero,
        "fat": numero,
        "protein": numero,
        "carbs": numero
      },
      "ingredients": [
        { "item": "nombre del ingrediente", "amount": "cantidad" }
      ],
      "instructions": [
        "Paso 1", "Paso 2"
      ]
    }
  `;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: "Eres un asistente experto en cocina Keto. Responde SOLO con JSON válido usando exactamente los campos especificados."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);

        console.log('AI Response (Text):', JSON.stringify(parsed, null, 2));

        // Normalizar ingredientes
        if (parsed.ingredients && Array.isArray(parsed.ingredients)) {
            parsed.ingredients = parsed.ingredients.map(normalizeIngredient);
        }

        return parsed;

    } catch (error) {
        console.error("Error generating recipe from text:", error);
        throw error;
    }
};
