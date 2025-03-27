"use client";
import React, { useState } from "react";
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
      case 4:
        return (
          <motion.div
            key="Award"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="space-y-4"
          >
            <AwardComponent />
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
            className="space-y-4"
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
            className="space-y-4"
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
            className="space-y-4"
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
            className="space-y-4"
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
            className="space-y-4"
          >
            <HobbiesAndInterestComponent />
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
