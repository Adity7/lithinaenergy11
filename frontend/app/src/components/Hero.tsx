import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-dark overflow-hidden pt-16">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <div className="animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-foreground">ASK MORE FROM YOUR </span>
            <span className="text-gradient">BATTERIES</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
            Insights at your fingertips with AI-powered analytics for battery manufacturing. 
            Transform production data into actionable intelligence.
          </p>

          <div className="text-sm text-muted-foreground mb-12 uppercase tracking-widest">
            for PRODUCTION, QUALITY and OPTIMIZATION
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-300">
          <Button 
            size="lg" 
            className="glow-primary group"
            onClick={() => navigate('/dashboard')}
          >
            <Users className="mr-2 h-5 w-5" />
            Customer Dashboard
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => navigate('/insights')}
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Battery Insights
          </Button>
        </div>

        {/* Stats or badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in delay-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">Production Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50ms</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}