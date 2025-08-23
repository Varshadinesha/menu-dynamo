import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, LogOut, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  isAdminLoggedIn: boolean;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Header = ({ cartItemCount, isAdminLoggedIn, onNavigate, onLogout }: HeaderProps) => {
  return (
    <header className="bg-card shadow-elegant border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-bold text-primary cursor-pointer hover:text-primary-glow transition-colors duration-300"
              onClick={() => onNavigate('home')}
            >
              Le Grand Restaurant
            </h1>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('menu')} 
                className="text-foreground hover:text-primary transition-colors duration-300"
              >
                Menu
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              Cart
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
            
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => onNavigate('dashboard')}>
                  <User className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button variant="ghost" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default" onClick={() => onNavigate('login')}>
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};