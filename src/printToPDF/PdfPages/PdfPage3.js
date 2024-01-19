import { Box, Typography } from "@mui/material"
import osicon from "../Assets/images/page2skills/AnalyticalWhite.png"
import { FullPdfPage, PdfPageCenter } from "../Assets/data/pdfStylings";
import HeaderComponent from "../Components/HeaderComponent";
import FooterComponent from "../Components/FooterComponent";
import HeadingField from "../Components/HeadingField";
import SubCategories from "../Components/SubCategories";

const PdfPage3 = ({id})=>{
    return(
        <Box style={FullPdfPage}>
            <HeaderComponent headText="I-CAP Sectional Scorecard" />
            <Box style={PdfPageCenter}>
                <Box p={2}/>
                <Typography sx={{ textAlign: "justify", color: "black", }} >Explore your ICAP scores at a glance in this concise breakdown. Each graph and score represents your proficiency in key areas - from analytical skills to technical knowledge. This snapshot provides a clear and quick understanding of your performance across different sections, setting the stage for a more in-depth analysis in the following pages. Use this overview to identify your immediate strengths and areas for further exploration.</Typography>
                <Box p={2}/>
                <HeadingField icon={osicon} heading="Cognitive Abilities" />
                <Typography sx={{ textAlign: "justify", color: "black", }} >This segment tests a student's quantitative aptitude and analytical reasoning, essential for roles requiring data analysis, financial decision-making, or critical thinking.</Typography>
                <Box p={2}/>

                <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <SubCategories icon={osicon} value={40} category={"Quantitative Aptitude"} text={"Assess numerical data handling, mathematical calculations and understanding quantitative relationships."} />
                    <SubCategories icon={osicon} value={70} category={"Logical Reasoning"} text={"Evaluate the ability to analyze complex information, recognize patterns, and draw logical conclusions."} />
                </Box>
            </Box>
            <FooterComponent id={id} />
        </Box>
    )
}
export default PdfPage3;