import { FiCreditCard, FiHome, FiList, FiSettings, FiShoppingCart } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Dashboard', icon: FiHome, path: '/' },
    { label: 'New Order', icon: FiShoppingCart, path: '/new-order' },
    { label: 'Orders', icon: FiList, path: '/orders' },
    { label: 'Billing', icon: FiCreditCard, path: '/billing' },
    { label: 'Menu', icon: FiList, path: '/menu' },
    { label: 'Settings', icon: FiSettings, path: '/settings' },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="hidden lg:flex lg:w-72 xl:w-80 shrink-0 flex-col gap-6 rounded-[32px] bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 backdrop-blur-xl transition dark:bg-slate-800/95 dark:ring-slate-700/70 dark:shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Wow Pizza</p>
                <h1 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-slate-100 transition">HUB POS</h1>
            </div>
            <nav className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`group flex w-full items-center gap-4 rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${active
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100'
                                }`}
                        >
                            <span
                                className={`grid h-10 w-10 place-items-center rounded-2xl border transition ${active ? 'border-white bg-white/10 text-white' : 'border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400 dark:group-hover:border-slate-600'
                                    }`}
                            >
                                <Icon size={18} />
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 transition dark:border-slate-700 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 transition">Counter Open</p>
                <p className="mt-3 text-sm font-semibold text-slate-950 dark:text-slate-100 transition">Shift: Evening · Counter 1</p>
                <div className="mt-4 rounded-2xl bg-orange-500/10 px-3 py-2 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 transition">
                    Live menu operations ready
                </div>
            </div>
        </aside>
    );
}
