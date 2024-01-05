import * as React from 'react';
import PropTypes from 'prop-types';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from "styled-components";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const progressColor = (progress)=>{
  if (progress >= 0 && progress <= 20) {
    return "#d82221";
  } else if (progress > 20 && progress <= 40) {
    return "#e5632a";
  } else if (progress > 40 && progress <= 60) {
    return "#d5b626";
  } else if (progress > 60 && progress <= 80) {
    return "#90a506";
  } else if (progress > 80 && progress <= 100) {
    return "#2c8318";
  } else {
    return "#d82221";
  }
}

const StyledLinearProgressBar = styled(LinearProgress, { props: { variant: 'determinate' } })
(
  (props) => ({
    [`&.${linearProgressClasses.determinate}`]: {
      backgroundColor: '#e0e0e0',
    },
    [`&.${linearProgressClasses.determinate} > .${linearProgressClasses.bar1Determinate}`]: {
      backgroundColor: props.colorCode,
    },
  })
);

function LinearProgressWithLabel(props) {
  // console.log(props)
  return (
    // <Box sx={{ display: 'flex', alignItems: 'center', }}>
      <Box sx={{ width: '100%',
      //  mr: 1,
      height:"90px",}}>
        <StyledLinearProgressBar variant="determinate" {...props} sx={{minHeight:"32px", }}/>
      </Box>
      //  <Box sx={{ width: "4.5%", height:"80px", }}>
      //   <Typography variant="body2" color="text.secondary">{`${Math.round(
      //     props.value,
      //   )}%`}</Typography>
      // </Box> 
    // </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ scoreData }) {
  const [progress, setProgress] = React.useState(0);
  const [colorCode, setColorCode]=React.useState("");

  React.useEffect(()=>{
    setProgress(scoreData);  
    let colorFunction = progressColor(scoreData)
    setColorCode(colorFunction);
  },[scoreData])

  return (
    <Box sx={{ width: '100%',  }}>
      <LinearProgressWithLabel value={progress} colorCode={colorCode} />
    </Box>
  );
}