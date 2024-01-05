import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';

const StyledBox = styled(Box)({
  borderTop: 'dashed 3px black',
  height: '64px',//+7px due to borderTop
  width: "94%",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 3%',
  backgroundColor:"yellow"
})
const StyledInternalBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '60%'
})
const StyledTextBox = styled(Box)({
  color: 'rgb(150,150,150)',
  display: "flex",
  alignItems: "center",
  gap:"3px"
})
const StyledText = styled(Typography)({
  fontSize: "10px",
  color: 'rgb(150,150,150)',
})
const Footer = ({ id, firstName, lastName }) => {
  return (
    <StyledBox>
      <StyledInternalBox >
        <StyledText>{firstName} {lastName} (SIMICS ID: {id})</StyledText>
        <StyledText>SIMICS Skill Gap Analysis Report</StyledText>
      </StyledInternalBox>
      <StyledTextBox><CopyrightIcon sx={{ fontSize:"9px"}} /><Typography sx={{ fontSize:"10px"}}>2020 SIMICS. All rights reserved</Typography></StyledTextBox>
    </StyledBox>
  )
}

export default Footer
