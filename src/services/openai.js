export const generateRecipeFromImage = async (base64Image, apiKey) => {
    if (!apiKey) throw new Error("API Key faltante");

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
        { "item": "nombre ingrediente", "amount": "cantidad", "category": "Carnicería/Verdulería/Lácteos/Almacén" }
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
        return JSON.parse(content);

    } catch (error) {
        console.error("Error generating recipe:", error);
        throw error;
    }
};
