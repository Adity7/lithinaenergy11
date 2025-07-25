import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { 
  Battery, Shield, Zap, Thermometer, Clock, Award, 
  TrendingUp, AlertTriangle, CheckCircle, Settings, 
  Phone, MessageCircle, Calendar, Download, Star,
  ChevronRight, Activity, Gauge, Cpu, Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

// Mock customer data - replace with actual API calls
const mockCustomerData = {
  user: {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    tier: "Premium",
    joinDate: "2023-03-15"
  },
  batteries: [
    {
      id: "BAT-2024-001",
      model: "PowerCore Pro X1",
      type: "Lithium-Ion",
      capacity: "100 kWh",
      purchaseDate: "2024-01-15",
      warrantyExpires: "2034-01-15",
      status: "Excellent",
      location: "Home Solar System",
      currentSoC: 87,
      health: 98,
      cycles: 143,
      lastCharge: "2024-01-18T14:30:00Z",
      estimatedLifespan: "15+ years"
    },
    {
      id: "BAT-2024-002", 
      model: "PowerCore Compact",
      type: "LiFePO4",
      capacity: "50 kWh",
      purchaseDate: "2024-02-20",
      warrantyExpires: "2034-02-20",
      status: "Good",
      location: "Backup System",
      currentSoC: 45,
      health: 96,
      cycles: 67,
      lastCharge: "2024-01-17T09:15:00Z",
      estimatedLifespan: "12+ years"
    }
  ]
};

// Generate mock historical data
const generateHistoricalData = (batteryId: string, days: number = 30) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      soc: Math.max(20, Math.min(100, 85 + Math.sin(i * 0.3) * 15 + Math.random() * 10)),
      temperature: 22 + Math.sin(i * 0.2) * 8 + Math.random() * 3,
      voltage: 24.5 + Math.sin(i * 0.1) * 2 + Math.random() * 0.5,
      power: Math.max(0, 2.5 + Math.sin(i * 0.4) * 2 + Math.random() * 1),
      efficiency: 92 + Math.sin(i * 0.15) * 5 + Math.random() * 2
    };
  });
};

const StatCard = ({ title, value, icon: Icon, subtitle = "", trend = null, color = "primary" }) => (
  <Card className="relative p-6 bg-gradient-card border-card-border overflow-hidden group hover:shadow-glow transition-all duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1 font-medium">{title}</p>
          <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp size={14} className="text-success mr-1" />
              <span className="text-sm text-success font-medium">+{trend}%</span>
              <span className="text-xs text-muted-foreground ml-1">this week</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition-transform duration-300">
          <Icon size={20} className="text-primary-foreground" />
        </div>
      </div>
    </div>
  </Card>
);

const BatteryCard = ({ battery, isSelected, onClick }) => {
  const statusColor = battery.health >= 95 ? 'default' : battery.health >= 85 ? 'secondary' : 'destructive';
  
  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-glow ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">{battery.model}</h3>
          <p className="text-sm text-muted-foreground">ID: {battery.id}</p>
          <p className="text-sm text-muted-foreground">Name: {battery.name}</p>
        </div>
        <Badge variant={statusColor} className="text-xs">
          {battery.status}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">State of Charge</span>
            <span className="font-medium">{battery.currentSoC}%</span>
          </div>
          <Progress value={battery.currentSoC} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Battery Health</span>
            <span className="font-medium text-success">{battery.health}%</span>
          </div>
          <Progress value={battery.health} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Capacity</p>
            <p className="font-medium">{battery.capacity}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cycles</p>
            <p className="font-medium">{battery.cycles.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Serial Number</p>
            <p className="font-medium">{battery.serial_number}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rated Voltage</p>
            <p className="font-medium">{battery.rated_voltage}V</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Created: {new Date(battery.created_at).toLocaleDateString()}
        </span>
        <ChevronRight size={16} className="text-muted-foreground" />
      </div>
    </Card>
  );
};

