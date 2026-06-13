// ─── POS Context ──────────────────────────────────────────────────────────────
import { createContext, useContext, useState, useCallback } from 'react';
import { ordersData } from '../data/ordersData';
import { defaultSettings } from '../data/settingsData';
import { initialMenuData, getNextId } from '../data/menuManagementData';

const PosContext = createContext(null);

export function PosProvider({ children }) {
  // ── Core state ──────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState(ordersData);
  const [settings, setSettings] = useState(defaultSettings);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);

  // ── Menu Management state ───────────────────────────────────────────────────
  const [menuItems, setMenuItems] = useState(initialMenuData);

  const addMenuItem = useCallback((item) => {
    setMenuItems((prev) => [
      ...prev,
      { ...item, id: getNextId() },
    ]);
  }, []);

  const deleteMenuItem = useCallback((id) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const updateMenuItemPrice = useCallback((id, price) => {
    setMenuItems((prev) =>
      prev.map((m) => m.id === id ? { ...m, price: Number(price) } : m)
    );
  }, []);

  const toggleMenuItemAvailability = useCallback((id) => {
    setMenuItems((prev) =>
      prev.map((m) => m.id === id ? { ...m, available: !m.available } : m)
    );
  }, []);

  const updateMenuItem = useCallback((id, updates) => {
    setMenuItems((prev) =>
      prev.map((m) => m.id === id ? { ...m, ...updates } : m)
    );
  }, []);

  // ── Cart state ──────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState([]);
  const [cartCustomer, setCartCustomer] = useState('');
  const [cartTable, setCartTable]       = useState('');
  const [cartNotes, setCartNotes]       = useState('');
  const [cartPayMethod, setCartPayMethod] = useState('Cash');
  const [activeTab, setActiveTab]       = useState('cart');
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const incrementQty = useCallback((id) => {
    setCartItems((prev) =>
      prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c)
    );
  }, []);

  const decrementQty = useCallback((id) => {
    setCartItems((prev) => {
      const item = prev.find((c) => c.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartCustomer('');
    setCartTable('');
    setCartNotes('');
    setCartPayMethod('Cash');
    setActiveTab('cart');
  }, []);

  const getItemQty = useCallback((id) => {
    const item = cartItems.find((c) => c.id === id);
    return item ? item.qty : 0;
  }, [cartItems]);

  // ── Order totals ────────────────────────────────────────────────────────────
  const cartSubtotal = cartItems.reduce((sum, c) => sum + c.price * c.qty, 0);
  const cartTaxRate  = settings.restaurant.taxRate / 100;
  const cartTax      = cartSubtotal * cartTaxRate;
  const cartTotal    = cartSubtotal + cartTax;
  const cartCount    = cartItems.reduce((sum, c) => sum + c.qty, 0);

  // ── Complete order ──────────────────────────────────────────────────────────
  const completeOrder = useCallback(() => {
    if (cartItems.length === 0) return;
    const newOrder = {
      id: `#ORD-${1025 + orders.length}`,
      customer: cartCustomer || 'Walk-in Customer',
      table: cartTable || 'Takeaway',
      status: 'Pending',
      paymentStatus: cartPayMethod !== 'Cash' ? 'Paid' : 'Unpaid',
      paymentMethod: cartPayMethod,
      amount: cartTotal,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      notes: cartNotes,
      items: cartItems.map((c) => ({ name: c.name, qty: c.qty, price: c.price })),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  }, [cartItems, cartCustomer, cartTable, cartNotes, cartPayMethod, cartTotal, orders.length, clearCart]);

  // ── Order actions ───────────────────────────────────────────────────────────
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  }, []);

  const updatePaymentStatus = useCallback((orderId, method) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, paymentStatus: 'Paid', paymentMethod: method }
          : o
      )
    );
  }, []);

  const updateSettings = useCallback((section, values) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...values },
    }));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);

  const value = {
    // Core
    orders,
    settings,
    sidebarOpen,
    activeOrder,
    setActiveOrder,
    updateOrderStatus,
    updatePaymentStatus,
    updateSettings,
    toggleSidebar,
    // Menu management
    menuItems,
    addMenuItem,
    deleteMenuItem,
    updateMenuItemPrice,
    toggleMenuItemAvailability,
    updateMenuItem,
    // Cart
    cartItems,
    cartCustomer, setCartCustomer,
    cartTable,    setCartTable,
    cartNotes,    setCartNotes,
    cartPayMethod, setCartPayMethod,
    activeTab,    setActiveTab,
    cartDrawerOpen, setCartDrawerOpen,
    addToCart,
    removeFromCart,
    incrementQty,
    decrementQty,
    clearCart,
    getItemQty,
    cartSubtotal,
    cartTax,
    cartTotal,
    cartTaxRate,
    cartCount,
    completeOrder,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}

export function usePOS() {
  const ctx = useContext(PosContext);
  if (!ctx) throw new Error('usePOS must be used within PosProvider');
  return ctx;
}
