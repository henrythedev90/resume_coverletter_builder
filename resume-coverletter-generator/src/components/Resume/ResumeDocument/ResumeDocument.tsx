import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreateResumeInput } from "@/types/resume"; // Adjust the import path as needed
import { User } from "@/types/user";

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
  profile: {
    fontSize: 12,
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 5,
  },
});

const ResumeDocument = ({
  resumeData,
  user,
}: {
  resumeData: CreateResumeInput;
  user: User;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.contactInfo}>
          {user.email} | {user.address?.city}, {user.address?.state}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Career Objective</Text>
        <Text style={styles.profile}>{resumeData.careerObjective}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Work Experience</Text>
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
                <Text style={styles.text}>{edu.graduationYear}</Text>
              )}
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
        <Text style={styles.title}>Skills</Text>
        <View style={styles.list}>
          {resumeData.skills &&
            Object.values(resumeData.skills).map(
              (skill: string, index: any) => (
                <Text key={index} style={styles.listItem}>
                  {skill}
                </Text>
              )
            )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
