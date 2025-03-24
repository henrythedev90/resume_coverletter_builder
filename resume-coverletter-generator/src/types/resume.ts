import { Types } from "mongoose";

export interface ProfessionalExperience {
  jobTitle: string;
  companyName: string;
  location: string;
  dates: {
    start?: Date;
    end?: Date;
  };
  responsibilities?: string[];
  accomplishments?: string[];
  skillsUsed?: string[];
}

export interface Education {
  degree: string;
  fieldOfStudy: string;
  universityName: string;
  graduationYear?: number;
  certifications?: string[];
}

export interface Skills {
  technical?: string[];
  soft?: string[];
  industrySpecific?: string[];
}

export interface Project {
  title?: string;
  description?: string;
  role?: string;
  skillsUsed?: string[];
  results?: string;
  portfolioLink?: string;
}

export interface Award {
  title?: string;
  year?: number;
  description?: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface VolunteerExperience {
  organization?: string;
  role?: string;
  dates?: {
    start?: Date;
    end?: Date;
  };
  contributions?: string[];
}

export interface Website {
  platform: string;
  url: string;
}

export interface JobPreferences {
  desiredJobTitles?: string[];
  preferredLocation?: string;
  employmentType?: string;
  preferredIndustry?: string[];
}

export interface Resume {
  _id?: string;
  userId: Types.ObjectId;
  careerObjective?: string;
  professionalExperience?: ProfessionalExperience[];
  education?: Education[];
  skills?: Skills;
  projects?: Project[];
  awards?: Award[];
  languages?: Language[];
  volunteerExperience?: VolunteerExperience[];
  hobbiesAndInterests?: string[];
  websites?: Website[];
  jobPreferences?: JobPreferences;
}

export type CreateResumeInput = Omit<Resume, "_id">;
export type UpdateResumeInput = Partial<CreateResumeInput>;
