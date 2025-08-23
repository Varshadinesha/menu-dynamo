import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Header } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { MenuPage } from '@/components/MenuPage';
import { CartPage } from '@/components/CartPage';
import { LoginPage } from '@/components/LoginPage';
import { AdminDashboard } from '@/components/AdminDashboard';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAddToCart = (dish: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === dish.id);
      if (existingItem) {
        toast.success(`${dish.name} quantity updated!`);
        return prev.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${dish.name} added to cart!`);
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials
    if (email === 'admin@restaurant.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setCurrentPage('dashboard');
      toast.success('Welcome back, Admin!');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
    toast.success('Logged out successfully');
  };

  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !isAdminLoggedIn) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
      case 'menu':
        return <MenuPage onAddToCart={handleAddToCart} />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        );
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return isAdminLoggedIn ? <AdminDashboard /> : <LoginPage onLogin={handleLogin} />;
      default:
        return <HomePage onNavigate={handleNavigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
      <Header
        cartItemCount={cartItemCount}
        isAdminLoggedIn={isAdminLoggedIn}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
};

export default Index;
