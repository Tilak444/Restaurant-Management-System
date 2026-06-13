import MenuItemRow from './MenuItemRow';

export default function MenuTable({ items, onUpdateItem, onToggleAvailability, onDeleteItem }) {
    if (!items.length) {
        return (
            <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/90 p-10 text-center shadow-sm transition dark:border-slate-600 dark:bg-slate-800/90">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 transition">No items found</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-slate-100 transition">Add your first menu item</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 transition">
                    Use the right-hand panel to create menu items and keep your POS menu up to date.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 rounded-[28px] bg-white/90 px-6 py-5 shadow-sm ring-1 ring-slate-200/80 transition dark:bg-slate-800/90 dark:ring-slate-700/80 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 transition">Showing</p>
                    <p className="text-2xl font-semibold text-slate-950 dark:text-slate-100 transition">{items.length} item{items.length > 1 ? 's' : ''}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 transition">Edit names, prices, categories, and availability directly.</p>
            </div>
            <div className="space-y-4">
                {items.map((item) => (
                    <MenuItemRow
                        key={item.id}
                        item={item}
                        onUpdate={onUpdateItem}
                        onToggle={onToggleAvailability}
                        onDelete={onDeleteItem}
                    />
                ))}
            </div>
        </div>
    );
}
