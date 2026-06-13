import { FiTrash2 } from 'react-icons/fi';
import { GiCupcake, GiFrenchFries, GiPizzaSlice, GiSodaCan } from 'react-icons/gi';
import ToggleSwitch from './ToggleSwitch';

const iconMap = {
    Pizza: GiPizzaSlice,
    Sides: GiFrenchFries,
    Drinks: GiSodaCan,
    Desserts: GiCupcake,
};

export default function MenuItemRow({ item, onUpdate, onToggle, onDelete }) {
    const Icon = iconMap[item.category] || GiPizzaSlice;

    const handleChange = (field, value) => {
        const nextValue = field === 'price' ? parseFloat(value) || 0 : value;
        onUpdate(item.id, field, nextValue);
    };

    return (
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-sm dark:hover:shadow-md dark:hover:shadow-slate-700/50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-3xl bg-orange-100 text-orange-600 shadow-inner transition dark:bg-orange-900/30 dark:text-orange-400">
                        <Icon size={26} />
                    </div>
                    <div className="min-w-0">
                        <input
                            value={item.name}
                            onChange={(event) => handleChange('name', event.target.value)}
                            className="w-full bg-transparent text-lg font-semibold text-slate-950 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500 transition"
                        />
                        <textarea
                            value={item.description}
                            onChange={(event) => handleChange('description', event.target.value)}
                            rows={2}
                            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <ToggleSwitch checked={item.available} onChange={() => onToggle(item.id)} />
                    <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="inline-flex items-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:border-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400"
                    >
                        <FiTrash2 className="mr-2" /> Delete
                    </button>
                </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr]">
                <label className="block text-sm text-slate-600 dark:text-slate-400 transition">
                    Price
                    <div className="mt-2 flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 transition dark:border-slate-600 dark:bg-slate-700">
                        <span className="text-sm text-slate-500 dark:text-slate-400 transition">Rs</span>
                        <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={item.price}
                            onChange={(event) => handleChange('price', event.target.value)}
                            className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none dark:text-slate-100 dark:placeholder:text-slate-500 transition"
                        />
                    </div>
                </label>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 transition">Category</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100 transition">{item.category}</p>
                </div>
            </div>
        </div>
    );
}
