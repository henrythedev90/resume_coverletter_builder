"use client";
import React, { SetStateAction, Dispatch, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EducationComponent from "../Education/Education";
import ProfessionalExperienceComponent from "../ProfessionalExperience/ProfessionalExperience";
import SkillsComponent from "../Skills/Skills";
import ProjectsComponents from "../ProjectsComponent/ProjectsComponent";
import AwardComponent from "../Awards/Awards";
import LanguageComponent from "../Language/Language";
import VolunteerComponent from "../VolunteerExperience/VolunteerExperience";
import WebsiteComponent from "../Website/Website";
import JobPreferencesComponent from "../JobPreferences/JobPreferences";
import HobbiesAndInterestComponent from "../Hobbies/Hobbies";
import { CreateResumeInput } from "@/types/resume";

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
  const [formData, setFormData] = useState<CreateResumeInput>({
    userId: "your-user-id" as any, // Replace with actual user ID
    careerObjective: "",
    professionalExperience: [
      {
        jobTitle: "",
        companyName: "",
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
        graduationYear: { start: undefined, end: undefined },
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
    awards: [{ title: "", year: undefined, description: "" }],
    languages: [
      {
        language: "",
        proficiency: "",
      },
    ],
    volunteerExperience: [
      {
        organization: "",
        role: "",
        dates: {
          start: undefined,
          end: undefined,
        },
        description: "",
      },
    ],
    websites: [{ platform: "", url: "" }],
    hobbiesAndInterests: [{ event: [] }],
    jobPreferences: {
      desiredJobTitles: [],
      preferredIndustry: [],
      preferredLocation: "",
      employmentType: "",
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
    console.log("Before nextStep:", currentStep);
    if (currentStep < steps.length - 1) {
      console.log("Setting currentStep to:", currentStep + 1);
      setCurrentStep(currentStep + 1);
      console.log("After nextStep:", currentStep);
    }
  };

  const prevStep = () => {
    console.log("Before prevStep:", currentStep);
    if (currentStep > 0) {
      console.log("Setting currentStep to:", currentStep - 1);
      setCurrentStep(currentStep - 1);
      console.log("After prevStep:", currentStep);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="Professional-Experience"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <ProfessionalExperienceComponent />
            <div>hello world</div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="Education"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <EducationComponent />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="Skills"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <SkillsComponent />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="Projects"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <ProjectsComponents />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="Award"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <AwardComponent
              formData={formData.awards || []}
              setFormData={setFormData}
            />
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="Language"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <LanguageComponent />
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key="Volunteer-Experience"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <VolunteerComponent />
          </motion.div>
        );
      case 7:
        return (
          <motion.div
            key="website"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <WebsiteComponent />
          </motion.div>
        );
      case 8:
        return (
          <motion.div
            key="Hobbies & Interest"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <JobPreferencesComponent />
          </motion.div>
        );
      case 9:
        return (
          <motion.div
            key="Job Preferences"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4 bg-background text-foreground"
          >
            <HobbiesAndInterestComponent
              formData={formData.hobbiesAndInterests || [{ event: [] }]}
              setFormData={(data) =>
                setFormData((prev) => ({
                  ...prev,
                  hobbiesAndInterests: data,
                }))
              }
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Generator</h1>
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <Separator
                    orientation="horizontal"
                    className="w-4 sm:w-6 md:w-8 bg-gray-200"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
        <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
      </div>

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <Button
            variant="outline"
            className="bg-secondary text-secondary-foreground"
            onClick={prevStep}
          >
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button
            className="bg-primary text-primary-foreground"
            onClick={nextStep}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            variant="default"
            className="bg-accent text-accent-foreground"
          >
            Generate Resume
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResumeGeneratorForm;
