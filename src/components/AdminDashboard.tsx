import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Clock
} from 'lucide-react';

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    items: string[];
    total: number;
    status: string;
    time: string;
  }>;
  salesData: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

const MOCK_ANALYTICS: Analytics = {
  totalRevenue: 48750,
  totalOrders: 342,
  totalCustomers: 156,
  avgOrderValue: 142.5,
  recentOrders: [
    {
      id: "ORD-001",
      customerName: "John Smith",
      items: ["Beef Tenderloin", "Caesar Salad"],
      total: 66,
      status: "completed",
      time: "2 minutes ago"
    },
    {
      id: "ORD-002",
      customerName: "Sarah Johnson",
      items: ["Lobster Thermidor", "Chocolate Soufflé"],
      total: 81,
      status: "preparing",
      time: "8 minutes ago"
    },
    {
      id: "ORD-003",
      customerName: "Mike Davis",
      items: ["Grilled Salmon"],
      total: 32,
      status: "completed",
      time: "15 minutes ago"
    },
    {
      id: "ORD-004",
      customerName: "Emma Wilson",
      items: ["Beef Tenderloin", "Grilled Salmon", "Caesar Salad"],
      total: 98,
      status: "pending",
      time: "22 minutes ago"
    }
  ],
  salesData: [
    { date: "Mon", revenue: 1250, orders: 28 },
    { date: "Tue", revenue: 1450, orders: 32 },
    { date: "Wed", revenue: 1680, orders: 38 },
    { date: "Thu", revenue: 1890, orders: 42 },
    { date: "Fri", revenue: 2340, orders: 52 },
    { date: "Sat", revenue: 2890, orders: 64 },
    { date: "Sun", revenue: 2250, orders: 48 }
  ]
};

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAnalytics(MOCK_ANALYTICS);
      } catch (err) {
        setError('Could not load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded mb-4" />
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
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

  if (!analytics) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your restaurant.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-12 w-12 text-primary bg-primary/10 rounded-lg p-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-12 w-12 text-accent bg-accent/10 rounded-lg p-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">{analytics.totalOrders}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-12 w-12 text-blue-600 bg-blue-100 rounded-lg p-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <h3 className="text-2xl font-bold">{analytics.totalCustomers}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-12 w-12 text-green-600 bg-green-100 rounded-lg p-3" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <h3 className="text-2xl font-bold">${analytics.avgOrderValue}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{order.customerName}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {order.items.join(', ')}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{order.time}</span>
                      <span className="font-semibold">${order.total}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Weekly Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.salesData.map((day) => (
                <div key={day.date} className="flex items-center justify-between">
                  <span className="font-medium">{day.date}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{day.orders} orders</span>
                    <span className="font-semibold">${day.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};