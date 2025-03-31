"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Types } from "mongoose";
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
import CareerObjectiveComponent from "../CareerObjective/CareerObjective";
import { CreateResumeInput } from "@/types/resume";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  userId: new Types.ObjectId(),
  careerObjective: "",
  professionalExperience: [],
  education: [],
  skills: { technical: [], soft: [], industrySpecific: [] },
  projects: [],
  awards: [],
  languages: [],
  volunteerExperience: [],
  websites: [],
  hobbiesAndInterests: [],
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

  const { data: session } = useSession();
  const router = useRouter();

  const steps = useMemo(
    () => [
      {
        name: "Career Objecttive",
        component: (
          <CareerObjectiveComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
        validate: () => formData.careerObjective.trim() !== "",
      },
      {
        name: "Professional Experience",
        component: (
          <ProfessionalExperienceComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
        validate: () => formData.professionalExperience.length > 0,
      },
      {
        name: "Education",
        component: (
          <EducationComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.education.length > 0,
      },
      {
        name: "Skills",
        component: (
          <SkillsComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () =>
          formData.skills.technical.length > 0 &&
          formData.skills.soft.length > 0 &&
          formData.skills.industrySpecific.length > 0,
      },
      {
        name: "Projects",
        component: (
          <ProjectsComponents formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.projects.length > 0,
      },
      {
        name: "Awards",
        component: (
          <AwardComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.awards?.length > 0,
      },
      {
        name: "Languages",
        component: (
          <LanguageComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.languages?.length > 0,
      },
      {
        name: "Volunteer Experience",
        component: (
          <VolunteerComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.volunteerExperience.length > 0,
      },
      {
        name: "Websites",
        component: (
          <WebsiteComponent formData={formData} setFormData={setFormData} />
        ),
        validate: () => formData.websites.length > 0,
      },
      {
        name: "Job Preferences",
        component: (
          <JobPreferencesComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
        validate: () =>
          formData.jobPreferences.desiredJobTitles.length > 0 ||
          formData.jobPreferences.preferredIndustry.length > 0 ||
          formData.jobPreferences.preferredLocation !== "" ||
          formData.jobPreferences.employmentType !== "",
      },
      {
        name: "Hobbies & Interests",
        component: (
          <HobbiesAndInterestComponent
            formData={formData}
            setFormData={setFormData}
          />
        ),
        validate: () =>
          formData.hobbiesAndInterests.length > 0 &&
          formData.hobbiesAndInterests[0].length > 0,
      },
    ],
    [formData]
  );

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1 && steps[currentStep].validate()) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, steps]);

  const renderCurrentStep = useCallback(() => {
    return (
      <motion.div
        key={steps[currentStep].name}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="space-y-4 bg-background text-foreground"
      >
        {steps[currentStep].component}
      </motion.div>
    );
  }, [currentStep, steps]);

  const handleGenerateResume = async () => {
    try {
      // Get the stored JWT token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Authentication token not found");
        alert("You need to log in again. Redirecting to login page...");
        router.push("/login");
        return;
      }

      const filteredFormData = {
        ...formData,
        userId: session?.user._id,
        professionalExperience: formData.professionalExperience.filter(
          (exp) => exp.jobTitle && exp.companyName
        ),
        education: formData.education.filter(
          (edu) => edu.degree && edu.fieldOfStudy && edu.universityName
        ),
        awards: formData.awards.filter((award) => award.title),
        languages: formData.languages.filter((lang) => lang.language),
        projects: formData.projects.filter((project) => project.title),
        volunteerExperience: formData.volunteerExperience.filter(
          (volunteer) => volunteer.organization
        ),
        websites: formData.websites.filter((website) => website.url),
      };

      console.log(filteredFormData.websites);
      debugger;
      const response = await axios.post(
        "/api/resume/generate",
        filteredFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resumeId = response.data._id;
      router.push(`/job-fit?_id=${resumeId}`);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume. Please try again.");
    }
  };

  const isNextButtonDisabled = useMemo(
    () => !steps[currentStep].validate(),
    [currentStep, steps]
  );

  return session ? (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Resume Generator</h1>
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4">
            {steps.map((step, index) => (
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
            disabled={isNextButtonDisabled}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            variant="default"
            className="bg-accent text-accent-foreground"
            onClick={handleGenerateResume}
          >
            Generate Resume
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

export default ResumeGeneratorForm;
