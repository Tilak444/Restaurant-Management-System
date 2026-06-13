export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
    return (
        <div className="sticky top-6 space-y-3 rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.05)] transition dark:border-slate-700/80 dark:bg-slate-800/90 dark:shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 transition">Categories</p>
            <div className="grid gap-3 sm:grid-cols-2">
                {categories.map((category) => {
                    const selected = activeCategory === category;
                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onCategoryChange(category)}
                            className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${selected
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/15'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
