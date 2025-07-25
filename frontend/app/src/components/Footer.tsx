import { Battery, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Battery className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Battery Insights</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              We are pushing state of the art AI technology to combine machine intelligence with 
              robust & reliable systems for solving battery manufacturing challenges in ways 
              no one has ever imagined.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Battery Analytics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Production Insights</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Quality Monitor</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Enterprise Suite</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Manufacturing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Quality Control</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Supply Chain</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">Predictive Maintenance</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Battery Insights. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-smooth">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-smooth">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}