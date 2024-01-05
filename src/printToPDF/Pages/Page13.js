import { Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import imgPage13round from '../Assets/images/page13round.png'
import CopyrightIcon from '@mui/icons-material/Copyright';

const StyledBox = styled(Box)({
  backgroundColor: '#e11b22',
  minHeight:"1454px",
  width: '100%',
})
const LeftBox = styled(Box)({
  width: '60%',
})
const RightBox = styled(Box)({
  width: '40%',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  height:'100%',
  paddingRight:"25px"
})
const HeadingText = styled(Typography)({
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '10px'
})
const contentFont = { 
  color: 'white',
  fontSize: "12px",
  fontWeight: "bold"
}
const FooterBox = styled(Box)({
  borderTop: "dashed 3px white",
  width: '100%',
  height: '64px',
  color: 'white',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap:'3px'
})
const Page13 = () => {
  return (
    <StyledBox>
      <Stack direction="row" sx={{minHeight:"1370px"}} >
        <LeftBox>
          <Stack direction="column">
            <Box sx={{ textAlign: 'justify', padding: '30px' }}>
              <HeadingText variant='h6'>About the Report</HeadingText>
              <Typography variant='p' style={contentFont}>
                This report is designed to provide insights on overall student performance and their training needs across key employability skills that are critical for building successful careers. SIMICS's 10+ years of experience working with over 600 employees has helped build insights into skill needs of organizations and benchmarks they use for entry level as well as lateral recruitments across all major industries in india. Institute can use these insights to develop training plans, better nurture and engage talent to help student learn effectively and take a positive step towords their long term careers.
              </Typography>
            </Box>
            <Box sx={{ width: '85%', height: '3px', bgcolor: 'white', margin: '2vh 30px', }}></Box>
            <Box sx={{ textAlign: 'justify', padding: '30px', display:"flex", flexDirection:"column", gap:"10px" }}>
              <HeadingText variant='h6'>About Us</HeadingText>
              <Typography variant='p' style={contentFont}>
                We are India's leading assessment and hiring platform and run assessments to measure employability across all domains - from Progarmming to Plumbing. We work with 600+ assessments and impact over a million candidates each year running assessments in over 350 cities alongside being a part of the Skill India initiative as well.
              </Typography>
              <Typography variant='p' style={contentFont}>
                Thus, every day we strive to create value for our institutional clients by helping them measure and improve employability and helping candidates move ahead on their career path. Our mission is to ensure that everyone in the country gets an equal opportunity to build a career.
              </Typography>
              <Typography variant='p' style={{ color: 'white', marginTop:"10px", fontSize: "12px", fontWeight: "bold" }}>
                SIMICS is an integral part of Aon plc (NYSE:AON)
              </Typography>
            </Box>
          </Stack>
        </LeftBox>
        <RightBox>
          <Box component="img" 
            sx={{ width: "90%", marginTop:"13rem",}}
            alt="The End"
            src={imgPage13round}
        />
        </RightBox>
      </Stack>
      <FooterBox >
        <CopyrightIcon fontSize='9px' /><Typography sx={{ fontSize: "10px", marginRight:"3%" }}>2020 SIMICS. All rights reserved</Typography>
      </FooterBox>
    </StyledBox>
  )
}
export default Page13