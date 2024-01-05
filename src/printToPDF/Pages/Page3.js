import { Box, Typography} from '@mui/material'
import React from 'react'
import page3png from '../Assets/images/page3header.png'
import Footer from '../Components/Footer'
import HeaderComponent from '../Components/HeaderComponent'
import { bFullPDFPage, leftContentBox, leftContentTypography, ApageRenderingBox, rightNumberTypography, thirdPageContentBoxs } from '../Assets/data/styling'
import "@fontsource/courier-prime";

const Page3 = ({ id,firstName, lastName }) => {
    const leftHeaderTypography ={
        fontSize:"24px",
        fontFamily: "Courier Prime",
        color:"#3a7ab7",
      }
  return (
    <Box style={bFullPDFPage}>
        <HeaderComponent pngImage={page3png}/>
        <Box style={ApageRenderingBox}>
            <Box sx={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center",  }}>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>Quick Snapshot</Typography>
                        <Typography style={leftContentTypography}>Your SIMICS Score, Percentiles, Personality Type</Typography>
                        <Typography style={leftContentTypography}>and Skill-wise performance</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>02</Typography>
                </Box>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>Detailed SIMICS Score</Typography>
                        <Typography style={leftContentTypography}>Scores across SIMICS sections of Analytical, Quantitative, English, Domain,</Typography>
                        <Typography style={leftContentTypography}>Computer Fundamentals, Coding & WET</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>04</Typography>
                </Box>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>In Depth Aspect Report</Typography>
                        <Typography style={leftContentTypography}>In depth report on each aspect and its relevance; descriptions of your</Typography>
                        <Typography style={leftContentTypography}>strengths, practice and training needs along with respective improvement tips</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>05</Typography>
                </Box>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>Know Your Personality</Typography>
                        <Typography style={leftContentTypography}>Know your personality in more detail through</Typography>
                        <Typography style={leftContentTypography}>the traits of big five model</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>09</Typography>
                </Box>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>Competency Result</Typography>
                        <Typography style={leftContentTypography}>Detailed description of your profile on each of the</Typography>
                        <Typography style={leftContentTypography}>personality aspects</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>10</Typography>
                </Box>
                <Box style={thirdPageContentBoxs}>
                    <Box style={leftContentBox}>
                        <Typography style={leftHeaderTypography}>Job-Skill Matrix</Typography>
                        <Typography style={leftContentTypography}>Job Mapping to different skills</Typography>
                        <Typography style={leftContentTypography}>and your indicative fit</Typography>
                    </Box>
                    <Typography style={rightNumberTypography}>12</Typography>
                </Box>
            </Box>
        </Box>
        <Footer  id={id} firstName={firstName} lastName={lastName} />
    </Box>
  )
}
export default Page3;