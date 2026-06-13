import React, { useState } from 'react';

interface OrderFormProps {
    onOrderChange: (order: { customerName: string; tableNumber: number; kitchenNotes: string }) => void;
}

export default function NewOrderForm({ onOrderChange }: OrderFormProps) {
    const [customerName, setCustomerName] = useState('');
    const [tableNumber, setTableNumber] = useState(10);
    const [kitchenNotes, setKitchenNotes] = useState('');

    const handleChange = () => {
        onOrderChange({
            customerName,
            tableNumber,
            kitchenNotes,
        });
    };

    React.useEffect(() => {
        handleChange();
    }, [customerName, tableNumber, kitchenNotes]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Order</h2>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Customer Name/Phone
                        </label>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Customer Name"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Table Number
                        </label>
                        <input
                            type="number"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(parseInt(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Kitchen Notes */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Kitchen Notes
                    </label>
                    <textarea
                        value={kitchenNotes}
                        onChange={(e) => setKitchenNotes(e.target.value)}
                        placeholder="Add special instructions..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                </div>
            </div>
        </div>
    );
}
