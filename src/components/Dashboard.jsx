import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Calendar,
    TrendingUp,
    Utensils,
    ChevronRight,
    Flame,
    Droplet,
    Dumbbell,
    Leaf,
    AlertCircle,
    Play,
    RotateCcw,
    CheckCircle2
} from 'lucide-react';
import { weekDays } from '../data/recipes';
import RecipeCard from './RecipeCard';
import RecipeEditor from './RecipeEditor';
import Modal from './Modal';

function Dashboard({
    currentUser,
    currentProfile,
    weeklyPlan,
    dayNumber,
    startDate,
    setStartDate,
    setWeeklyPlan,
    allRecipes,
    handleConsumption,
    apiKey
}) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [consumingRecipe, setConsumingRecipe] = useState(null);

    // Obtener el día de la semana actual (0-6, donde 0 es Lunes)
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // Convertir de domingo=0 a lunes=0

    // Datos del día actual del plan
    const todayPlan = weeklyPlan[dayOfWeek];

    // Calcular macros del día actual
    const calculateTodayMacros = () => {
        if (!todayPlan) {
            return { calories: 0, fat: 0, protein: 0, carbs: 0 };
        }

        const lunchMacros = todayPlan.lunch?.macros || { calories: 0, fat: 0, protein: 0, carbs: 0 };
        const dinnerMacros = todayPlan.dinner?.macros || { calories: 0, fat: 0, protein: 0, carbs: 0 };

        // Desayuno fijo: 2 huevos + café con manteca ≈ 300 cal, 25g fat, 12g protein, 1g carbs
        const breakfastMacros = { calories: 300, fat: 25, protein: 12, carbs: 1 };

        return {
            calories: breakfastMacros.calories + lunchMacros.calories + dinnerMacros.calories,
            fat: breakfastMacros.fat + lunchMacros.fat + dinnerMacros.fat,
            protein: breakfastMacros.protein + lunchMacros.protein + dinnerMacros.protein,
            carbs: breakfastMacros.carbs + lunchMacros.carbs + dinnerMacros.carbs
        };
    };

    const todayMacros = calculateTodayMacros();
    const targetMacros = currentProfile.dailyMacros;

    // Macro cards data
    const macroCards = [
        {
            label: 'Calorías',
            current: todayMacros.calories,
            target: targetMacros.calories,
            unit: 'kcal',
            icon: Flame,
            color: 'orange'
        },
        {
            label: 'Grasas',
            current: todayMacros.fat,
            target: targetMacros.fat,
            unit: 'g',
            icon: Droplet,
            color: 'yellow'
        },
        {
            label: 'Proteínas',
            current: todayMacros.protein,
            target: targetMacros.protein,
            unit: 'g',
            icon: Dumbbell,
            color: 'red'
        },
        {
            label: 'Carbos',
            current: todayMacros.carbs,
            target: targetMacros.carbs,
            unit: 'g',
            icon: Leaf,
            color: 'emerald'
        }
    ];

    const handleResetChallenge = () => {
        if (confirm('¿Reiniciar el reto de 30 días? Esto establecerá hoy como Día 1.')) {
            setStartDate(new Date().toISOString().split('T')[0]);
            setWeeklyPlan({});
            localStorage.removeItem('keto_weekly_plan');
        }
    };

    const startConsumption = (recipe) => {
        setConsumingRecipe(recipe);
    };

    const confirmConsumption = (finalRecipe) => {
        handleConsumption(finalRecipe);
        setConsumingRecipe(null);
        alert("¡Consumo registrado!");
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Hero Card - Día Actual */}
            <div className="glass-card p-6 gradient-border">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-gray-400 text-sm">Hoy es</p>
                        <h2 className="text-2xl font-bold text-white">
                            {weekDays[dayOfWeek]?.full || 'Hoy'}
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-black text-emerald-400">{dayNumber}</div>
                        <p className="text-xs text-gray-400">de 30 días</p>
                    </div>
                </div>

                {/* Progress visual */}
                <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 30 }, (_, i) => (
                        <div
                            key={i}
                            className={`h-2 flex-1 rounded-full transition-all duration-300 ${i < dayNumber
                                ? 'bg-emerald-500'
                                : 'bg-slate-700'
                                }`}
                        />
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        className="btn btn-secondary flex-1 text-xs"
                    >
                        <Calendar className="w-4 h-4" />
                        Cambiar inicio
                    </button>
                    <button
                        onClick={handleResetChallenge}
                        className="btn btn-ghost text-xs"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reiniciar
                    </button>
                </div>

                {showDatePicker && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                        <label className="text-sm text-gray-400 mb-2 block">Fecha de inicio del reto:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="input text-sm"
                        />
                    </div>
                )}
            </div>

            {/* Macros del día */}
            <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Macros de Hoy
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {macroCards.map(({ label, current, target, unit, icon: Icon, color }) => {
                        const percentage = Math.min((current / target) * 100, 100);
                        const isOver = current > target;

                        return (
                            <div key={label} className="glass-card p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon className={`w-4 h-4 text-${color}-400`} />
                                    <span className="text-sm text-gray-400">{label}</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-xl font-bold ${isOver && label === 'Carbos' ? 'text-red-400' : 'text-white'}`}>
                                        {current}
                                    </span>
                                    <span className="text-sm text-gray-500">/ {target} {unit}</span>
                                </div>
                                <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${isOver && label === 'Carbos'
                                            ? 'bg-red-500'
                                            : `bg-${color}-500`
                                            }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Warning for User B */}
            {currentProfile.hiddenVegRequired && (
                <div className="glass-card p-4 border border-amber-500/30 bg-amber-500/5">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-amber-400">Modo Vegetales Ocultos</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Las ensaladas crudas se sustituirán automáticamente por vegetales cocidos con grasa.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Comidas del día */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-emerald-400" />
                        Menú de Hoy
                    </h3>
                    <Link to="/planner" className="text-emerald-400 text-sm flex items-center gap-1">
                        Ver semana <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {todayPlan ? (
                    <div className="space-y-4">
                        {/* Desayuno fijo */}
                        <div className="glass-card p-4 opacity-70">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🍳</span>
                                <div>
                                    <p className="text-xs text-emerald-400 font-medium">Desayuno</p>
                                    <p className="font-medium">Huevos + Café con Manteca</p>
                                    <p className="text-xs text-gray-400">Siempre igual • 300 kcal</p>
                                </div>
                            </div>
                        </div>

                        {/* Almuerzo */}
                        {todayPlan.lunch && (
                            <div className="relative">
                                <RecipeCard
                                    recipe={todayPlan.lunch}
                                    mealType="Almuerzo"
                                    compact
                                    currentProfile={currentProfile}
                                />
                                <button
                                    onClick={() => startConsumption(todayPlan.lunch)}
                                    className="absolute bottom-4 right-4 btn btn-primary text-xs py-1 px-3 shadow-lg flex items-center gap-1 z-10"
                                >
                                    <CheckCircle2 className="w-3 h-3" /> Consumir
                                </button>
                            </div>
                        )}

                        {/* Cena */}
                        {todayPlan.dinner && (
                            <div className="relative">
                                <RecipeCard
                                    recipe={todayPlan.dinner}
                                    mealType="Cena"
                                    compact
                                    currentProfile={currentProfile}
                                />
                                <button
                                    onClick={() => startConsumption(todayPlan.dinner)}
                                    className="absolute bottom-4 right-4 btn btn-primary text-xs py-1 px-3 shadow-lg flex items-center gap-1 z-10"
                                >
                                    <CheckCircle2 className="w-3 h-3" /> Consumir
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="glass-card p-6 text-center">
                        <p className="text-gray-400 mb-4">No hay menú planificado para hoy</p>
                        <Link to="/planner" className="btn btn-primary">
                            <Play className="w-4 h-4" />
                            Planificar Semana
                        </Link>
                    </div>
                )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
                <Link to="/recipes" className="glass-card p-4 hover:bg-slate-700/50 transition-all group">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
                        <div>
                            <p className="font-medium">Recetas</p>
                            <p className="text-xs text-gray-400">{allRecipes.length} disponibles</p>
                        </div>
                    </div>
                </Link>

                <Link to="/health" className="glass-card p-4 hover:bg-slate-700/50 transition-all group">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">💊</span>
                        <div>
                            <p className="font-medium">Keto Flu</p>
                            <p className="text-xs text-gray-400">¿Síntomas?</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Consumption Modal */}
            {consumingRecipe && (
                <Modal
                    onClose={() => setConsumingRecipe(null)}
                    className="max-w-2xl max-h-[80vh]"
                >
                    <RecipeEditor
                        initialRecipe={consumingRecipe}
                        onSave={confirmConsumption}
                        onCancel={() => setConsumingRecipe(null)}
                        apiKey={apiKey}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Dashboard;
