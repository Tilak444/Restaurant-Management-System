import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

export default function AddItemForm({ categories, onAdd }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(categories[1] || 'Pizza');
    const [available, setAvailable] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name.trim() || !price) return;
        onAdd({
            name: name.trim(),
            description: description.trim(),
            price: parseFloat(price),
            category,
            available,
        });
        setName('');
        setPrice('');
        setDescription('');
        setCategory(categories[1] || 'Pizza');
        setAvailable(true);
    };

    return (
        <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] transition dark:border-slate-700/80 dark:bg-slate-800/95 dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
            <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 transition">Add new item</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-100 transition">Quick add</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400 transition">
                    Use the form to add a new menu item instantly.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition">
                    Item name
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter item name"
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                    />
                </label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition">
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="0.00"
                        step="0.5"
                        min="0"
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                    />
                </label>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition">
                    Description
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Tomato, mozzarella, basil"
                        rows={4}
                        className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                    />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 transition">
                        Category
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                        >
                            {categories.slice(1).map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50 p-4 transition dark:border-slate-600 dark:bg-slate-700">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 transition">Available</span>
                        <div className="mt-3 flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400 transition">Toggle visibility</span>
                            <ToggleSwitch checked={available} onChange={setAvailable} />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-2 inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 dark:hover:bg-orange-600"
                >
                    + Add to Menu
                </button>
            </form>
        </div>
    );
}
