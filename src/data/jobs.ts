//src\data\jobs.ts
export interface JobDetails {
  id: number;
  title: string;
  company: string;
  website: string;
  type: string;
  location?: string;
  experience?: string;
  posted: string;
  batch?: string;
  salary?: string;
  degree?: string;
  description?: string;
  responsibilities?: string[];
  eligibility?: string[];
  preferredSkills?: string[];
  benefits?: string;
  aboutCompany?: string;
  applyLink?: string;
}

