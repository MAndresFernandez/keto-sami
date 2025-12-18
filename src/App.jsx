import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { recipes as defaultRecipes, userProfiles, generateWeeklyMenu } from './data/recipes';
import Dashboard from './components/Dashboard';
import WeeklyPlanner from './components/WeeklyPlanner';
import RecipeList from './components/RecipeList';
import ShoppingList from './components/ShoppingList';
import Navigation from './components/Navigation';
import KetoFluTracker from './components/KetoFluTracker';

function App() {
    // Usuario actual
    const [currentUser, setCurrentUser] = useState(() => {
        return localStorage.getItem('keto_current_user') || 'A';
    });

    const currentProfile = userProfiles[currentUser];

    // Recetas (base + custom)
    const [allRecipes, setAllRecipes] = useState(() => {
        const saved = localStorage.getItem('keto_recipes');
        return saved ? JSON.parse(saved) : defaultRecipes;
    });

    // Plan semanal
    const [weeklyPlan, setWeeklyPlan] = useState(() => {
        const saved = localStorage.getItem('keto_weekly_plan');
        if (saved) {
            return JSON.parse(saved);
        }
        return generateWeeklyMenu(currentProfile, allRecipes);
    });

    // Lista de compras
    const [shoppingItems, setShoppingItems] = useState(() => {
        const saved = localStorage.getItem('keto_shopping');
        return saved ? JSON.parse(saved) : [];
    });

    // Historial de consumo
    const [consumptionHistory, setConsumptionHistory] = useState(() => {
        const saved = localStorage.getItem('keto_consumption');
        return saved ? JSON.parse(saved) : [];
    });

    // Fecha de inicio del plan
    const [startDate, setStartDate] = useState(() => {
        const saved = localStorage.getItem('keto_start_date');
        return saved || new Date().toISOString().split('T')[0];
    });

    // Modal de shopping
    const [showShoppingModal, setShowShoppingModal] = useState(false);

    // Toggle usuario
    const toggleUser = () => {
        const newUser = currentUser === 'A' ? 'B' : 'A';
        setCurrentUser(newUser);
        localStorage.setItem('keto_current_user', newUser);
    };

    // Calcular día del plan
    const calculateDayNumber = () => {
        const start = new Date(startDate);
        const today = new Date();
        const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        return Math.max(1, Math.min(30, diff + 1));
    };

    // Persistir datos
    useEffect(() => {
        localStorage.setItem('keto_recipes', JSON.stringify(allRecipes));
    }, [allRecipes]);

    useEffect(() => {
        localStorage.setItem('keto_weekly_plan', JSON.stringify(weeklyPlan));
    }, [weeklyPlan]);

    useEffect(() => {
        localStorage.setItem('keto_shopping', JSON.stringify(shoppingItems));
    }, [shoppingItems]);

    useEffect(() => {
        localStorage.setItem('keto_consumption', JSON.stringify(consumptionHistory));
    }, [consumptionHistory]);

    useEffect(() => {
        localStorage.setItem('keto_start_date', startDate);
    }, [startDate]);

    // Handlers
    const handleSaveRecipe = (recipe) => {
        if (recipe.id) {
            setAllRecipes(prev => prev.map(r => r.id === recipe.id ? recipe : r));
        } else {
            const newRecipe = { ...recipe, id: Date.now() };
            setAllRecipes(prev => [...prev, newRecipe]);
        }
    };

    const handleDeleteRecipe = (id) => {
        if (window.confirm('¿Eliminar esta receta?')) {
            setAllRecipes(prev => prev.filter(r => r.id !== id));
        }
    };

    const handleConsumption = (mealData) => {
        setConsumptionHistory(prev => [...prev, { ...mealData, timestamp: new Date().toISOString() }]);
    };

    // Props compartidas
    const sharedProps = {
        currentUser,
        currentProfile,
        toggleUser,
        weeklyPlan,
        setWeeklyPlan,
        shoppingItems,
        setShoppingItems,
        startDate,
        setStartDate,
        dayNumber: calculateDayNumber(),
        showShoppingModal,
        setShowShoppingModal,
        allRecipes,
        setAllRecipes,
        handleSaveRecipe,
        handleDeleteRecipe,
        handleConsumption,
        consumptionHistory
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pb-20">
            <Routes>
                <Route path="/" element={<Dashboard {...sharedProps} />} />
                <Route path="/planner" element={<WeeklyPlanner {...sharedProps} />} />
                <Route path="/recipes" element={<RecipeList {...sharedProps} />} />
                <Route path="/shopping" element={<ShoppingList {...sharedProps} />} />
                <Route path="/keto-flu" element={<KetoFluTracker {...sharedProps} />} />
            </Routes>
            <Navigation />
        </div>
    );
}

export default App;
