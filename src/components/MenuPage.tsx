import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, Plus } from 'lucide-react';
import dishSalmon from '@/assets/dish-salmon.jpg';
import dishBeef from '@/assets/dish-beef.jpg';
import dishLobster from '@/assets/dish-lobster.jpg';

interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  ingredients: string[];
}

interface MenuPageProps {
  onAddToCart: (dish: Dish) => void;
}

// Mock data - will be replaced with API call
const MOCK_DISHES: Dish[] = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herb crust and seasonal vegetables",
    price: 32,
    category: "Main Course",
    image: dishSalmon,
    rating: 4.9,
    ingredients: ["Atlantic Salmon", "Fresh Herbs", "Seasonal Vegetables", "Lemon"]
  },
  {
    id: 2,
    name: "Beef Tenderloin",
    description: "Premium beef tenderloin with truffle sauce and roasted vegetables",
    price: 48,
    category: "Main Course",
    image: dishBeef,
    rating: 4.8,
    ingredients: ["Beef Tenderloin", "Truffle Sauce", "Roasted Vegetables", "Red Wine Jus"]
  },
  {
    id: 3,
    name: "Lobster Thermidor",
    description: "Classic French lobster dish with rich cream sauce",
    price: 65,
    category: "Signature",
    image: dishLobster,
    rating: 5.0,
    ingredients: ["Fresh Lobster", "Cream Sauce", "Gruyere Cheese", "Fresh Herbs"]
  },
  {
    id: 4,
    name: "Caesar Salad",
    description: "Classic Caesar salad with homemade croutons and parmesan",
    price: 18,
    category: "Appetizer",
    image: dishSalmon,
    rating: 4.5,
    ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"]
  },
  {
    id: 5,
    name: "Chocolate Soufflé",
    description: "Decadent dark chocolate soufflé with vanilla ice cream",
    price: 16,
    category: "Dessert",
    image: dishBeef,
    rating: 4.7,
    ingredients: ["Dark Chocolate", "Eggs", "Vanilla Ice Cream", "Fresh Berries"]
  }
];

export const MenuPage = ({ onAddToCart }: MenuPageProps) => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const categories = ['All', ...new Set(MOCK_DISHES.map(dish => dish.category))];

  useEffect(() => {
    // Simulate API call
    const fetchDishes = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDishes(MOCK_DISHES);
      } catch (err) {
        setError('Could not load the menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const filteredDishes = selectedCategory === 'All' 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-xl text-muted-foreground">Discover our culinary masterpieces</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDishes.map((dish) => (
          <Card key={dish.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
            <div className="relative cursor-pointer" onClick={() => setSelectedDish(dish)}>
              <img 
                src={dish.image} 
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{dish.rating}</span>
              </div>
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {dish.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{dish.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${dish.price}</span>
                <Button onClick={() => onAddToCart(dish)} className="space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dish Detail Modal */}
      <Dialog open={!!selectedDish} onOpenChange={() => setSelectedDish(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDish && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedDish.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img 
                  src={selectedDish.image} 
                  alt={selectedDish.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-medium">{selectedDish.rating}/5</span>
                    <Badge>{selectedDish.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedDish.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDish.ingredients.map((ingredient, index) => (
                        <Badge key={index} variant="outline">{ingredient}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">${selectedDish.price}</span>
                    <Button onClick={() => { onAddToCart(selectedDish); setSelectedDish(null); }}>
                      Add to Cart - ${selectedDish.price}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};