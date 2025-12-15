import { useState } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    Leaf,
    AlertTriangle
} from 'lucide-react';
import { recipes, getHiddenVegFriendlyRecipes } from '../data/recipes';
import RecipeCard from './RecipeCard';

function RecipeList({ currentProfile }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showOnlyHiddenVegFriendly, setShowOnlyHiddenVegFriendly] = useState(
        currentProfile.hiddenVegRequired
    );

    const categories = [
        { id: 'all', label: 'Todas', icon: '🍽️' },
        { id: 'carnes', label: 'Carnes', icon: '🥩' },
        { id: 'vegetales', label: 'Vegetales', icon: '🥦' },
        { id: 'ensaladas', label: 'Ensaladas', icon: '🥗' },
        { id: 'huevos', label: 'Huevos', icon: '🍳' },
        { id: 'panadería', label: 'Panadería', icon: '🍞' },
        { id: 'acompañamientos', label: 'Acompañamientos', icon: '🥒' }
    ];

    // Filtrar recetas
    const filteredRecipes = recipes.filter(recipe => {
        // Filtro por búsqueda
        const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.some(ing => ing.item.toLowerCase().includes(searchQuery.toLowerCase()));

        // Filtro por categoría
        const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;

        // Filtro por vegetales ocultos
        const matchesHiddenVeg = !showOnlyHiddenVegFriendly || recipe.isHiddenVegFriendly;

        return matchesSearch && matchesCategory && matchesHiddenVeg;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold">Recetas Keto</h2>
                <p className="text-sm text-gray-400">{filteredRecipes.length} recetas disponibles</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar recetas o ingredientes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-12"
                />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === cat.id
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        <span className="text-sm font-medium">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Hidden Veg Filter */}
            <div
                className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all ${showOnlyHiddenVegFriendly ? 'border-emerald-500/50' : ''
                    }`}
                onClick={() => setShowOnlyHiddenVegFriendly(!showOnlyHiddenVegFriendly)}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${showOnlyHiddenVegFriendly ? 'bg-emerald-500/20' : 'bg-slate-700'
                        }`}>
                        <Leaf className={`w-5 h-5 ${showOnlyHiddenVegFriendly ? 'text-emerald-400' : 'text-gray-400'}`} />
                    </div>
                    <div>
                        <p className="font-medium">Solo vegetales ocultos</p>
                        <p className="text-xs text-gray-400">Sin ensaladas de hojas crudas</p>
                    </div>
                </div>
                <div className={`toggle-switch ${showOnlyHiddenVegFriendly ? 'active' : ''}`} />
            </div>

            {/* User B Info */}
            {currentProfile.hiddenVegRequired && !showOnlyHiddenVegFriendly && (
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-sm text-gray-300">
                        Estás viendo todas las recetas. Las que contienen hojas crudas mostrarán opciones de sustitución.
                    </p>
                </div>
            )}

            {/* Recipes Grid */}
            <div className="space-y-4">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            currentProfile={currentProfile}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No se encontraron recetas</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                                setShowOnlyHiddenVegFriendly(false);
                            }}
                            className="btn btn-secondary mt-4"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeList;
