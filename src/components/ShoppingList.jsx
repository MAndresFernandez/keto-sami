import { useState } from 'react';
import {
    Check,
    X,
    Trash2,
    ShoppingCart,
    ChevronDown,
    ChevronUp,
    Share,
    Copy
} from 'lucide-react';
import { shoppingCategories } from '../data/recipes';

function ShoppingList({
    shoppingItems,
    setShoppingItems,
    isModal = false,
    onClose
}) {
    const [expandedCategories, setExpandedCategories] = useState(
        shoppingCategories.map(c => c.id)
    );

    // Toggle item checked
    const toggleItem = (itemId) => {
        setShoppingItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
    };

    // Remove item
    const removeItem = (itemId) => {
        setShoppingItems(prev => prev.filter(item => item.id !== itemId));
    };

    // Clear checked items
    const clearChecked = () => {
        setShoppingItems(prev => prev.filter(item => !item.checked));
    };

    // Toggle category expansion
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    // Group items by category
    const groupedItems = shoppingCategories.map(category => ({
        ...category,
        items: shoppingItems.filter(item => item.category === category.id)
    })).filter(group => group.items.length > 0);

    // Calculate stats
    const totalItems = shoppingItems.length;
    const checkedItems = shoppingItems.filter(i => i.checked).length;
    const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

    // Copy list to clipboard
    const copyToClipboard = () => {
        const text = groupedItems.map(group => {
            const items = group.items
                .filter(i => !i.checked)
                .map(i => `  □ ${i.amount} ${i.item}`)
                .join('\n');
            return `${group.icon} ${group.id}:\n${items}`;
        }).join('\n\n');

        navigator.clipboard.writeText(`Lista de Compras Keto\n\n${text}`);
        alert('Lista copiada al portapapeles');
    };

    return (
        <div className={`${isModal ? '' : 'space-y-6 animate-fade-in'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-emerald-400" />
                    <div>
                        <h2 className="text-xl font-bold">Lista de Compras</h2>
                        <p className="text-sm text-gray-400">
                            {checkedItems} de {totalItems} items
                        </p>
                    </div>
                </div>
                {isModal && (
                    <button onClick={onClose} className="btn btn-ghost p-2">
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Progress Bar */}
            {totalItems > 0 && (
                <div className="mb-4">
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Empty State */}
            {totalItems === 0 ? (
                <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🛒</span>
                    <p className="text-gray-400 mb-2">
                        Tu lista de compras está vacía
                    </p>
                    <p className="text-sm text-gray-500">
                        Genera un menú semanal para agregar ingredientes automáticamente
                    </p>
                </div>
            ) : (
                <>
                    {/* Quick Actions */}
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={copyToClipboard}
                            className="btn btn-secondary flex-1 text-sm"
                        >
                            <Copy className="w-4 h-4" />
                            Copiar Lista
                        </button>
                        {checkedItems > 0 && (
                            <button
                                onClick={clearChecked}
                                className="btn btn-danger text-sm"
                            >
                                <Trash2 className="w-4 h-4" />
                                Limpiar ({checkedItems})
                            </button>
                        )}
                    </div>

                    {/* Grouped Items */}
                    <div className="space-y-3">
                        {groupedItems.map(group => {
                            const isExpanded = expandedCategories.includes(group.id);
                            const groupChecked = group.items.filter(i => i.checked).length;

                            return (
                                <div key={group.id} className="glass-card overflow-hidden">
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(group.id)}
                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-700/30 transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{group.icon}</span>
                                            <span className="font-semibold">{group.id}</span>
                                            <span className="text-xs text-gray-400">
                                                ({groupChecked}/{group.items.length})
                                            </span>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Items */}
                                    {isExpanded && (
                                        <div className="border-t border-slate-700">
                                            {group.items.map(item => (
                                                <div
                                                    key={item.id}
                                                    className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-700/20 transition-all ${item.checked ? 'opacity-50' : ''
                                                        }`}
                                                >
                                                    <button
                                                        onClick={() => toggleItem(item.id)}
                                                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${item.checked
                                                                ? 'bg-emerald-500 border-emerald-500'
                                                                : 'border-slate-500 hover:border-emerald-500'
                                                            }`}
                                                    >
                                                        {item.checked && <Check className="w-4 h-4 text-white" />}
                                                    </button>

                                                    <div className="flex-1">
                                                        <span className={`${item.checked ? 'line-through text-gray-500' : ''}`}>
                                                            {item.item}
                                                        </span>
                                                        <span className="text-sm text-gray-400 ml-2">
                                                            {item.amount}
                                                            {item.count > 1 && ` (×${item.count})`}
                                                        </span>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-all"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

export default ShoppingList;
