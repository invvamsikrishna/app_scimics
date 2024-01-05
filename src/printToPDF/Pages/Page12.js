import { Box, Typography } from "@mui/material";
import page12png from "../Assets/images/page12header.png";
import Footer from "../Components/Footer";
import HeaderComponent from "../Components/HeaderComponent";
import { bFullPDFPage, pageRenderingBox } from "../Assets/data/styling";
import BasicTable from "../Components/TableComponent";
import JobList from "../Components/Joblisting";

const Page12 = ({id,firstName, lastName,examCondectedOn}) => {
    return (
        <Box style={bFullPDFPage}>
            <HeaderComponent pngImage={page12png}/>
            <Box style={pageRenderingBox}>
                <Typography>The skill and section combinations required for different job roles are given in the below table. <b>A row in the table indicates test sections that are important for employability in respective job roles.</b> For example in order to be considered for an Analyst role a candidate is required to do well on the Analytical, Quantitative, English and WET.</Typography>
                <Typography>Based on your performance in SCIMICS, an indicative job - fitment snapshot is also given below, which shows a view of your tentative job - fit. <b>Please note that this is not your final Job Health Card.</b>You should use this information to practise and improve and check the final year SCIMICS report for actual Job Health Card.</Typography>
                <Typography>Insights from the "Personality Test" are typically used by corporates during the interviews to understand your behaviour and whether your personality is a fit for the corresponding job roles.</Typography>
                <Box sx={{width:"100%", display:"flex", justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold", fontSize:"35px"}}>Indicative Job Suitability</Typography>
                    <Box sx={{ display: "flex", justifyContent:"space-between",alignItems:"center", width:"38%"}}>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"green"}}/>
                        <Typography>Job Suitability is High</Typography>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"gray"}}/>
                        <Typography>Job Suitability is Low</Typography>
                    </Box>
                </Box>
                <Box>
                    <JobList examCondectedOn={examCondectedOn} />
                </Box>
                <BasicTable />
            </Box>
            <Footer  id={id} firstName={firstName} lastName={lastName} />
        </Box>
    )
}
export default Page12;