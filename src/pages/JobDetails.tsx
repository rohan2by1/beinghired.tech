// src/pages/JobDetails.tsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Share2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  IndianRupee, 
  Linkedin, 
  Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Kept if you use it, though not strictly used in the template below
import Logo from "@/components/Logo";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Telegram from "@/components/Telegram";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import { toast } from "sonner";
import { JobDetails as JobDetailsType } from "@/data/jobs";
import { getCompanyLogo } from "@/lib/utils";

// --- Fetcher Functions ---

const fetchJob = async (id: string) => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as JobDetailsType;
};

const fetchSimilarJobs = async (currentId: string) => {
  // Fetch 4 random jobs that aren't the current one
  // Note: For true randomness in SQL you'd use a function, 
  // but for a small dataset, limiting is fine.
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .neq('id', currentId)
    .limit(4);

  if (error) throw error;
  return data as JobDetailsType[];
};

function formatPostedDate(isoDate: string) {
  if (!isoDate) return "";
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

const JobDetails = () => {
  const { id } = useParams();
  
  // 1. Fetch the specific job
  const { 
    data: job, 
    isLoading: isLoadingJob, 
    error: jobError 
  } = useQuery({
    queryKey: ['job', id],
    queryFn: () => fetchJob(id!),
    enabled: !!id, // Only run if ID exists
  });

  // 2. Fetch similar jobs
  const { 
    data: similarJobs = [] 
  } = useQuery({
    queryKey: ['similar-jobs', id],
    queryFn: () => fetchSimilarJobs(id!),
    enabled: !!id,
  });

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // --- Loading State ---
  if (isLoadingJob) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }


  // Get the logo
const logoUrl = job ? getCompanyLogo(job.website) : null;
  // --- Error or Not Found State ---
  if (jobError || !job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Job not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
    {/* Header */}
     <header className="py-4 border-b">
  <div className="container mx-auto flex items-center pl-2 pr-4 lg:pl-4 lg:pr-8">
    <a href="/" className="inline-flex items-center gap-0 text-xl font-bold">
      <span className="text-foreground">Beinghired@</span>
      <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
        tech
      </span>
    </a>
  </div>
</header>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary mb-8"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-foreground/30 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </span>
          <span className="relative">
            Back to all Jobs
            <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Content */}
          <div className="flex-1">
            
            {/* Company Header */}
            <div className="flex items-start justify-between mb-6">
              
             <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-foreground">${job.company[0]}</span>`;
                  }}
                />
              ) : (
                <span className="text-2xl font-bold text-foreground">{job.company[0]}</span>
              )}
            </div>
              <Button variant="outline" onClick={handleShare} className="gap-2">
                Share job
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Job Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {job.title}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <span className="font-medium text-foreground">{job.company}</span>
              <span>•</span>
              <span>Posted on</span>
              <span>{formatPostedDate(job.posted)}</span>
            </div>

            {/* Info Card */}
            <div className="bg-card rounded-lg border border-border p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{job.experience || "Not specified"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{job.location || "Not specified"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Salary</p>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{job.salary || "Not disclosed"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Degree</p>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground text-sm">{job.degree || "Any"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Batch</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground text-sm">{job.batch || "Any"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <p className="text-foreground leading-relaxed mb-8">{job.description}</p>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Responsibility :</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {job.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Eligibility */}
            {job.eligibility && job.eligibility.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Eligibility :</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {job.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Preferred Skills */}
            {job.preferredSkills && job.preferredSkills.length > 0 && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Preferred Skills :</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground">
                  {job.preferredSkills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            {job.benefits && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Benefits :</h3>
                <p className="text-foreground">{job.benefits}</p>
              </section>
            )}

            {/* About Company */}
            {job.aboutCompany && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">About Company :</h3>
                <p className="text-foreground">{job.aboutCompany}</p>
              </section>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="outline" className="gap-2">
                <Linkedin className="w-4 h-4" />
                Ask for referrals on
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => job.applyLink && window.open(job.applyLink, "_blank")}
              >
                Apply now
              </Button>
            </div>

            {/* Similar Jobs */}
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-2">Similar jobs</h3>
              <p className="text-muted-foreground mb-6">Here are other jobs you might want to apply for.</p>
              <div className="space-y-4">
                {similarJobs.map((similarJob, index) => (
                  <JobCard key={similarJob.id} job={similarJob} index={index} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0 block mb-2 space-y-4">
            <WhatsAppCTA />
            <Telegram />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobDetails;