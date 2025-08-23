import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Send, User } from 'lucide-react';

interface FeedbackSectionProps {
  className?: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const existingReviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely incredible dining experience! The service was impeccable and every dish was a masterpiece. The ambiance is perfect for special occasions.",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "Outstanding food quality and presentation. The chef's attention to detail is remarkable. Highly recommend the tasting menu!",
    date: "2024-01-12"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 4,
    comment: "Beautiful restaurant with excellent food. The wine selection is superb. Will definitely return for another special dinner.",
    date: "2024-01-10"
  }
];

export const FeedbackSection = ({ className }: FeedbackSectionProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !name || !comment) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setRating(0);
    setName('');
    setEmail('');
    setComment('');
    setIsSubmitting(false);
    
    // In a real app, you'd show a success toast here
    alert('Thank you for your feedback!');
  };

  const renderStars = (count: number, interactive = false) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      const isActive = interactive 
        ? (hoveredRating || rating) >= starValue 
        : count >= starValue;
      
      return (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
            isActive 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 hover:text-yellow-400'
          }`}
          onClick={interactive ? () => handleStarClick(starValue) : undefined}
          onMouseEnter={interactive ? () => handleStarHover(starValue) : undefined}
          onMouseLeave={interactive ? handleStarLeave : undefined}
        />
      );
    });
  };

  const averageRating = existingReviews.reduce((sum, review) => sum + review.rating, 0) / existingReviews.length;

  return (
    <section className={`py-16 bg-secondary ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Guest Reviews & Feedback</h2>
          <p className="text-xl text-muted-foreground">Share your dining experience with us</p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="flex items-center">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({existingReviews.length} reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Leave a Review Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Leave a Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Your Rating</Label>
                  <div className="flex items-center space-x-1 mt-2">
                    {renderStars(rating, true)}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="comment">Your Review *</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your dining experience..."
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!rating || !name || !comment || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Reviews */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Recent Reviews</h3>
            {existingReviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-center">
              <Button variant="outline">View All Reviews</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
