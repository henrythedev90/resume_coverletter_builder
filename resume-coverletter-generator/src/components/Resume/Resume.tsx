"use client";
import React, { useState, useCallback } from "react";
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

const createInitialState = (): CreateResumeInput => ({
  userId: "your-user-id" as any,
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
  skills: { technical: [], soft: [], industrySpecific: [] },
  projects: [
    { title: "", description: "", role: "", skillsUsed: [], portfolioLink: "" },
  ],
  awards: [{ title: "", year: undefined, description: "" }],
  languages: [{ language: "", proficiency: "" }],
  volunteerExperience: [
    {
      organization: "",
      role: "",
      dates: { start: undefined, end: undefined },
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

const ResumeGeneratorForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CreateResumeInput>(
    createInitialState()
  );

  // Updated to pass formData and setFormData to all components
  const steps = useCallback(
    () => [
      {
        name: "Professional Experience",
        component: (
          <ProfessionalExperienceComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
      },
      {
        name: "Education",
        component: (
          <EducationComponent formData={formData} setFormData={setFormData} />
        ),
      },
      // {
      //   name: "Skills",
      //   component: (
      //     <SkillsComponent formData={formData} setFormData={setFormData} />
      //   ),
      // },
      {
        name: "Projects",
        component: (
          <ProjectsComponents formData={formData} setFormData={setFormData} />
        ),
      },
      {
        name: "Awards",
        component: (
          <AwardComponent formData={formData} setFormData={setFormData} />
        ),
      },
      // {
      //   name: "Languages",
      //   component: (
      //     <LanguageComponent formData={formData} setFormData={setFormData} />
      //   ),
      // },
      // {
      //   name: "Volunteer Experience",
      //   component: (
      //     <VolunteerComponent formData={formData} setFormData={setFormData} />
      //   ),
      // },
      // {
      //   name: "Websites",
      //   component: (
      //     <WebsiteComponent formData={formData} setFormData={setFormData} />
      //   ),
      // },
      // {
      //   name: "Job Preferences",
      //   component: (
      //     <JobPreferencesComponent
      //       formData={formData}
      //       setFormData={setFormData}
      //     />
      //   ),
      // },
      {
        name: "Hobbies & Interests",
        component: (
          <HobbiesAndInterestComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
      },
    ],
    [formData, setFormData]
  );

  const nextStep = useCallback(() => {
    if (currentStep < steps().length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const renderCurrentStep = useCallback(() => {
    const currentSteps = steps();
    return (
      <motion.div
        key={currentSteps[currentStep].name}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="space-y-4 bg-background text-foreground"
      >
        {currentSteps[currentStep].component}
      </motion.div>
    );
  }, [currentStep, steps]);

  const currentSteps = steps();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Generator</h1>
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            {currentSteps.map((step, index) => (
              <React.Fragment key={step.name}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                {index < currentSteps.length - 1 && (
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
        {currentStep < currentSteps.length - 1 && (
          <Button
            className="bg-primary text-primary-foreground"
            onClick={nextStep}
          >
            Next
          </Button>
        )}
        {currentStep === currentSteps.length - 1 && (
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
