import { useState } from 'react';
import {
    Activity,
    AlertCircle,
    CheckCircle2,
    X,
    Sparkles,
    ChevronRight
} from 'lucide-react';
import { ketoFluSymptoms } from '../data/recipes';

function KetoFluTracker({ dayNumber }) {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [showRecommendation, setShowRecommendation] = useState(null);
    const [logHistory, setLogHistory] = useState(() => {
        const saved = localStorage.getItem('keto_flu_log');
        return saved ? JSON.parse(saved) : [];
    });

    // Toggle symptom selection
    const toggleSymptom = (symptomId) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptomId)
                ? prev.filter(id => id !== symptomId)
                : [...prev, symptomId]
        );
    };

    // Get recommendation for a symptom
    const getRecommendation = (symptomId) => {
        const symptom = ketoFluSymptoms.find(s => s.id === symptomId);
        setShowRecommendation(symptom);
    };

    // Log symptoms
    const logSymptoms = () => {
        if (selectedSymptoms.length === 0) return;

        const entry = {
            date: new Date().toISOString(),
            day: dayNumber,
            symptoms: selectedSymptoms
        };

        const newHistory = [...logHistory, entry];
        setLogHistory(newHistory);
        localStorage.setItem('keto_flu_log', JSON.stringify(newHistory));
        setSelectedSymptoms([]);
    };

    // Check if in typical keto flu window (days 2-7)
    const inFluWindow = dayNumber >= 2 && dayNumber <= 7;

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="w-7 h-7 text-emerald-400" />
                    Tracker de Keto Flu
                </h2>
                <p className="text-sm text-gray-400">
                    Registra tus síntomas y recibe recomendaciones
                </p>
            </div>

            {/* Keto Flu Info Card */}
            <div className={`glass-card p-5 ${inFluWindow ? 'border border-amber-500/30' : ''}`}>
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${inFluWindow ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                        }`}>
                        {inFluWindow ? (
                            <AlertCircle className="w-6 h-6 text-amber-400" />
                        ) : (
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            {inFluWindow
                                ? '⚠️ Período crítico de adaptación'
                                : dayNumber < 2
                                    ? '🚀 Inicio del reto'
                                    : '✨ Pasaste la etapa difícil'
                            }
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                            {inFluWindow
                                ? 'Es normal sentir síntomas de "Keto Flu" entre los días 2 y 7. Asegurate de mantener tus electrolitos.'
                                : dayNumber < 2
                                    ? 'Los primeros días son de ajuste. Empezá a prestar atención a cómo te sentís.'
                                    : 'Tu cuerpo ya debería estar adaptado a quemar grasa. ¡Seguí así!'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Symptom Selector */}
            <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    ¿Cómo te sentís hoy?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    {ketoFluSymptoms.map(symptom => {
                        const isSelected = selectedSymptoms.includes(symptom.id);

                        return (
                            <button
                                key={symptom.id}
                                onClick={() => toggleSymptom(symptom.id)}
                                className={`glass-card p-4 text-left transition-all ${isSelected
                                        ? 'border-emerald-500/50 bg-emerald-500/10'
                                        : 'hover:bg-slate-700/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl">{symptom.icon}</span>
                                    {isSelected && (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                    )}
                                </div>
                                <p className="font-medium mt-2 text-sm">{symptom.name}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        getRecommendation(symptom.id);
                                    }}
                                    className="text-xs text-emerald-400 mt-1 flex items-center gap-1 hover:underline"
                                >
                                    Ver recomendación <ChevronRight className="w-3 h-3" />
                                </button>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Log Button */}
            {selectedSymptoms.length > 0 && (
                <button
                    onClick={logSymptoms}
                    className="btn btn-primary w-full"
                >
                    Registrar {selectedSymptoms.length} síntoma{selectedSymptoms.length > 1 ? 's' : ''}
                </button>
            )}

            {/* History */}
            {logHistory.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-3">Historial Reciente</h3>
                    <div className="space-y-2">
                        {logHistory.slice(-5).reverse().map((entry, idx) => (
                            <div key={idx} className="glass-card p-3 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Día {entry.day}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(entry.date).toLocaleDateString('es-AR')}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    {entry.symptoms.map(symId => {
                                        const sym = ketoFluSymptoms.find(s => s.id === symId);
                                        return sym ? (
                                            <span key={symId} className="text-lg" title={sym.name}>
                                                {sym.icon}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Tips */}
            <div className="glass-card p-5">
                <h3 className="font-semibold mb-3">💡 Tips Rápidos para el Keto Flu</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        Tomá al menos 2-3 litros de agua por día
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        Agregá ½ cucharadita de sal a tu agua 2-3 veces al día
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        Tomá caldo de huesos o caldo de carne con frecuencia
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        Suplementá con 400mg de Magnesio antes de dormir
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-emerald-400">•</span>
                        No restrinjas grasas ni calorías los primeros días
                    </li>
                </ul>
            </div>

            {/* Recommendation Modal */}
            {showRecommendation && (
                <div
                    className="modal-overlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowRecommendation(null);
                    }}
                >
                    <div className="modal-content">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{showRecommendation.icon}</span>
                                <h3 className="text-lg font-bold">{showRecommendation.name}</h3>
                            </div>
                            <button
                                onClick={() => setShowRecommendation(null)}
                                className="btn btn-ghost p-2"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className={`p-4 rounded-xl mb-4 ${showRecommendation.urgency === 'high'
                                ? 'bg-red-500/10 border border-red-500/30'
                                : showRecommendation.urgency === 'medium'
                                    ? 'bg-amber-500/10 border border-amber-500/30'
                                    : 'bg-emerald-500/10 border border-emerald-500/30'
                            }`}>
                            <p className="font-medium text-lg mb-2">
                                {showRecommendation.urgency === 'high' ? '🚨' : showRecommendation.urgency === 'medium' ? '⚠️' : '💡'}
                                {' '}Recomendación:
                            </p>
                            <p className="text-gray-300">{showRecommendation.recommendation}</p>
                        </div>

                        <div className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-sm text-gray-400">
                                <span className="font-medium text-emerald-400">Suplemento sugerido:</span>{' '}
                                {showRecommendation.supplement}
                            </p>
                        </div>

                        <button
                            onClick={() => setShowRecommendation(null)}
                            className="btn btn-primary w-full mt-4"
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default KetoFluTracker;
