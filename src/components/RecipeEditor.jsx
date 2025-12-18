import { useState, useRef } from 'react';
import {
    Save,
    X,
    Camera,
    Loader2,
    Plus,
    Trash2,
    Image as ImageIcon
} from 'lucide-react';
import { generateRecipeFromImage } from '../services/openai';

function RecipeEditor({
    initialRecipe = null,
    onSave,
    onCancel
}) {
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const [recipe, setRecipe] = useState(initialRecipe || {
        name: '',
        category: 'carnes',
        image: '🍳',
        prepTime: 30,
        servings: 2,
        isHiddenVegFriendly: false,
        macros: { calories: 0, fat: 0, protein: 0, carbs: 0 },
        ingredients: [],
        instructions: []
    });

    // Handle Image Upload & AI Generation
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file) return;

        setLoading(true);
        try {
            // Convert to Base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result;
                try {
                    const aiRecipe = await generateRecipeFromImage(base64String);
                    setRecipe(prev => ({
                        ...prev,
                        ...aiRecipe,
                        // Mantener id si existía
                        id: prev.id
                    }));
                } catch (err) {
                    alert("Error al generar receta: " + err.message);
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            setLoading(false);
            alert("Error processing image");
        }
    };

    const handleChange = (field, value, nestedField = null) => {
        if (nestedField) {
            setRecipe(prev => ({
                ...prev,
                [field]: { ...prev[field], [nestedField]: Number(value) }
            }));
        } else {
            setRecipe(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...recipe.ingredients];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredient = () => {
        setRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { item: '', amount: '', category: 'Almacén' }]
        }));
    };

    const removeIngredient = (index) => {
        setRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleInstructionChange = (index, value) => {
        const newInstructions = [...recipe.instructions];
        newInstructions[index] = value;
        setRecipe(prev => ({ ...prev, instructions: newInstructions }));
    };

    const addInstruction = () => {
        setRecipe(prev => ({
            ...prev,
            instructions: [...prev.instructions, '']
        }));
    };

    const removeInstruction = (index) => {
        setRecipe(prev => ({
            ...prev,
            instructions: prev.instructions.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="space-y-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                    {initialRecipe ? 'Editar Receta / Consumo' : 'Nueva Receta'}
                </h2>
                <button onClick={onCancel} className="btn btn-ghost p-2">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {loading && (
                <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-3" />
                    <p className="text-emerald-400 font-medium">La IA está analizando tu comida...</p>
                </div>
            )}

            {/* AI Magic Section */}
            {!initialRecipe && (
                <div className="space-y-4 mb-6">
                    {/* Text Magic */}
                    <div className="glass-card p-4 border border-emerald-500/30 bg-emerald-500/5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                <span className="text-xl">✨</span>
                            </div>
                            <div>
                                <p className="font-bold text-white">Autocompletar Mágico</p>
                                <p className="text-xs text-gray-400">Describe tu plato y calcularé todo por ti</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Ej: Omelette de jamón y queso con café"
                                className="input text-sm flex-1"
                                id="magic-text-input"
                            />
                            <button
                                onClick={async () => {
                                    const text = document.getElementById('magic-text-input').value;
                                    if (!text) return;

                                    setLoading(true);
                                    try {
                                        // Dynamic import to avoid circular dependencies if any
                                        const { generateRecipeFromText } = await import('../services/openai');
                                        const aiRecipe = await generateRecipeFromText(text);
                                        setRecipe(prev => ({
                                            ...prev,
                                            ...aiRecipe,
                                            id: prev.id
                                        }));
                                    } catch (err) {
                                        alert("Error: " + err.message);
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                                className="btn btn-primary whitespace-nowrap"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generar'}
                            </button>
                        </div>
                    </div>

                    {/* Image Magic Option (Collapsed/Smaller) */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 mb-2">- O sube una foto -</p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="btn btn-secondary btn-sm text-xs"
                            disabled={loading}
                        >
                            <Camera className="w-3 h-3 mr-2" />
                            Escanear Foto de Comida
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
            )}

            {/* Basic Info */}
            <div className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Nombre del plato</label>
                    <input
                        type="text"
                        value={recipe.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="input"
                        placeholder="Ej: Milanesa Napolitana Keto"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Categoría</label>
                        <select
                            value={recipe.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="input appearance-none"
                        >
                            <option value="carnes">Carnes</option>
                            <option value="vegetales">Vegetales</option>
                            <option value="ensaladas">Ensaladas</option>
                            <option value="huevos">Huevos</option>
                            <option value="acompañamientos">Acompañamientos</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Emoji / Icono</label>
                        <input
                            type="text"
                            value={recipe.image}
                            onChange={(e) => handleChange('image', e.target.value)}
                            className="input text-center"
                            maxLength={2}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                    <input
                        type="checkbox"
                        checked={recipe.isHiddenVegFriendly}
                        onChange={(e) => handleChange('isHiddenVegFriendly', e.target.checked)}
                        className="checkbox-custom"
                    />
                    <div>
                        <p className="text-sm font-medium">Apto Vegetales Ocultos</p>
                        <p className="text-xs text-gray-400">Marcar si NO tiene hojas crudas</p>
                    </div>
                </div>
            </div>

            {/* Macros */}
            <div>
                <h3 className="font-semibold text-emerald-400 mb-2 mt-4">Macros (por porción)</h3>
                <div className="grid grid-cols-4 gap-2">
                    <div>
                        <label className="text-xs text-center block mb-1">Kcal</label>
                        <input
                            type="number"
                            value={recipe.macros.calories}
                            onChange={(e) => handleChange('macros', e.target.value, 'calories')}
                            className="input px-2 text-center"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-center block mb-1">Grasa</label>
                        <input
                            type="number"
                            value={recipe.macros.fat}
                            onChange={(e) => handleChange('macros', e.target.value, 'fat')}
                            className="input px-2 text-center"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-center block mb-1">Prot.</label>
                        <input
                            type="number"
                            value={recipe.macros.protein}
                            onChange={(e) => handleChange('macros', e.target.value, 'protein')}
                            className="input px-2 text-center"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-center block mb-1">Carb.</label>
                        <input
                            type="number"
                            value={recipe.macros.carbs}
                            onChange={(e) => handleChange('macros', e.target.value, 'carbs')}
                            className="input px-2 text-center"
                        />
                    </div>
                </div>
            </div>

            {/* Ingredients */}
            <div>
                <div className="flex items-center justify-between mb-2 mt-4">
                    <h3 className="font-semibold text-emerald-400">Ingredientes</h3>
                    <button onClick={addIngredient} className="text-xs btn btn-secondary py-1 px-2">
                        <Plus className="w-3 h-3" /> Agregar
                    </button>
                </div>
                <div className="space-y-2">
                    {recipe.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                placeholder="Ingrediente"
                                value={ing.item}
                                onChange={(e) => handleIngredientChange(idx, 'item', e.target.value)}
                                className="input flex-1"
                            />
                            <input
                                placeholder="Cant."
                                value={ing.amount}
                                onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
                                className="input w-20"
                            />
                            <button onClick={() => removeIngredient(idx)} className="text-red-400 p-2">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instructions */}
            <div>
                <div className="flex items-center justify-between mb-2 mt-4">
                    <h3 className="font-semibold text-emerald-400">Instrucciones</h3>
                    <button onClick={addInstruction} className="text-xs btn btn-secondary py-1 px-2">
                        <Plus className="w-3 h-3" /> Agregar
                    </button>
                </div>
                <div className="space-y-2">
                    {recipe.instructions.map((inst, idx) => (
                        <div key={idx} className="flex gap-2">
                            <span className="mt-3 text-xs text-gray-500">{idx + 1}</span>
                            <textarea
                                value={inst}
                                onChange={(e) => handleInstructionChange(idx, e.target.value)}
                                className="input text-sm"
                                rows={2}
                            />
                            <button onClick={() => removeInstruction(idx)} className="text-red-400 p-2 self-start mt-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-slate-700 mt-6 flex gap-3">
                <button onClick={onCancel} className="btn btn-secondary flex-1">
                    Cancelar
                </button>
                <button onClick={() => onSave(recipe)} className="btn btn-primary flex-1">
                    <Save className="w-4 h-4" />
                    Guardar Receta
                </button>
            </div>
        </div>
    );
}

export default RecipeEditor;
