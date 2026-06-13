import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    available: boolean;
}

interface MenuItemCardProps {
    item: MenuItem;
    quantity: number;
    onAddItem: (item: MenuItem) => void;
    onRemoveItem: (id: number) => void;
}

export default function MenuItemCard({
    item,
    quantity,
    onAddItem,
    onRemoveItem,
}: MenuItemCardProps) {
    const categoryEmojis: { [key: string]: string } = {
        Pizza: '🍕',
        Sides: '🍟',
        Drinks: '🥤',
        Desserts: '🍰',
    };

    return (
        <div
            className={`rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden transition hover:shadow-lg ${!item.available ? 'opacity-50' : ''
                }`}
        >
            {/* Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">{categoryEmojis[item.category] || '🍕'}</div>
            </div>

            {/* Content */}
            <div className="p-4 bg-white dark:bg-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {item.name}
                </h3>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-500 mt-2">
                    ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                        Qty: {quantity}
                    </span>
                    <div className="flex items-center gap-2">
                        {quantity > 0 && (
                            <button
                                onClick={() => onRemoveItem(item.id)}
                                className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center transition"
                            >
                                <FiMinus size={16} />
                            </button>
                        )}
                        <button
                            onClick={() => onAddItem(item)}
                            disabled={!item.available}
                            className={`h-8 w-8 rounded-lg flex items-center justify-center transition ${item.available
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                        >
                            <FiPlus size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
