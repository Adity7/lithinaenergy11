import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Zap, CheckCircle } from "lucide-react";

const enterpriseFeatures = [
  "Enterprise-grade security with granular access controls",
  "SOC 2 Type II compliant infrastructure",
  "Advanced compliance and governance tools",
  "Embeddable AI for seamless dashboard integration",
  "24/7 dedicated support and monitoring",
  "Custom deployment options (cloud, on-premise, hybrid)"
];

export function Enterprise() {
  return (
    <section id="enterprise" className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Engineered for <span className="text-gradient">Battery Manufacturing</span> Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Enterprise-grade security with granular access controls, compliance, and governance. 
            Embeddable AI for seamless integration into your manufacturing dashboards and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Security */}
          <Card className="hover-glow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-level security with end-to-end encryption, SSO integration, and comprehensive audit trails.
              </p>
            </CardContent>
          </Card>

          {/* Scalability */}
          <Card className="hover-glow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Scale with Confidence</h3>
              <p className="text-muted-foreground">
                Support thousands of concurrent users across multiple facilities with auto-scaling infrastructure.
              </p>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card className="hover-glow bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Sub-second query responses with optimized data processing and intelligent caching.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature List */}
        <Card className="hover-glow bg-card/50 backdrop-blur-sm mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Everything you need for production deployment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="glow-secondary">
            Get Started Today
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Ready to deploy? Contact our enterprise team for a custom demo.
          </p>
        </div>
      </div>
    </section>
  );
}