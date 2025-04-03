import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define the styles
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

const Resume = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.name}>Henry Nunez</Text>
        <Text style={styles.contactInfo}>
          1458 Webster Ave, Bronx, NY 10456 | (347)-419-1343 |
          Henry.s.Nunez@gmail.com
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>EDUCATION</Text>
        <Text style={styles.subHeading}>
          CUNY Herbert H. Lehman College, Bronx, NY
        </Text>
        <Text>
          Major: Exercise Science B.S. (Program: Pre- Physical Therapy)
        </Text>
        <Text style={styles.date}>May 2018</Text>
        <Text style={styles.subHeading}>
          Bronx Community College, Bronx, NY
        </Text>
        <Text>Associates of Science: Biology</Text>
        <Text>SEEK Scholarship</Text>
        <Text style={styles.date}>May 2014</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>WORK EXPERIENCE</Text>

        <Text style={styles.subHeading}>
          New York Red Bulls, Whippany and Harrison, NJ
        </Text>
        <Text style={styles.date}>Jan. 2017- Present</Text>
        <View style={styles.bulletPoint}>
          <Text>• Support the Academy Administrator</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Attendance in academy and USL games to assist with in-game
            responsibilities
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>• Working with coaching staff on video analysis of games</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>• Supporting academy training sessions</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>• Recording and analyzing player data</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>• Managing special projects</Text>
        </View>

        <Text style={styles.subHeading}>
          Titan Fitness Studio, New York, NY
        </Text>
        <Text style={styles.date}>April 2016-Jan. 2017</Text>
        <View style={styles.bulletPoint}>
          <Text>
            • Lead monthly meetings with personal trainers staff on site to
            discuss progress, set monthly goals and settle disputes
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Assist all Personal Trainers and Physical Therapists with clients
            needs to improve customer support
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Ensure a safe, clean, and secure site in order to host a conducive
            environment for clients to train
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Shadow physical therapists and trainers during training sessions
            to learn tactics in strength and condition
          </Text>
        </View>

        <Text style={styles.subHeading}>The Wright Fit, New York, NY</Text>
        <Text style={styles.date}>April 2015- June 2017</Text>
        <View style={styles.bulletPoint}>
          <Text>
            • Operate telephone switchboard to answer and forward calls,
            providing information, taking messages and scheduling consultations
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Market packages for add-on services to enhance customer experience
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Collect payments, renew memberships and resolve billing issues
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Monitor incoming inquiries and ensuring proper check-in procedures
            are followed
          </Text>
        </View>

        <Text style={styles.subHeading}>Jewish Home & Hospital, Bronx, NY</Text>
        <Text style={styles.date}>June 2007- August 2007</Text>
        <View style={styles.bulletPoint}>
          <Text>
            • Facilitated optimal customer service with friendly, personable
            attitude to all residents
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Organized Dancing workshops, created craft activities, maintained
            Bulletin Board showcases.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>VOLUNTEER EXPERIENCE</Text>
        <Text style={styles.subHeading}>
          Public School Athletic League (PSAL), Bronx, NY
        </Text>
        <Text style={styles.date}>Feb. 2009-Feb. 2017</Text>
        <View style={styles.bulletPoint}>
          <Text>
            • Attended all games (home and away), managed all team equipment,
            kept score and videotaped games
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Develop guidelines for injury prevention and treatment and drilled
            warm up and cool down exercises
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>SKILLS</Text>
        <View style={styles.bulletPoint}>
          <Text>
            • Knowledge of Windows 7 Operating System and Microsoft Office
          </Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>• Fluent in English, Spanish and Portuguese</Text>
        </View>
        <View style={styles.bulletPoint}>
          <Text>
            • Excellent verbal, written and interpersonal communication skills
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Resume;
