// src/pages/Index.tsx
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import { supabase } from "@/lib/supabase"; // Import supabase client
import { JobDetails } from "@/data/jobs"; // Import Type only
import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import JobCard from "@/components/JobCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Telegram from "@/components/Telegram";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react"; // Optional: for loading state
import { useSearchParams } from "react-router-dom";

const fetchJobs = async (): Promise<JobDetails[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('id', { ascending: false }); // FIXED: Sort by ID descending

  if (error) throw error;
  return data || [];
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read state from URL parameters
  const searchQuery = searchParams.get("search") || "";
  const jobType = searchParams.get("type") || "";
  const batch = searchParams.get("batch") || "";
  const location = searchParams.get("location") || "";

  // Helper to update URL parameters
  const updateFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      return newParams;
    });
  };

  // Handlers compatible with HeroSection props
  const setSearchQuery = (val: string) => updateFilter("search", val);
  const setJobType = (val: string) => updateFilter("type", val);
  const setBatch = (val: string) => updateFilter("batch", val);
  const setLocation = (val: string) => updateFilter("location", val);

  // Use React Query to fetch data
  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJobType = jobType === "" || job.type === jobType;

      // Batch matching: support selection like "2023 graduates" and job.batch values like "2025 / 2024 / 2023"
      const matchesBatch = (() => {
        if (batch === "") return true;
        if (!job.batch) return false;
        const yearMatch = batch.match(/(\d{4})/);
        if (yearMatch) {
          return job.batch.includes(yearMatch[1]);
        }
        // fallback: substring match (case-insensitive)
        return job.batch.toLowerCase().includes(batch.toLowerCase());
      })();

      const matchesLocation = (() => {
        if (location === "") return true;
        if (!job.location) return false;
        const loc = location.toLowerCase();
        const jobLoc = job.location.toLowerCase();
        if (jobLoc.includes(loc)) return true;
        // Treat 'Remote' selection as match for 'work from home' descriptions
        if (loc === "remote" && jobLoc.includes("work from home")) return true;
        return false;
      })();

      return matchesSearch && matchesJobType && matchesBatch && matchesLocation;
    });
  }, [searchQuery, jobType, batch, location, jobs]);

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading jobs. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="hero-gradient py-4 border-b">
        <div className="container mx-auto flex items-center pl-2 pr-4 lg:pl-4 lg:pr-8">
          <a href="/" className="inline-flex items-center gap-0 text-xl font-bold">
            <span className="text-foreground">Beinghired@</span>
            <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded">
              tech
            </span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        jobType={jobType}
        onJobTypeChange={setJobType}
        batch={batch}
        onBatchChange={setBatch}
        location={location}
        onLocationChange={setLocation}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Listings */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              All Jobs ({filteredJobs.length})
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No jobs found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            )}
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

export default Index;