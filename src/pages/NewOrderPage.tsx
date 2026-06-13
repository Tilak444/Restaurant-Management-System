import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import NewOrderForm from '../components/NewOrderForm';
import CategoryFilter from '../components/CategoryFilterButton';
import MenuItemCard from '../components/MenuItemCard';
import OrderCart from '../components/OrderCart';
import { initialMenuItems, categories } from '../data/menuData';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
    available: boolean;
}

interface CartItem extends MenuItem {
    quantity: number;
}

export default function NewOrderPage() {
    const [searchTerm, setSearchTerm] = useState('');
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
    const [activeCategory, setActiveCategory] = useState('All');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderDetails, setOrderDetails] = useState({
        customerName: '',
        tableNumber: 10,
        kitchenNotes: '',
    });

    const filteredItems = useMemo(() => {
        return initialMenuItems.filter((item) => {
            const matchesCategory =
                activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchTerm]);

    const handleAddItem = (item: MenuItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prev, { ...item, quantity: 1 } as CartItem];
        });
    };

    const handleRemoveItem = (id: number) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                return prev.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prev.filter((item) => item.id !== id);
        });
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity === 0) {
            setCartItems((prev) => prev.filter((item) => item.id !== id));
        } else {
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    }, [isDarkMode]);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 transition">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar */}
                    <Topbar
                        searchTerm={searchTerm}
                        onSearch={setSearchTerm}
                        isDarkMode={isDarkMode}
                        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                    />

                    {/* Content Area */}
                    <div className="flex-1 overflow-auto">
                        <div className="max-w-[1640px] mx-auto px-4 py-6 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Left Section - Menu & Order Form */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Order Form */}
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                                        <NewOrderForm onOrderChange={setOrderDetails} />
                                    </div>

                                    {/* Menu Section */}
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                                        {/* Category Filter */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                                Menu Items
                                            </h3>
                                            <CategoryFilter
                                                categories={categories}
                                                activeCategory={activeCategory}
                                                onCategoryChange={setActiveCategory}
                                            />
                                        </div>

                                        {/* Menu Grid */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {filteredItems.map((item) => {
                                                const cartItem = cartItems.find(
                                                    (ci) => ci.id === item.id
                                                );
                                                return (
                                                    <MenuItemCard
                                                        key={item.id}
                                                        item={item}
                                                        quantity={cartItem?.quantity || 0}
                                                        onAddItem={handleAddItem}
                                                        onRemoveItem={handleRemoveItem}
                                                    />
                                                );
                                            })}
                                        </div>

                                        {filteredItems.length === 0 && (
                                            <div className="text-center py-12">
                                                <p className="text-slate-500 dark:text-slate-400">
                                                    No items found
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Section - Order Cart */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-24">
                                        <OrderCart
                                            items={cartItems}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onRemoveItem={handleRemoveFromCart}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
