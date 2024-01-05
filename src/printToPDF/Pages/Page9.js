import { Box, Typography } from '@mui/material';
import React from 'react';
import DualSideChart from '../Components/DualSideChart';
import HeaderComponent from '../Components/HeaderComponent';
import page9png from "../Assets/images/page9header.png";
import Footer from '../Components/Footer';
import { bFullPDFPage, pageRenderingBox } from '../Assets/data/styling';
// import bgTable from "../Assets/images/bgTable.png";
const contentFont = {
    fontSize:"13.7px", 
    textAlign: 'justify'
}
const HeaderContent ={
    fontWeight:"bold"
}
const Page9 = ({ id, firstName, lastName, OpennessZScore, ConscientiousnessZScore, ExtraversionZScore, AgreeablenessZScore, EmotionalZScore }) => {
    return (
        <Box style={bFullPDFPage}>
            <HeaderComponent pngImage={page9png}/>
            <Box style={pageRenderingBox} >
                <Typography variant="p" style={contentFont}>A personality test is a tool to understand <b>who you are as a person</b>. This is important for an organisation because people with different personalities approach a given task in different ways.</Typography>
                <Typography variant="p" style={contentFont}>Below map classifies your personality based on the traits of the <b>"Big Five"</b> Model. Remember that a low percentile does not mean bad performance and high percentile does not mean good performance, as there is no concept of performance in personality.</Typography>
                <Typography variant="p" style={contentFont}>The personality map below shows where your position is relative to the population across different personality traits. Each bar represents your Z-score for a personality trait.</Typography>
                <Box sx={{height: "400px", width:"100%"}}>
                    <DualSideChart OpennessZScore={OpennessZScore}
                            ConscientiousnessZScore={ConscientiousnessZScore}
                            ExtraversionZScore={ExtraversionZScore}
                            AgreeablenessZScore={AgreeablenessZScore}
                            EmotionalZScore={EmotionalZScore}/>
                </Box>
                <Box sx={{ display:'flex', flexDirection:"column"}}>
                    <Typography variant="p" style={HeaderContent} >The Z-Score</Typography>
                    <Typography variant="p" style={contentFont}>For each trait, a Z-score is provided. The Z-score measures the number of standard deviations the score is away from mean of norm. A Z-score more than +0.44 means the candidate is in the top 33%, whereas a Z-score of less than -0.44 represents the candidate is in the lowest 33%.</Typography>
                </Box>
                <Box sx={{ display:'flex', flexDirection:"column"}}>
                    <Typography variant="p" style={HeaderContent} >What does "Low", "Medium" or "High" mean?</Typography>
                    <Typography variant="p" style={contentFont}>The classification above in terms of "Low", "Medium" or "High" is a relative positioning of you as compared to the large sample of entry level candidates that have been assessed. For instance, a person who is high on Extraversion is as extraverted as the top 33% people in the control group .He/She may not still be extraverted enough for a given role or a standard set by another individual.</Typography>
                </Box>
                <Box sx={{ display:'flex', flexDirection:"column"}}>
                    <Typography variant="p" style={HeaderContent} >"Low" does not mean "Bad"</Typography>
                    <Typography variant="p" style={contentFont}>A trait score of HIGH or LOW does not classify someone as GOOD or BAD. Every individual has a unique personality and different people in different kind of jobs need different personality combinations. A person with a given personality profile may be inclined to perform better in a sales job while another with a different personality may be more suitable for a software development role.</Typography>
                </Box>
            </Box>
            <Footer  id={id} firstName={firstName} lastName={lastName} />
        </Box>
    )
}

export default Page9
