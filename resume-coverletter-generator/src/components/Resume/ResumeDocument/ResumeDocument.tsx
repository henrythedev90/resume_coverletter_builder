// ResumeDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreateResumeInput } from "@/types/resume";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  text: {
    fontSize: 12,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    marginBottom: 5,
  },
});

const ResumeDocument = ({ resumeData }: { resumeData: CreateResumeInput }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{resumeData.careerObjective}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Professional Experience</Text>
        {resumeData.professionalExperience &&
          resumeData.professionalExperience.map((exp, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>
                {exp.jobTitle}, {exp.companyName}
              </Text>
              {exp.dates.start && exp.dates.end && (
                <Text style={styles.text}>
                  {exp.dates.start.toString()} - {exp.dates.end.toString()}
                </Text>
              )}
              {exp.responsibilities && (
                <View style={styles.list}>
                  <Text style={styles.subtitle}>Responsibilities:</Text>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <Text key={respIndex} style={styles.listItem}>
                      {resp}
                    </Text>
                  ))}
                </View>
              )}
              {exp.accomplishments && (
                <View style={styles.list}>
                  <Text style={styles.subtitle}>Accomplishments:</Text>
                  {exp.accomplishments.map((acc, accIndex) => (
                    <Text key={accIndex} style={styles.listItem}>
                      {acc}
                    </Text>
                  ))}
                </View>
              )}
              {exp.skillsUsed && (
                <View style={styles.list}>
                  <Text style={styles.subtitle}>Skills Used:</Text>
                  {exp.skillsUsed.map((skill, skillIndex) => (
                    <Text key={skillIndex} style={styles.listItem}>
                      {skill}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Education</Text>
        {resumeData.education &&
          resumeData.education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>
                {edu.degree}, {edu.fieldOfStudy}, {edu.universityName}
              </Text>
              {edu.graduationYear && (
                <Text style={styles.text}>
                  Graduation Year: {edu.graduationYear}
                </Text>
              )}
              {edu.certifications && (
                <View style={styles.list}>
                  <Text style={styles.subtitle}>Certifications:</Text>
                  {edu.certifications.map((cert, certIndex) => (
                    <Text key={certIndex} style={styles.listItem}>
                      {cert}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Skills</Text>
        <View style={styles.list}>
          {resumeData.skills?.technical && (
            <View style={styles.listItem}>
              <Text style={styles.subtitle}>
                Technical: {resumeData.skills.technical.join(", ")}
              </Text>
            </View>
          )}
          {resumeData.skills?.soft && (
            <View style={styles.listItem}>
              <Text style={styles.subtitle}>
                Soft: {resumeData.skills.soft.join(", ")}
              </Text>
            </View>
          )}
          {resumeData.skills?.industrySpecific && (
            <View style={styles.listItem}>
              <Text style={styles.subtitle}>
                Industry Specific:{" "}
                {resumeData.skills.industrySpecific.join(", ")}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Projects</Text>
        {resumeData.projects &&
          resumeData.projects.map((project, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{project.title}</Text>
              <Text style={styles.text}>{project.description}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Awards</Text>
        {resumeData.awards &&
          resumeData.awards.map((award, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{award.title}</Text>
              <Text style={styles.text}>{award.description}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Languages</Text>
        {resumeData.languages &&
          resumeData.languages.map((language, index) => (
            <View key={index}>
              <Text style={styles.text}>{language.language}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Volunteer Experience</Text>
        {resumeData.volunteerExperience &&
          resumeData.volunteerExperience.map((volunteer, index) => (
            <View key={index}>
              <Text style={styles.subtitle}>{volunteer.organization}</Text>
              <Text style={styles.text}>{volunteer.description}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Websites</Text>
        {resumeData.websites &&
          resumeData.websites.map((website, index) => (
            <View key={index}>
              <Text style={styles.text}>{website.url}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Job Preferences</Text>
        <Text style={styles.text}>
          Desired Job Titles:{" "}
          {resumeData.jobPreferences?.desiredJobTitles?.join(", ")}
        </Text>
        <Text style={styles.text}>
          Preferred Industry:{" "}
          {resumeData.jobPreferences?.preferredIndustry?.join(", ")}
        </Text>
        <Text style={styles.text}>
          Preferred Location: {resumeData.jobPreferences?.preferredLocation}
        </Text>
        <Text style={styles.text}>
          Employment Type: {resumeData.jobPreferences?.employmentType}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Hobbies and Interests</Text>
        {resumeData.hobbiesAndInterests &&
          resumeData.hobbiesAndInterests.map((hobby, index) => (
            <View key={index}>
              <Text style={styles.text}>{hobby}</Text>
            </View>
          ))}
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
