import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { DescWidget, TestDescDialog } from "../common";

const TestOverview = () => {
  return (
    <>
      <Box px={4} py={4} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "85%" } }}>
        <Typography variant="subtitle1" fontSize={22} fontWeight={500} color="#CED765">
          I-CAP Test (Integrated Competency Analysis Program)
        </Typography>

        <Typography variant="subtitle1" fontSize={22} fontWeight={500} gutterBottom>
          Unlock Potential, Propel Careers: Start with ICAP Test Now.
        </Typography>

        <Typography variant="subtitle2" fontSize={13} fontWeight="normal" color="text.subtitle">
          Total Test Duration: 3hrs
        </Typography>

        <Box p={2} />

        <TestDescDialog />
      </Box>

      <Box p={3} />

      <DescWidget title="Test Overview" titleSize={22} desc={["This assessment comprises four sections: Cognitive Aptitude, Technical Proficiency, Communication Skills, and Personality and Behavior."]} />

      <Box p={2} />

      <Box sx={{ width: { xs: "100%", md: "85%" } }}>
        <DescWidget
          title="Cognitive Abilities"
          desc={["Duration: 30 Min", "Number of Questions: 20"]}
          children={[
            { desc: ["Types of Questions: MCQs"] },
            {
              desc: [
                "Quantitative Aptitude",
                "Number System, Percentage, Ratio and Proportion, Partnership, Profit & Loss, Simple & Compound Interest, Allegation and Mixture, Average, Time and Distance, Time and Work, Mensuration 2D & 3D, Permutation and Combination, Probability, Coordinate Geometry, Inequalities, Functions, Logarithm, Set Theory, Progressions, Quadratic Equations, Surds.",
              ],
            },
            {
              desc: [
                "Logical Reasoning",
                "Number System, Percentage, Ratio and Proportion, Partnership, Profit & Loss, Simple & Compound Interest, Allegation and Mixture, Average, Time and Distance, Time and Work, Mensuration 2D & 3D, Permutation and Combination, Probability, Coordinate Geometry, Inequalities, Functions, Logarithm, Set Theory, Progressions, Quadratic Equations, Surds.",
              ],
            },
          ]}
        />

        <Box p={1} />

        <DescWidget
          title="Technical Proficiency"
          desc={["Duration: 30 Min", "Number of Questions: 20"]}
          children={[
            { desc: ["Types of Questions: MCQs"] },
            { underline: 1, desc: ["Domain-Specific Knowledge"] },
            {
              underline: 1,
              desc: ["Hands-on Coding / Basic Computer Knowledge"],
            },
          ]}
        />

        <Box p={1} />

        <DescWidget
          title="Communication Skills"
          desc={["Duration: 45 Min", "Number of Questions: 15"]}
          children={[
            { desc: ["Types of Questions: MCQs, Audio, Written test"] },
            { underline: 1, desc: ["English Speaking"] },
            { underline: 1, desc: ["English Listening"] },
            { underline: 1, desc: ["English Reading"] },
            { underline: 1, desc: ["English Writing"] },
          ]}
        />

        <Box p={1} />

        <DescWidget
          title="Personality and Behavioral"
          desc={["Duration: 30 Min", "Number of Questions: 20"]}
          children={[
            { desc: ["Types of Questions: MCQs"] },
            {
              underline: 1,
              desc: [
                "Interpersonal and Team work Skills:focus on teamwork dynamics and communication within a group.",
                "Team Collaboration Basics, Effective Communication in Multicultural Teams, Giving and Receiving Constructive Feedback, Basic Conflict Resolution Techniques.",
              ],
            },
            {
              underline: 1,
              desc: [
                "Adaptability and Continuous Learning: emphasize the ability to adapt to changes and continue learning in a professional environment.",
                "Basic Goal Setting, Introductory Time Management Techniques with available tools, Fundamentals of Task Prioritization, Basic Project Coordination Concepts.",
              ],
            },
            {
              underline: 1,
              desc: [
                "Project Management and Time Management: deal with organizing, planning, and managing time effectively for projects.",
                "Adapting to Workplace Dynamics, Continuous Skill Upgradation, Handling Constructive Criticism,Proactive Learning Approach in Entry-Level roles.",
              ],
            },
            {
              underline: 1,
              desc: [
                "Professional Etiquette and Interview Preparedness: cover the basics of professional conduct and preparing for job interviews.",
                "Basic Professional Communication, Introduction to Interview Skills, Networking Fundamentals, Personal Branding Essentials for New Graduates.",
              ],
            },
          ]}
        />
      </Box>
    </>
  );
};

export default TestOverview;
