import { useState } from 'react';
import {
    Clock,
    Users,
    Flame,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    RefreshCw,
    Check
} from 'lucide-react';
import { getSubstituteRecipe } from '../data/recipes';

function RecipeCard({
    recipe,
    mealType,
    compact = false,
    currentProfile,
    onSelect,
    isSelected = false,
    showSubstitute = true
}) {
    const [expanded, setExpanded] = useState(false);
    const [showingSubstitute, setShowingSubstitute] = useState(false);

    if (!recipe) return null;

    // Verificar si necesita sustitución para Usuario B
    const needsSubstitution = currentProfile?.hiddenVegRequired && !recipe.isHiddenVegFriendly;
    const substituteRecipe = needsSubstitution ? getSubstituteRecipe(recipe) : null;

    // Receta a mostrar (original o sustituta)
    const displayRecipe = showingSubstitute && substituteRecipe ? substituteRecipe : recipe;

    if (compact) {
        return (
            <div className={`glass-card p-4 recipe-card ${isSelected ? 'border-emerald-500/50' : ''}`}>
                <div className="flex items-start gap-3">
                    <span className="text-3xl">{displayRecipe.image}</span>
                    <div className="flex-1 min-w-0">
                        {mealType && (
                            <p className="text-xs text-emerald-400 font-medium mb-1">{mealType}</p>
                        )}
                        <h3 className="font-semibold truncate">{displayRecipe.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {displayRecipe.prepTime} min
                            </span>
                            <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                {displayRecipe.macros.calories} kcal
                            </span>
                        </div>

                        {/* Warning badge for User B */}
                        {needsSubstitution && showSubstitute && (
                            <div className="mt-2">
                                {showingSubstitute ? (
                                    <button
                                        onClick={() => setShowingSubstitute(false)}
                                        className="badge badge-keto text-xs flex items-center gap-1"
                                    >
                                        <Check className="w-3 h-3" />
                                        Sustitución aplicada
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setShowingSubstitute(true)}
                                        className="badge badge-warning text-xs flex items-center gap-1"
                                    >
                                        <AlertTriangle className="w-3 h-3" />
                                        Contiene hojas crudas
                                        <RefreshCw className="w-3 h-3 ml-1" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {onSelect && (
                        <button
                            onClick={() => onSelect(recipe)}
                            className={`p-2 rounded-lg transition-all ${isSelected
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
                                }`}
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Full card version
    return (
        <div className={`glass-card overflow-hidden recipe-card ${isSelected ? 'border-emerald-500/50' : ''}`}>
            {/* Header */}
            <div className="p-4">
                <div className="flex items-start gap-4">
                    <span className="text-5xl">{displayRecipe.image}</span>
                    <div className="flex-1">
                        {mealType && (
                            <span className="badge badge-keto text-xs mb-2">{mealType}</span>
                        )}
                        <h3 className="font-bold text-lg">{displayRecipe.name}</h3>

                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {displayRecipe.prepTime} min
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {displayRecipe.servings} porciones
                            </span>
                        </div>
                    </div>
                </div>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <p className="text-lg font-bold text-orange-400">{displayRecipe.macros.calories}</p>
                        <p className="text-xs text-gray-400">kcal</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <p className="text-lg font-bold text-yellow-400">{displayRecipe.macros.fat}g</p>
                        <p className="text-xs text-gray-400">grasa</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <p className="text-lg font-bold text-red-400">{displayRecipe.macros.protein}g</p>
                        <p className="text-xs text-gray-400">proteína</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/50 rounded-lg">
                        <p className="text-lg font-bold text-emerald-400">{displayRecipe.macros.carbs}g</p>
                        <p className="text-xs text-gray-400">carbos</p>
                    </div>
                </div>

                {/* Hidden Veg Badge */}
                {displayRecipe.isHiddenVegFriendly && (
                    <div className="mt-3">
                        <span className="badge badge-keto">
                            ✓ Apto para vegetales ocultos
                        </span>
                    </div>
                )}

                {/* Substitution warning */}
                {needsSubstitution && substituteRecipe && showSubstitute && (
                    <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm text-amber-400 font-medium">Contiene hojas crudas</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Sugerencia: {substituteRecipe.name}
                                </p>
                                <button
                                    onClick={() => setShowingSubstitute(!showingSubstitute)}
                                    className="btn btn-secondary btn-sm mt-2 text-xs"
                                >
                                    <RefreshCw className="w-3 h-3" />
                                    {showingSubstitute ? 'Ver original' : 'Ver sustituto'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Expandable content */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-4 py-3 bg-slate-700/30 hover:bg-slate-700/50 transition-all flex items-center justify-between border-t border-slate-700"
            >
                <span className="text-sm font-medium">
                    {expanded ? 'Ocultar detalles' : 'Ver ingredientes e instrucciones'}
                </span>
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {expanded && (
                <div className="p-4 bg-slate-800/50 space-y-4 animate-slide-up">
                    {/* Ingredients */}
                    <div>
                        <h4 className="font-semibold text-emerald-400 mb-2">Ingredientes</h4>
                        <ul className="space-y-1">
                            {displayRecipe.ingredients.map((ing, idx) => (
                                <li key={idx} className="text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                                    <span className="text-gray-300">{ing.amount}</span>
                                    <span>{ing.item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                        <h4 className="font-semibold text-emerald-400 mb-2">Preparación</h4>
                        <ol className="space-y-2">
                            {displayRecipe.instructions.map((step, idx) => (
                                <li key={idx} className="text-sm flex gap-3">
                                    <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {idx + 1}
                                    </span>
                                    <span className="text-gray-300">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}

            {/* Select button */}
            {onSelect && (
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={() => onSelect(recipe)}
                        className={`btn w-full ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
                    >
                        {isSelected ? (
                            <>
                                <Check className="w-4 h-4" />
                                Seleccionada
                            </>
                        ) : (
                            'Seleccionar'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

export default RecipeCard;
