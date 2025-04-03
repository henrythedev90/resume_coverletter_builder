import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { CreateResumeInput } from "@/types/resume"; // Adjust the import path as needed
import { User } from "@/types/user";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  contactInfo: {
    textAlign: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
  },
  subHeading: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
  },
  bulletPoint: {
    marginVertical: 2,
  },
  date: {
    fontSize: 10,
    float: "right",
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
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.contactInfo}>
          {user.email} | {user.address?.city}, {user.address?.state}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Career Objective</Text>
        <View style={styles.bulletPoint}>
          <Text>{resumeData.careerObjective}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Work Experience</Text>
        {resumeData.professionalExperience &&
          resumeData.professionalExperience.map((exp, index) => (
            <View style={styles.subHeading} key={index}>
              <Text>
                {exp.jobTitle}, {exp.companyName}
              </Text>
              {exp.dates.start && exp.dates.end && (
                <Text style={styles.date}>
                  {exp.dates.start.toString()} - {exp.dates.end.toString()}
                </Text>
              )}
              {exp.responsibilities && (
                <View style={styles.section}>
                  <Text style={styles.heading}>Responsibilities:</Text>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <View style={styles.bulletPoint}>
                      <Text key={respIndex}>{resp}</Text>
                    </View>
                  ))}
                </View>
              )}
              {exp.accomplishments && (
                <View style={styles.section}>
                  <Text style={styles.heading}>Accomplishments:</Text>
                  {exp.accomplishments.map((acc, accIndex) => (
                    <View style={styles.bulletPoint}>
                      <Text key={accIndex}>{acc}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {resumeData.education &&
          resumeData.education.map((edu, index) => (
            <View key={index}>
              <Text style={styles.subHeading}>
                {edu.universityName}, {edu.degree}
              </Text>
              <Text>{edu.fieldOfStudy}</Text>
              {edu.graduationYear && (
                <Text style={styles.date}>{edu.graduationYear}</Text>
              )}
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Languages</Text>
        {resumeData.languages &&
          resumeData.languages.map((language, index) => (
            <View style={styles.bulletPoint}>
              <Text>{language.language},</Text>
              <Text>{language.proficiency}</Text>
            </View>
          ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Skills</Text>
        <View style={styles.bulletPoint}>
          {resumeData.skills &&
            Object.values(resumeData.skills).map(
              (skill: string, index: any) => <Text key={index}>{skill}</Text>
            )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
