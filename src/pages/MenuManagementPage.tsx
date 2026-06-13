import React, { useMemo, useRef, useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import CategoryFilter from '../components/CategoryFilter';
import MenuTable from '../components/MenuTable';
import AddItemForm from '../components/AddItemForm';
import { categories, initialMenuItems } from '../data/menuData';

export default function MenuManagementPage() {
    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [toast, setToast] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('darkMode');
            if (saved !== null) {
                return saved === 'true';
            }
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    }, [isDarkMode]);

    const filteredItems = useMemo(() => {
        return menuItems.filter((item) => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = [item.name, item.description, item.category]
                .join(' ')
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, menuItems, searchTerm]);

    const toastTimer = useRef<number | null>(null);

    const enqueueToast = (message: string) => {
        setToast(message);
        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }
        toastTimer.current = window.setTimeout(() => setToast(''), 2400);
    };

    const addMenuItem = (item: any) => {
        setMenuItems((current) => [
            {
                id: Date.now(),
                ...item,
            },
            ...current,
        ]);
        enqueueToast('Menu item added');
    };

    const updateMenuItem = (id: number, field: string, value: any) => {
        setMenuItems((current) =>
            current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
        );
        enqueueToast('Menu item updated');
    };

    const deleteMenuItem = (id: number) => {
        if (window.confirm('Delete this item from the menu?')) {
            setMenuItems((current) => current.filter((item) => item.id !== id));
            enqueueToast('Menu item deleted');
        }
    };

    const toggleAvailability = (id: number) => {
        setMenuItems((current) =>
            current.map((item) =>
                item.id === id ? { ...item, available: !item.available } : item,
            ),
        );
        enqueueToast('Availability updated');
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
            <Topbar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                isDarkMode={isDarkMode}
                onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
            <div className="mx-auto grid max-w-[1640px] gap-6 px-4 py-6 sm:px-6 lg:px-0 xl:grid-cols-[18rem_minmax(0,1fr)_26rem]">
                <Sidebar />

                <main className="space-y-6 lg:order-none">
                    <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.05)] transition dark:border-slate-700/80 dark:bg-slate-800/95 dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-orange-500">Menu dashboard</p>
                                <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-100 transition">
                                    Restaurant menu control
                                </h2>
                            </div>
                            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600 transition dark:bg-slate-700 dark:text-slate-400">
                                Manage item details, visibility, and pricing faster.
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)]">
                        <CategoryFilter
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                        <div className="space-y-6">
                            <MenuTable
                                items={filteredItems}
                                onUpdateItem={updateMenuItem}
                                onToggleAvailability={toggleAvailability}
                                onDeleteItem={deleteMenuItem}
                            />
                        </div>
                    </div>
                </main>

                <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                    <AddItemForm categories={categories} onAdd={addMenuItem} />
                    <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.05)] transition dark:border-slate-700/80 dark:bg-slate-800/95 dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 transition">
                            Tips
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-slate-100 transition">
                            Streamline updates
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 transition">
                            Use the search and category filters together to locate items quickly. Edit prices,
                            descriptions, and availability directly in each row.
                        </p>
                    </div>
                </aside>
            </div>

            {toast ? (
                <div className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl bg-slate-950 px-5 py-4 text-sm text-white shadow-2xl shadow-slate-950/20 transition dark:bg-slate-100 dark:text-slate-950 dark:shadow-slate-100/20">
                    {toast}
                </div>
            ) : null}
        </div>
    );
}
