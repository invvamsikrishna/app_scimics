import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DescWidget, TestDescDialog } from "../common";
import axios from "axios";

const TestOverview = () => {
  const [DSKQuantity,setDSKQuantity]=useState(0);
  const [HCQuantity,setHCQuantity]=useState(0);
  const [QAQuantity,setQAQuantity]=useState(0);
  const [LRQuantity,setLRQuantity]=useState(0);
  const [ELQuantity,setELQuantity]=useState(0);
  const [ERQuantity,setERQuantity]=useState(0);
  const [EWQuantity,setEWQuantity]=useState(0);
  const [ESQuantity,setESQuantity]=useState(0);
  const [ITWSQuantity,setITWSQuantity]=useState(0);
  const [ACLQuantity,setACLQuantity]=useState(0);
  const [PMTMQuantity,setPMTMQuantity]=useState(0);
  const [PEIPQuantity,setPEIPQuantity]=useState(0);
  const [TPTime,setTPTime]=useState(0);
  const [CATime,setCATime]=useState(0);
  const [CSTime,setCSTime]=useState(0);
  const [PBTime,setPBTime]=useState(0);
  const totalMinutes = TPTime + CATime + CSTime + PBTime;
  const hours = Math.trunc(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours > 0 ? `${hours}hrs` : ''} ${minutes > 0 ? `${minutes}min` : ''}`;

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("https://scimics-api.onrender.com/scimics/getconfig");
        // console.log(response.data.data);
        setDSKQuantity(response.data.data.tp_dsk_total);
        setHCQuantity(response.data.data.tp_hc_total);
        setTPTime(response.data.data.tp_time);
        setQAQuantity(response.data.data.ca_qa_total);
        setLRQuantity(response.data.data.ca_lr_total);
        setCATime(response.data.data.ca_time);
        setELQuantity(response.data.data.cs_l_total);
        setERQuantity(response.data.data.cs_r_total);
        setEWQuantity(response.data.data.cs_w_total);
        setESQuantity(response.data.data.cs_s_total);
        setCSTime(response.data.data.cs_time);
        setITWSQuantity(response.data.data.pb_itws_total);
        setACLQuantity(response.data.data.pb_acl_total);
        setPMTMQuantity(response.data.data.pb_pmtm_total);
        setPEIPQuantity(response.data.data.pb_peip_total);
        setPBTime(response.data.data.pb_time);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[])
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
          Total Test Duration: {formattedDuration}
        </Typography>

        <Box p={2} />

        <TestDescDialog formattedDuration={formattedDuration} />
      </Box>

      <Box p={3} />

      <DescWidget title="Test Overview" titleSize={22} desc={["This assessment comprises four sections: Cognitive Aptitude, Technical Proficiency, Communication Skills, and Personality and Behavior."]} />

      <Box p={2} />

      <Box sx={{ width: { xs: "100%", md: "85%" } }}>
        <DescWidget
          title="Cognitive Abilities"
          desc={[`Duration: ${CATime} Min`, `Number of Questions: ${QAQuantity + LRQuantity}`]}
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
          desc={[`Duration: ${TPTime} Min`, `Number of Questions: ${DSKQuantity + HCQuantity }`]}
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
          desc={[`Duration: ${CSTime} Min`, `Number of Questions: ${(ELQuantity +ERQuantity +ESQuantity +EWQuantity)*5 }`]}
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
          desc={[`Duration: ${PBTime} Min`, `Number of Questions: ${ITWSQuantity +ACLQuantity +PMTMQuantity +PEIPQuantity }`]}
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
