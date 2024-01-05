import { Box, Typography } from '@mui/material';
import React from 'react';
import greenimage1 from "../Assets/images/mocx-greenicons-1.png";
import greenimage2 from "../Assets/images/mocx-greenicons-2.png";
import greenimage3 from "../Assets/images/mocx-greenicons-3.png";
import greenimage4 from "../Assets/images/mocx-greenicons-4.png";
import greenimage5 from "../Assets/images/mocx-greenicons-5.png";
import greenimage6 from "../Assets/images/mocx-greenicons-6.png";
import greenimage7 from "../Assets/images/mocx-greenicons-7.png";
import greenimage8 from "../Assets/images/mocx-greenicons-8.png";
import greenimage9 from "../Assets/images/mocx-greenicons-9.png";
import greenimage10 from "../Assets/images/mocx-greenicons-10.png";
import grayimage1 from "../Assets/images/mocx-gryicons-1.png";
import grayimage2 from "../Assets/images/mocx-gryicons-2.png";
import grayimage3 from "../Assets/images/mocx-gryicons-3.png";
import grayimage4 from "../Assets/images/mocx-gryicons-4.png";
import grayimage5 from "../Assets/images/mocx-gryicons-5.png";
import grayimage6 from "../Assets/images/mocx-gryicons-6.png";
import grayimage7 from "../Assets/images/mocx-gryicons-7.png";
import grayimage8 from "../Assets/images/mocx-gryicons-8.png";
import grayimage9 from "../Assets/images/mocx-gryicons-9.png";
import grayimage10 from "../Assets/images/mocx-gryicons-10.png";

const JobList = ({examCondectedOn}) => {
    // console.log(examCondectedOn[0]);
  const jobNames = ["Network Engineer", "Graduate Engineer (Plant)", "Graduate Engineer (R&D)", "Operations Executive", "Software Developer", "Software Tester", "Analyst", "Customer Service Executive", "Sales Executive", "Software Engineer"];
    
  return (
    <Box sx={{ width: "100%", display:"flex", flexWrap:"wrap", justifyContent:"space-evenly", alignItems:"center"}}>
      {jobNames.map((jobName, index) => (
        <Box key={index} sx={{ display:"flex", flexDirection:"column", alignItems:"center", width:"17%", textAlign:"center" }}>
          <img
            src={examCondectedOn[0] === jobName ? getGreenImage(jobName) : getGrayImage(jobName)}
            alt="image"
            style={{ width: "50%" }}
          />
          <Typography style={{ fontWeight: examCondectedOn[0] === jobName ? 'bold' : 'normal', color: examCondectedOn[0] === jobName ? 'black' : 'gray' }}>
            {jobName}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
const getGreenImage = (jobName) => {
    switch (jobName) {
      case "Network Engineer": return greenimage1;
      case "Graduate Engineer (Plant)": return greenimage2;
      case "Graduate Engineer (R&D)": return greenimage3;
      case "Operations Executive": return greenimage4;
      case "Software Developer": return greenimage5;
      case "Software Tester": return greenimage6;
      case "Analyst": return greenimage7;
      case "Customer Service Executive": return greenimage8;
      case "Sales Executive": return greenimage9;
      case "Software Engineer": return greenimage10;
      default: return '';
    }
  };
  
  const getGrayImage = (jobName) => {
    switch (jobName) {
      case "Network Engineer": return grayimage1;
      case "Graduate Engineer (Plant)": return grayimage2;
      case "Graduate Engineer (R&D)": return grayimage3;
      case "Operations Executive": return grayimage4;
      case "Software Developer": return grayimage5;
      case "Software Tester": return grayimage6;
      case "Analyst": return grayimage7;
      case "Customer Service Executive": return grayimage8;
      case "Sales Executive": return grayimage9;
      case "Software Engineer": return grayimage10;
      default: return '';
    }
  };
export default JobList;