export default function CustomerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [timeRange, setTimeRange] = useState("30d");
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle OAuth callback from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authSuccess = urlParams.get('auth_success');
    
    if (authSuccess === 'true') {
      // Extract user data from URL parameters
      const userData = {
        id: parseInt(urlParams.get('id') || '0'),
        username: urlParams.get('username') || '',
        email: urlParams.get('email') || '',
        first_name: urlParams.get('first_name') || '',
        last_name: urlParams.get('last_name') || '',
        full_name: urlParams.get('full_name') || '',
        picture: urlParams.get('picture') || ''
      };
      
      // Set user in auth context
      login(userData);
      toast.success('Successfully logged in!');
      
      // Clean up URL parameters
      navigate('/dashboard', { replace: true });
    }
  }, [location.search, login, navigate]);

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard/', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
          if (data.batteries && data.batteries.length > 0) {
            setSelectedBattery(data.batteries[0]);
          }
        } else {
          console.error('Failed to fetch dashboard data');
          toast.error('Failed to load dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Error loading dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Fetch historical data for selected battery
  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!selectedBattery) return;
      
      try {
        const days = timeRange === "7d" ? 7 : 30;
        const response = await fetch(`http://localhost:8000/api/battery/${selectedBattery.id}/metrics/?days=${days}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setHistoricalData(data);
        } else {
          console.error('Failed to fetch historical data');
        }
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [selectedBattery, timeRange]);

  const performanceData = useMemo(() => {
    if (!selectedBattery) return [];
    
    return [
      { subject: 'Efficiency', value: 94, max: 100 },
      { subject: 'Health', value: selectedBattery.health, max: 100 },
      { subject: 'Temperature', value: 75, max: 100 },
      { subject: 'Voltage', value: 88, max: 100 },
      { subject: 'Charge Rate', value: 91, max: 100 },
      { subject: 'Discharge Rate', value: 87, max: 100 }
    ];
  }, [selectedBattery]);

  // Use raw data from models
  const stats = {
    totalBatteries: dashboardData?.batteries?.length || 0,
    totalCapacity: dashboardData?.batteries?.reduce((sum, b) => sum + parseFloat(b.capacity), 0) || 0,
    avgHealth: dashboardData?.batteries?.reduce((sum, b) => sum + b.health, 0) / (dashboardData?.batteries?.length || 1) || 0,
    totalCycles: dashboardData?.batteries?.reduce((sum, b) => sum + b.cycles, 0) || 0,
    activeAlerts: dashboardData?.alerts?.filter(a => a.status === 'Active').length || 0
  };

  const batteries = dashboardData?.batteries || [];
  
  // Use user data from OAuth callback if available
  const userData = dashboardData?.user || user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
            <Battery size={32} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              My Batteries
            </h1>
            <p className="text-muted-foreground">Welcome back, {userData?.full_name || userData?.name || 'User'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-xs font-medium">
            <Star size={12} className="mr-1" />
            {userData?.tier || 'Premium'} Member
          </Badge>
          <Button variant="outline" size="sm">
            <Settings size={16} className="mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Capacity"
          value={`${stats.totalCapacity} kWh`}
          icon={Zap}
          subtitle="Raw capacity from models"
        />
        <StatCard
          title="Average Health"
          value={`${stats.avgHealth.toFixed(1)}%`}
          icon={Shield}
          subtitle="Calculated from raw data"
        />
        <StatCard
          title="Total Cycles"
          value={stats.totalCycles.toLocaleString()}
          icon={Activity}
          subtitle="Raw cycle count"
        />
        <StatCard
          title="Active Alerts"
          value={stats.activeAlerts}
          icon={Award}
          subtitle="Raw alert count"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Battery Selection */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Battery size={20} className="mr-2 text-primary" />
              Your Batteries
            </h2>
            <div className="space-y-4">
              {batteries.map((battery) => (
                <BatteryCard
                  key={battery.id}
                  battery={battery}
                  isSelected={selectedBattery?.id === battery.id}
                  onClick={() => setSelectedBattery(battery)}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Settings size={18} className="mr-2 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar size={16} className="mr-2" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download size={16} className="mr-2" />
                Download Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle size={16} className="mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Phone size={16} className="mr-2" />
                Emergency Support
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Detailed Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {selectedBattery ? (
            <>
              {/* Battery Details Header */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                                <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedBattery.model}</h2>
                <p className="text-muted-foreground">Serial: {selectedBattery.serial_number}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Created: {new Date(selectedBattery.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  ID: {selectedBattery.id} | Name: {selectedBattery.name}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent">
                <Gauge size={24} className="text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.currentSoC}%</p>
                <p className="text-sm text-muted-foreground">State of Charge</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-success/10 to-transparent">
                <Shield size={24} className="text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.health}%</p>
                <p className="text-sm text-muted-foreground">Battery Health</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-info/10 to-transparent">
                <Clock size={24} className="text-info mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.rated_capacity} kWh</p>
                <p className="text-sm text-muted-foreground">Rated Capacity</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-warning/10 to-transparent">
                <Zap size={24} className="text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.rated_voltage}V</p>
                <p className="text-sm text-muted-foreground">Rated Voltage</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple/10 to-transparent">
                <Activity size={24} className="text-purple mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.cycles}</p>
                <p className="text-sm text-muted-foreground">Cycles</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-cyan/10 to-transparent">
                <Thermometer size={24} className="text-cyan mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{selectedBattery.temperature}°C</p>
                <p className="text-sm text-muted-foreground">Temperature</p>
              </div>
            </div>
          </Card>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Activity size={18} className="mr-2 text-primary" />
                Performance Overview
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={performanceData}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" className="text-xs" />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={false}
                  />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Thermometer size={18} className="mr-2 text-primary" />
                Temperature Trend
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="hsl(var(--warning))"
                    fill="hsl(var(--warning))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* State of Charge History */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Zap size={18} className="mr-2 text-primary" />
              State of Charge History
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="soc"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Raw Alerts Data */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <AlertTriangle size={18} className="mr-2 text-primary" />
              Raw Alerts Data
            </h3>
            <div className="space-y-3">
              {dashboardData?.alerts?.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">
                        Battery: {alert.battery} | {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={alert.status === 'Active' ? 'destructive' : 'secondary'}>
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              )) || (
                <p className="text-muted-foreground">No alerts data available</p>
              )}
            </div>
          </Card>
          
          {/* Raw Battery Data */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center">
              <Database size={18} className="mr-2 text-primary" />
              Raw Battery Data
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Database ID</p>
                  <p className="font-medium">{selectedBattery.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Serial Number</p>
                  <p className="font-medium">{selectedBattery.serial_number}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rated Capacity</p>
                  <p className="font-medium">{selectedBattery.rated_capacity} kWh</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rated Voltage</p>
                  <p className="font-medium">{selectedBattery.rated_voltage} V</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created At</p>
                  <p className="font-medium">{new Date(selectedBattery.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">User ID</p>
                  <p className="font-medium">{selectedBattery.user}</p>
                </div>
              </div>
            </div>
          </Card>
            </>
          ) : (
            <Card className="p-6">
              <div className="text-center">
                <p className="text-muted-foreground">Select a battery to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}