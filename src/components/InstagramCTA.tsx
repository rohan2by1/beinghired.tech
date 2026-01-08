//src\components\InstagramCTA.tsx
import { Button } from "@/components/ui/button";
import { RiInstagramFill } from "react-icons/ri";
const InstagramCTA = () => {
    return (
        <div className="bg-card rounded-lg p-4 card-shadow static top-6">
            <p className="text-foreground">
                Follow our Instagram to get the latest{" "}
                <span className="text-primary font-semibold">internship</span> and{" "}
                <span className="text-primary font-semibold">job</span> updates.
            </p>



            <Button
                className="w-full mt-4 bg-[#E1306C] hover:bg-[#E1306C]/90 text-white font-medium h-11 gap-2"
                onClick={() => window.open("https://instagram.com/beinghired", "_blank")}
            >
                Follow us on Instagram
                <RiInstagramFill className="w-5 h-5" />
            </Button>



            <p className="text-xs text-muted-foreground mt-3">
                1,000+ members have already joined!
            </p>
        </div>
    );
};

export default InstagramCTA;
