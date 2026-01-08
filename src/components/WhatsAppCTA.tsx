//src\components\WhatsAppCTA.tsx
import { RiWhatsappFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";

const WhatsAppCTA = () => {
  return (
    <div className="bg-card rounded-lg p-4 card-shadow static top-6">
      <p className="text-foreground">
        Join our WhatsApp Channel to get the latest{" "}
        <span className="text-primary font-semibold">internship</span> and{" "}
        <span className="text-primary font-semibold">job</span> updates.
      </p>



      <Button
        className="w-full mt-4 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-medium h-11 gap-2"
        onClick={() => window.open("https://whatsapp.com/channel/0029Vb78Bt31SWswoR72SU18", "_blank")}
      >
        Join us on WhatsApp Channel
        <RiWhatsappFill className="w-5 h-5" />
      </Button>


      <p className="text-xs text-muted-foreground mt-3">
        1,000+ members have already joined!
      </p>
    </div>
  );
};

export default WhatsAppCTA;
