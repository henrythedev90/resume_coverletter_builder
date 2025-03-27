"use client";
import React, { useState } from "react";
import { Types } from "mongoose";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ResumeType } from "@/types/resume";
import EducationComponent from "../Education/Education";
import ProfessionalExperienceComponent from "../ProfessionalExperience/ProfessionalExperience";
import SkillsComponent from "../Skills/Skills";
import ProjectsComponents from "../ProjectsComponent/ProjectsComponent";

// Animation variants for smooth transitions
const pageVariants = {
  initial: { opacity: 0, x: "100%" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "-100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const ResumeGeneratorForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ResumeType>({
    userId: new Types.ObjectId(),
    professionalExperience: [
      {
        companyName: "",
        jobTitle: "",
        location: { city: "", state: "" },
        dates: { start: undefined, end: undefined },
        responsibilities: [],
        accomplishments: [],
        skillsUsed: [],
      },
    ],
    education: [
      {
        degree: "",
        fieldOfStudy: "",
        universityName: "",
        graduationYear: undefined,
        certifications: [],
      },
    ],
    skills: {
      technical: [],
      soft: [],
      industrySpecific: [],
    },
    projects: [
      {
        title: "",
        description: "",
        role: "",
        skillsUsed: [],
        portfolioLink: "",
      },
    ],
    awards: [{ title: "", year: 1900, description: "" }],
    languages: [{ language: "", proficiency: "" }],
    volunteerExperience: [
      {
        organization: "",
        role: "",
        contributions: [],
        dates: { start: new Date(), end: new Date() },
      },
    ],
    hobbiesAndInterests: [],
    websites: [{ platform: "", url: "" }],
    jobPreferences: {
      desiredJobTitles: [], // Desired positions or job titles
      preferredLocation: "", // Preferred location for work
      employmentType: "", // e.g., "Full-time", "Part-time", "Contract"
      preferredIndustry: [], // Industries the user is interested in
    },
  });

  const steps = [
    "Professional Experience",
    "Education",
    "Skills",
    "Projects",
    "Awards",
    "Languages",
    "Volunteer Experience",
    "Hobbies & Interests",
    "Websites",
    "Job Preferences",
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="professional-experience"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <ProfessionalExperienceComponent />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="education"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <EducationComponent />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="skills"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <SkillsComponent />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="projects"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <ProjectsComponents />
          </motion.div>
        );
      // Add similar cases for other steps...
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Generator</h1>
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${
                    index <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }
                `}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <Separator
                  orientation="horizontal"
                  className={`flex-grow ${
                    index < currentStep ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button variant="outline" onClick={prevStep}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button onClick={nextStep}>Next</Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button variant="default">Submit Resume</Button>
        )}
      </div>
    </div>
  );
};

export default ResumeGeneratorForm;
