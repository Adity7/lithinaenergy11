import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, BarChart3, Lightbulb } from "lucide-react";

const queryExamples = [
  "How's our top battery production line performing in each factory?",
  "Quarterly battery sales analysis playbook",
  "Show our Lithium-Ion model performance",
  "Analyze production efficiency by shift",
  "What's the defect rate for our latest batch?",
  "Forecast battery demand for next quarter",
  "Compare energy density across models",
  "Identify bottlenecks in manufacturing process",
];

export function QuerySection() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(`AI Insight: Based on your query "${query}", here's a sample analysis: Production is up 15% in Factory A, with defect rate at 2%. Visualize data in dashboard.`);
    setQuery('');
  };

  return (
    <section id="features" className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get <span className="text-gradient">Instant Answers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ask questions in plain English and get real-time insights on your battery production data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Query Examples */}
          <Card className="hover-glow bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Example Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ask questions in plain English and get real-time insights on your battery production data.
              </p>
              <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                {queryExamples.map((q, index) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted/80 cursor-pointer transition-smooth"
                    onClick={() => setQuery(q)}
                  >
                    <p className="text-sm text-foreground">{q}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Query */}
          <Card className="hover-glow bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-secondary" />
                Try It Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your battery data..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              
              {response && (
                <div className="mt-4 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <p className="text-sm text-foreground">{response}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}