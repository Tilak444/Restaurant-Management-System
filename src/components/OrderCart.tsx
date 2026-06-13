import React from 'react';
import { FiMinus, FiPlus, FiPrinter } from 'react-icons/fi';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface OrderCartProps {
    items: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

export default function OrderCart({
    items,
    onUpdateQuantity,
    onRemoveItem,
}: OrderCartProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
            {/* Header */}
            <div className="bg-orange-500 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Order Cart</h2>
            </div>

            {/* Items List */}
            <div className="max-h-80 overflow-y-auto">
                {items.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                        No items added yet
                    </div>
                ) : (
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {items.map((item) => (
                            <div key={item.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                                            {item.name}
                                        </h3>
                                        <p className="text-orange-600 dark:text-orange-500 font-bold mt-1">
                                            Rs {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900 dark:text-slate-100">
                                            Rs {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            x{item.quantity}
                                        </p>
                                    </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                                            }
                                            className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 flex items-center justify-center transition"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <span className="w-8 text-center font-medium text-slate-900 dark:text-slate-100">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="h-8 w-8 rounded-lg bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center transition"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-xs px-3 py-1 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Billing Summary */}
            <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 px-6 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Rs {subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Tax (10%)</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Rs {tax.toFixed(2)}
                    </span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">Grand Total</span>
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                        Rs {total.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Payment Options */}
            <div className="px-6 py-4 space-y-3">
                <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 rounded-xl border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition">
                        💰 Cash
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                        💳 Online Payment
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 space-y-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                        💾 Save Bill
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2">
                        <FiPrinter size={16} />
                        Print
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition">
                        🧾 Print KOT
                    </button>
                    <button className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                        ✓ Complete Order
                    </button>
                </div>
            </div>
        </div>
    );
}
