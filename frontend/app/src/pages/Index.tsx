import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Battery, ArrowRight, Users, BarChart3, Shield, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Features } from "@/components/Features";
import { Enterprise } from "@/components/Enterprise";
import { Footer } from "@/components/Footer";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dashboard text-foreground">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <div className="py-20 bg-gradient-glass backdrop-blur-xl">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Premium Battery Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets unparalleled customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-card border-card-border hover:shadow-glow transition-all duration-500 group">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                  <Shield size={32} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Advanced Monitoring</h3>
                <p className="text-muted-foreground">
                  Real-time battery health, performance metrics, and predictive analytics 
                  to maximize your investment.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-card-border hover:shadow-glow transition-all duration-500 group">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                  <Zap size={32} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Premium Support</h3>
                <p className="text-muted-foreground">
                  24/7 technical support, maintenance scheduling, and warranty management 
                  for peace of mind.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 bg-gradient-card border-card-border hover:shadow-glow transition-all duration-500 group">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-xl bg-gradient-primary mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                  <Star size={32} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Enterprise Grade</h3>
                <p className="text-muted-foreground">
                  Industry-leading quality, safety standards, and performance 
                  trusted by Fortune 500 companies.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Ready to Experience Premium Battery Management?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers monitoring their battery systems 
              with our enterprise-grade dashboard.
            </p>
            
            <div className="flex justify-center space-x-6">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg shadow-glow hover:scale-105 transition-transform"
                onClick={() => navigate('/dashboard')}
              >
                Access Your Dashboard
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">10 Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">Premium Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-info" />
                <span className="text-sm text-muted-foreground">Real-time Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <Features />
      
      {/* Enterprise Section */}
      <Enterprise />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}