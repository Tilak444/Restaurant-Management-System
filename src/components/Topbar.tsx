import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Topbar({ searchTerm, onSearch, isDarkMode, onToggleDarkMode }) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const fullDate = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const fullTime = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    return (
        <div className="sticky top-0 z-40 bg-slate-50/95 border-b border-slate-200/80 backdrop-blur-xl dark:bg-slate-900/95 dark:border-slate-700/80">
            <div className="mx-auto flex max-w-[1640px] flex-col gap-4 px-4 py-4 sm:px-6 lg:px-0 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative max-w-2xl flex-1">
                    <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                        value={searchTerm}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder="Search orders, menu items..."
                        className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900/50"
                    />
                </div>

                <div className="flex items-center gap-4 sm:items-end">
                    <button
                        type="button"
                        onClick={onToggleDarkMode}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
                        title={isDarkMode ? 'Light mode' : 'Dark mode'}
                    >
                        {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                    <div className="flex flex-col items-start gap-1 text-sm text-slate-600 dark:text-slate-400 sm:items-end">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">Menu Management</span>
                        <span>{fullDate} · {fullTime}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
