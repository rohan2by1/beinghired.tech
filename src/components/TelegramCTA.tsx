//src\components\TelegramCTA.tsx
import { Button } from "@/components/ui/button";
import { RiTelegramFill } from "react-icons/ri";
const TelegramCTA = () => {
  return (
    <div className="bg-card rounded-lg p-4 card-shadow static top-6">
      <p className="text-foreground">
        Join our Telegram Channel to get the latest{" "}
        <span className="text-primary font-semibold">internship</span> and{" "}
        <span className="text-primary font-semibold">job</span> updates.
      </p>



      <Button
        className="w-full mt-4 bg-[#0088cc] hover:bg-[#0088cc]/90 text-white font-medium h-11 gap-2"
        onClick={() => window.open("https://t.me/beinghired", "_blank")}
      >
        Join us on Telegram Channel
        <RiTelegramFill className="w-5 h-5" />
      </Button>



      <p className="text-xs text-muted-foreground mt-3">
        1,000+ members have already joined!
      </p>
    </div>
  );
};

export default TelegramCTA;
