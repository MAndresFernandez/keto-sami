import { useState } from 'react';
import {
    Wand2,
    Plus,
    X,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Check
} from 'lucide-react';
import {
    weekDays,
    generateWeeklyMenu,
    getHiddenVegFriendlyRecipes
} from '../data/recipes';
import RecipeCard from './RecipeCard';

function WeeklyPlanner({
    currentProfile,
    weeklyPlan,
    setWeeklyPlan,
    setShoppingItems,
    allRecipes
}) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showRecipeSelector, setShowRecipeSelector] = useState(false);

    // Obtener día de la semana actual
    const today = new Date();
    const currentDayIndex = (today.getDay() + 6) % 7;

    // Generar menú automático
    const handleGenerateMenu = () => {
        const newMenu = generateWeeklyMenu(currentProfile, allRecipes);
        setWeeklyPlan(newMenu);

        // Actualizar lista de compras
        updateShoppingList(newMenu);
    };

    // Actualizar lista de compras basándose en el menú
    const updateShoppingList = (menu) => {
        const ingredientMap = new Map();

        Object.values(menu).forEach(day => {
            [day.lunch, day.dinner].forEach(recipe => {
                if (recipe?.ingredients) {
                    recipe.ingredients.forEach(ing => {
                        const key = `${ing.item}-${ing.category}`;
                        if (ingredientMap.has(key)) {
                            // TODO: Podría sumarse cantidades si se implementa parsing
                            ingredientMap.get(key).count++;
                        } else {
                            ingredientMap.set(key, {
                                id: key,
                                item: ing.item,
                                amount: ing.amount,
                                category: ing.category,
                                checked: false,
                                count: 1
                            });
                        }
                    });
                }
            });
        });

        setShoppingItems(Array.from(ingredientMap.values()));
    };

    // Seleccionar receta para un día/comida
    const handleSelectRecipe = (recipe) => {
        if (selectedDay === null || !selectedMeal) return;

        setWeeklyPlan(prev => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                day: weekDays[selectedDay],
                [selectedMeal]: recipe
            }
        }));

        setShowRecipeSelector(false);
        setSelectedDay(null);
        setSelectedMeal(null);

        // Actualizar shopping list
        setTimeout(() => {
            updateShoppingList(weeklyPlan);
        }, 100);
    };

    // Eliminar receta de un día
    const handleRemoveRecipe = (dayIndex, mealType) => {
        setWeeklyPlan(prev => ({
            ...prev,
            [dayIndex]: {
                ...prev[dayIndex],
                [mealType]: null
            }
        }));
    };

    // Abrir selector de recetas
    const openRecipeSelector = (dayIndex, mealType) => {
        setSelectedDay(dayIndex);
        setSelectedMeal(mealType);
        setShowRecipeSelector(true);
    };

    // Filtrar recetas según perfil
    const availableRecipes = currentProfile.hiddenVegRequired
        ? getHiddenVegFriendlyRecipes(allRecipes)
        : allRecipes;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Planificador Semanal</h2>
                    <p className="text-sm text-gray-400">Arrastra recetas a cada día</p>
                </div>
                <button
                    onClick={handleGenerateMenu}
                    className="btn btn-primary"
                >
                    <Wand2 className="w-4 h-4" />
                    Auto-generar
                </button>
            </div>

            {/* Week Grid */}
            <div className="space-y-3">
                {weekDays.map((day, index) => {
                    const dayPlan = weeklyPlan[index];
                    const isToday = index === currentDayIndex;

                    return (
                        <div
                            key={index}
                            className={`day-card ${isToday ? 'today' : ''}`}
                        >
                            {/* Day Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg font-bold ${isToday ? 'text-emerald-400' : 'text-gray-300'}`}>
                                        {day.short}
                                    </span>
                                    {isToday && (
                                        <span className="badge badge-keto text-xs">Hoy</span>
                                    )}
                                </div>
                                {dayPlan && (
                                    <span className="text-xs text-gray-400">
                                        {(dayPlan.lunch?.macros?.calories || 0) + (dayPlan.dinner?.macros?.calories || 0)} kcal
                                    </span>
                                )}
                            </div>

                            {/* Meals Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {/* Almuerzo */}
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Almuerzo</p>
                                    {dayPlan?.lunch ? (
                                        <div className="relative group">
                                            <div className="p-3 bg-slate-700/50 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">{dayPlan.lunch.image}</span>
                                                    <p className="text-sm font-medium truncate">{dayPlan.lunch.name}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveRecipe(index, 'lunch')}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => openRecipeSelector(index, 'lunch')}
                                            className="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span className="text-xs">Agregar</span>
                                        </button>
                                    )}
                                </div>

                                {/* Cena */}
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Cena</p>
                                    {dayPlan?.dinner ? (
                                        <div className="relative group">
                                            <div className="p-3 bg-slate-700/50 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">{dayPlan.dinner.image}</span>
                                                    <p className="text-sm font-medium truncate">{dayPlan.dinner.name}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveRecipe(index, 'dinner')}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => openRecipeSelector(index, 'dinner')}
                                            className="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span className="text-xs">Agregar</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Sync shopping list button */}
            <button
                onClick={() => updateShoppingList(weeklyPlan)}
                className="btn btn-secondary w-full"
            >
                <RefreshCw className="w-4 h-4" />
                Actualizar Lista de Compras
            </button>

            {/* Recipe Selector Modal */}
            {showRecipeSelector && (
                <div
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setShowRecipeSelector(false);
                            setSelectedDay(null);
                            setSelectedMeal(null);
                        }
                    }}
                >
                    <div className="modal-content max-w-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold">Seleccionar Receta</h3>
                                <p className="text-sm text-gray-400">
                                    {weekDays[selectedDay]?.full} - {selectedMeal === 'lunch' ? 'Almuerzo' : 'Cena'}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowRecipeSelector(false);
                                    setSelectedDay(null);
                                    setSelectedMeal(null);
                                }}
                                className="btn btn-ghost p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {availableRecipes.map(recipe => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    compact
                                    currentProfile={currentProfile}
                                    onSelect={handleSelectRecipe}
                                    isSelected={
                                        weeklyPlan[selectedDay]?.[selectedMeal]?.id === recipe.id
                                    }
                                    showSubstitute={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeeklyPlanner;
