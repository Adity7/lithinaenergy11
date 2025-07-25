import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, TrendingUp, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Unified Insights",
    description: "Integrate structured and unstructured data from your manufacturing processes for holistic battery analysis. Break down silos and get a complete view of production, quality, and supply chain."
  },
  {
    icon: TrendingUp,
    title: "Proactive Insights",
    description: "Uncover trends, opportunities, and potential issues in battery performance. Get tailored recommendations to optimize manufacturing efficiency and reduce downtime."
  },
  {
    icon: Zap,
    title: "Seamless Integrations",
    description: "Connect with your existing tools: BI platforms, data warehouses, manufacturing software, and collaboration apps. Embed AI insights directly into your workflows."
  }
];

const technicalFeatures = [
  {
    title: "Text-to-Code Engine",
    description: "Translates natural language to precise queries for battery data."
  },
  {
    title: "AI Data Preparation",
    description: "Handles cleaning and structuring of manufacturing data."
  },
  {
    title: "Model Context Import",
    description: "Incorporates battery specs and production models."
  },
  {
    title: "Trust & Validation",
    description: "Ensures accurate, verifiable insights for enterprise use."
  }
];

export function Features() {
  return (
    <>
      {/* Main Features */}
      <section id="solutions" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-glow bg-gradient-card border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Power Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            The <span className="text-gradient">Power</span> Behind Every Insight
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Advanced AI architecture designed specifically for battery manufacturing intelligence
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicalFeatures.map((feature, index) => (
              <Card key={index} className="hover-glow bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}