// src/pages/Index.tsx
import { useState, useMemo } from "react";
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

const fetchJobs = async (): Promise<JobDetails[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*');

  if (error) throw error;
  return data || [];
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [batch, setBatch] = useState("");
  const [location, setLocation] = useState("");

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
      const matchesBatch = batch === "" || job.batch === batch;
      const matchesLocation =
        location === "" ||
        (job.location &&
          job.location.toLowerCase().includes(location.toLowerCase()));

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