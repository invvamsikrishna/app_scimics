import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// import bgTable from "../Assets/images/bgTable.png";
import { Box } from '@mui/material';

const chartSetting = {
  xAxis: [
    {
      max: 2.00,
      min: -2.00
    },
  ],
  height: 400,
  width: 1000,
};
// const imageStyle ={
//     height: "435px",
//     width: "1386px",
//     position: "absolute",
//     top: "196px",
//     left: "-44px",
// }
const valueFormatter = (value) => `${value}mm`;

export default function DualSideChart({OpennessZScore,
  ConscientiousnessZScore,
  ExtraversionZScore,
  AgreeablenessZScore,
  EmotionalZScore}) {
  const dataObtained = [
    {
      "zscore": OpennessZScore,
      "personality": "Openness"
    },
    {
      "zscore": ConscientiousnessZScore,
      "personality": "Conscientiousness"
    },
    {
      "zscore": ExtraversionZScore,
      "personality": "Extraversion"
    },
    {
      "zscore": AgreeablenessZScore,
      "personality": "Agreeableness"
    },
    {
      "zscore": EmotionalZScore,
      "personality": "Emotional Stability"
    }
  ]
  // console.log(dataObtained);
  return (
    <Box>
        {/* <img src={bgTable} alt='table' style={imageStyle}/> */}
        <BarChart
            dataset={dataObtained}
            yAxis={[{ scaleType: 'band', dataKey: 'personality',  }]}
            series={[{ dataKey: 'zscore', valueFormatter, }]}

            layout="horizontal"
            {...chartSetting}
            sx={{width:"auto", paddingLeft:"200px",paddingRight:"110px",paddingBottom:"0px",paddingTop:"50px"}}
        />
    </Box>
  );
}