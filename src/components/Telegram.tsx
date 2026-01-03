//src\components\Telegram.tsx
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Telegram = () => {
  return (
    <div className="bg-card rounded-lg p-4 card-shadow static top-6">
      <p className="text-foreground">
        Join our Telegram Channel to get the latest{" "}
        <span className="text-primary font-semibold">internship</span> and{" "}
        <span className="text-primary font-semibold">job</span> updates.
      </p>
      
      <Button 
        className="w-full mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-medium h-11 gap-2"
        onClick={() => window.open("https://telegram.com", "_blank")}
      >
        Join us on Telegram Channel
        <MessageCircle className="w-5 h-5" />
      </Button>
      
      <p className="text-xs text-muted-foreground mt-3">
        25,000+ members have already joined!
      </p>
    </div>
  );
};

export default Telegram;
