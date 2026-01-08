//src\components\HeroSection.tsx
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  jobType: string;
  onJobTypeChange: (value: string) => void;
  batch: string;
  onBatchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
}

const jobTypes = ["Internship", "FTE", "Intern-to-FTE"];
const batches = ["2020 graduates", "2021 graduates", "2022 graduates", "2023 graduates", "2024 graduates", "2025 graduates", "2026 graduates"];
const locations = ["Remote", "Gurgaon", "Noida", "Delhi", "Bengaluru", "Pune", "Mumbai", "Hyderabad", "Kolkata"];

const HeroSection = ({
  searchQuery,
  onSearchChange,
  jobType,
  onJobTypeChange,
  batch,
  onBatchChange,
  location,
  onLocationChange,
}: HeroSectionProps) => {
  return (
    <section className="hero-gradient py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="pl-4 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              🚀 100+ Active Tech Jobs
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              Get Hired Faster in
              <span className="text-primary"> Top Tech Companies</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Explore verified <strong>jobs, internships, and remote roles</strong> curated
              for students, freshers, and professionals.
            </p>


            <div className="mt-8 space-y-4">
              <SearchBar value={searchQuery} onChange={onSearchChange} />

              <div className="flex items-center gap-2 ">
                <span className="text-sm text-muted-foreground font-medium">Filter by :</span>
                <FilterDropdown
                  label="Job type"
                  options={jobTypes}
                  value={jobType}
                  onChange={onJobTypeChange}
                />
                <FilterDropdown
                  label="Batch"
                  options={batches}
                  value={batch}
                  onChange={onBatchChange}
                />
                <FilterDropdown
                  label="Location"
                  options={locations}
                  value={location}
                  onChange={onLocationChange}
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block flex-shrink-0">
            <img
              src="/hero-illustration.png"
              alt="Person working on laptop"
              className="w-80 h-auto object-contain animate-fade-in"
              style={{ animationDelay: "200ms" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
