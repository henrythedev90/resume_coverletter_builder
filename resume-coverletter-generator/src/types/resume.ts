import { Types } from "mongoose";

export interface ProfessionalExperience {
  jobTitle: string;
  companyName: string;
  location: { city: string; state: string };
  dates: {
    start: Date;
    end: Date;
  };
  responsibilities: string[];
  accomplishments: string[];
  skillsUsed: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  universityName: string;
  graduationYear?: number | undefined;
  certifications?: string[];
}

export interface Skills {
  technical: string[];
  soft: string[];
  industrySpecific: string[];
}

export interface Project {
  title: string;
  description: string;
  role: string;
  skillsUsed: string[];
  portfolioLink?: string;
}

export interface Award {
  title: string;
  year: number | undefined;
  description: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface VolunteerExperience {
  organization: string;
  role: string;
  dates: {
    start: Date;
    end: Date;
  };
  description: string;
}

export interface Website {
  platform: string;
  url: string;
}

export interface JobPreferences {
  desiredJobTitles: string[];
  preferredLocation: string;
  employmentType: string;
  preferredIndustry: string[];
}

export interface ResumeType {
  _id: string;
  userId: Types.ObjectId;
  careerObjective: string;
  skills: Skills;
  professionalExperience: ProfessionalExperience[];
  education: Education[];
  projects: Project[];
  awards?: Award[];
  languages?: Language[];
  volunteerExperience?: VolunteerExperience[];
  hobbiesAndInterests?: string[];
  websites?: Website[];
  jobPreferences?: JobPreferences;
}

export type CreateResumeInput = Omit<ResumeType, "_id">;
export type UpdateResumeInput = Partial<CreateResumeInput>;
