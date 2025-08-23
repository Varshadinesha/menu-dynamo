import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Award } from 'lucide-react';
import { HotelDescription } from '@/components/HotelDescription';
import { FeedbackSection } from '@/components/FeedbackSection';
import heroImage from '@/assets/hero-restaurant.jpg';
import dishSalmon from '@/assets/dish-salmon.jpg';
import dishBeef from '@/assets/dish-beef.jpg';
import dishLobster from '@/assets/dish-lobster.jpg';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (dish: any) => void;
}

const featuredDishes = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herb crust and seasonal vegetables",
    price: 32,
    image: dishSalmon,
    rating: 4.9
  },
  {
    id: 2,
    name: "Beef Tenderloin",
    description: "Premium beef tenderloin with truffle sauce and roasted vegetables",
    price: 48,
    image: dishBeef,
    rating: 4.8
  },
  {
    id: 3,
    name: "Lobster Thermidor",
    description: "Classic French lobster dish with rich cream sauce",
    price: 65,
    image: dishLobster,
    rating: 5.0
  }
];

export const HomePage = ({ onNavigate, onAddToCart }: HomePageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Exquisite Dining
            <span className="block text-primary">Experience</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover culinary excellence in the heart of luxury
          </p>
          <div className="space-x-4">
            <Button variant="hero" size="lg" onClick={() => onNavigate('menu')}>
              View Menu
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Reservations
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Award Winning</h3>
              <p className="text-muted-foreground">Michelin starred cuisine crafted by world-class chefs</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fresh Daily</h3>
              <p className="text-muted-foreground">Ingredients sourced fresh daily from local markets</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">Committed to providing an unforgettable dining experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-xl text-muted-foreground">Taste our chef's signature creations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{dish.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground mb-4">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${dish.price}</span>
                    <Button onClick={() => onAddToCart(dish)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => onNavigate('menu')}>
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Hotel Description */}
      <HotelDescription />

      {/* Feedback Section */}
      <FeedbackSection />
    </div>
  );
};