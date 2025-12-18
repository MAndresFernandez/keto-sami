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
    
    Formato JSON requerido:
    {
      "name": "Nombre del plato (Argentino si aplica)",
      "category": "una de las categorias",
      "image": "emoji que represente el plato",
      "prepTime": numero_minutos,
      "servings": numero_porciones,
      "isHiddenVegFriendly": boolean,
      "macros": {
        "calories": numero,
        "fat": numero_gramos,
        "protein": numero_gramos,
        "carbs": numero_gramos
      },
      "ingredients": [
        { "item": "nombre del ingrediente", "amount": "cantidad y unidad", "category": "Carnicería/Verdulería/Lácteos/Almacén" }
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

        // Normalizar ingredientes
        if (parsed.ingredients) {
            parsed.ingredients = parsed.ingredients.map(ing => ({
                item: ing.item || ing.name || ing.ingredient || ing.ingrediente || ing.nombre || '',
                amount: ing.amount || ing.quantity || ing.cantidad || ing.cant || '',
                category: ing.category || ing.categoria || 'Almacén'
            }));
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
    
    Reglas importantes y rol de experto:
    1. Actúa como nutricionista experto en Keto.
    2. Calcula/Estima los MACROS (Kcal, Grasa, Proteínas, Carbos) para UNA porción promedio de este plato.
    3. Si la descripción es vaga (ej: "pollo con crema"), asume una receta estándar keto-friendly.
    4. Determina 'isHiddenVegFriendly':
       - TRUE si NO tiene hojas crudas y los vegetales están cocidos.
       - FALSE si incluye ensalada cruda.
    
    Formato JSON Requerido (responde SOLO con esto):
    {
      "name": "Nombre atractivo del plato",
      "category": "carnes|vegetales|ensaladas|huevos|panadería|acompañamientos",
      "image": "emoji relacionado",
      "prepTime": minutos_estimados,
      "servings": 1, 
      "isHiddenVegFriendly": boolean,
      "macros": {
        "calories": numero,
        "fat": numero,
        "protein": numero,
        "carbs": numero
      },
      "ingredients": [
        { "item": "nombre del ingrediente", "amount": "cantidad", "category": "Carnicería/Verdulería/Lácteos/Almacén" }
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
                        content: "Eres un asistente experto en cocina Keto y nutrición."
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

        // Normalizar ingredientes
        if (parsed.ingredients) {
            parsed.ingredients = parsed.ingredients.map(ing => ({
                item: ing.item || ing.name || ing.ingredient || ing.ingrediente || ing.nombre || '',
                amount: ing.amount || ing.quantity || ing.cantidad || ing.cant || '',
                category: ing.category || ing.categoria || 'Almacén'
            }));
        }

        return parsed;

    } catch (error) {
        console.error("Error generating recipe from text:", error);
        throw error;
    }
};
