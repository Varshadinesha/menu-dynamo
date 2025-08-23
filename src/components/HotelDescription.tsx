import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Wifi, Car, Utensils, Dumbbell, Coffee } from 'lucide-react';

interface HotelDescriptionProps {
  className?: string;
}

const amenities = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Car, label: 'Valet Parking' },
  { icon: Utensils, label: 'Fine Dining' },
  { icon: Dumbbell, label: 'Fitness Center' },
  { icon: Coffee, label: '24/7 Room Service' }
];

const awards = [
  "Michelin Star Restaurant 2024",
  "Forbes 5-Star Hotel",
  "World's Best Hotel Restaurant",
  "AAA Five Diamond Award"
];

export const HotelDescription = ({ className }: HotelDescriptionProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hotel Description */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-4">Est. 1892</Badge>
              <h2 className="text-4xl font-bold mb-4">The Grand Palazzo Hotel</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A timeless sanctuary of luxury and elegance in the heart of the city, where culinary artistry meets unparalleled hospitality.
              </p>
            </div>

            <div className="prose prose-lg text-muted-foreground">
              <p>
                For over a century, The Grand Palazzo has been the epitome of refined dining and luxury accommodation. Our award-winning restaurant showcases the finest in contemporary cuisine, crafted by our team of world-renowned chefs who source only the freshest, premium ingredients from local artisans and international markets.
              </p>
              <p>
                Every dish tells a story of passion, creativity, and tradition, presented in an atmosphere of sophistication and warmth that has welcomed distinguished guests from around the world.
              </p>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Luxury Avenue, Metropolitan City</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>Open Daily: 6:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Features & Amenities */}
          <div className="space-y-8">
            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Premium Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <amenity.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Awards & Recognition */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Awards & Recognition</h3>
                <div className="space-y-3">
                  {awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">130+</div>
                  <div className="text-sm text-muted-foreground">Years of Excellence</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">50k+</div>
                  <div className="text-sm text-muted-foreground">Happy Guests</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">25+</div>
                  <div className="text-sm text-muted-foreground">Awards Won</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};