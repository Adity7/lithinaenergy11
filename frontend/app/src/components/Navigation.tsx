import { Button } from "@/components/ui/button";
import { Battery, Menu, Users, BarChart3 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  showAuthButtons?: boolean;
}

export function Navigation({ showAuthButtons = true }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show auth buttons on insights page
  const shouldShowAuthButtons = showAuthButtons && location.pathname !== '/insights';
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Battery className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">PowerTech Industries</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/insights')}
              className="text-muted-foreground hover:text-foreground transition-smooth flex items-center space-x-1"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Shop</span>
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground transition-smooth flex items-center space-x-1"
            >
              <Users className="h-4 w-4" />
              <span>Dashboard</span>
            </button>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">
              Features
            </a>
            <a href="#enterprise" className="text-muted-foreground hover:text-foreground transition-smooth">
              Enterprise
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            {shouldShowAuthButtons && (
              <>
                            <Button 
              variant="ghost" 
              className="hidden sm:inline-flex"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
                <Button 
                  className="glow-primary"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}