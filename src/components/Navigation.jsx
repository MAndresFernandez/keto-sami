import { NavLink } from 'react-router-dom';
import { Home, Calendar, ChefHat, ShoppingCart, Activity } from 'lucide-react';

function Navigation() {
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/planner', icon: Calendar, label: 'Planificador' },
        { path: '/recipes', icon: ChefHat, label: 'Recetas' },
        { path: '/shopping', icon: ShoppingCart, label: 'Compras' },
        { path: '/health', icon: Activity, label: 'Salud' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 glass border-t border-slate-700/50 px-2 py-2 z-50">
            <div className="max-w-lg mx-auto flex justify-around">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) => `
              flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200
              ${isActive
                                ? 'text-emerald-400 bg-emerald-500/10'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
                            }
            `}
                    >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default Navigation;
