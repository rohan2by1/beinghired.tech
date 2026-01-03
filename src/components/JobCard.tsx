//src\components\JobCard.tsx
import { Link } from "react-router-dom";
import { MapPin, Briefcase, Eye, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  type: string;
  location?: string;
  experience?: string;
  posted: string;
}

interface JobCardProps {
  job: Job;
  index: number;
}

function formatPostedDate(isoDate) {
  const date = new Date(isoDate);

  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}




const JobCard = ({ job, index }: JobCardProps) => {
  return (
    <Link to={`/job/${job.id}`}
    className="block mb-2">
      <div 
        className="bg-card rounded-lg p-5 card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in cursor-pointer group"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src={job.logo} 
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `<span class="text-lg font-semibold text-foreground">${job.company[0]}</span>`;
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors line-clamp-2">
              {job.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-0.5">{job.company}</p>
            
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge variant="secondary" className="text-xs font-medium">
                {job.type}
              </Badge>
              {job.location && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
              )}
              {job.experience && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Briefcase className="w-3 h-3" />
                  {job.experience}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Posted on {formatPostedDate(job.posted)}</span>
              <div className="flex items-center gap-3">
                {/* <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="w-3.5 h-3.5" />
                  {job.views} views
                </span> */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.preventDefault()}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
