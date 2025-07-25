import { Navigation } from "@/components/Navigation";
import { QuerySection } from "@/components/QuerySection";

const Insights = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <Navigation />
      <div className="pt-16">
        <QuerySection />
      </div>
    </div>
  );
};

export default Insights; 