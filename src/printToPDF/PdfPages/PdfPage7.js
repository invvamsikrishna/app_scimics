import { Box, Typography } from "@mui/material"
import HeaderComponent from "../Components/HeaderComponent";
import { FullPdfPage, PdfPageCenter } from "../Assets/data/pdfStylings";
import FooterComponent from "../Components/FooterComponent";
import JobList from "../Components/Joblisting";
import BasicTable from "../Components/TableComponent";

const PdfPage7 = ({ id, examCondectedOn }) => {
    return (
        <Box style={FullPdfPage}>
            <HeaderComponent headText="Job Roles Suitability & Market Prefer Ability" />
            <Box style={PdfPageCenter}>
                <Typography sx={{ color: "#737373", fontSize: "15px", textAlign: "justify", }}>The skill and section combinations required for different job roles are given in the below table. A row in the table indicates test sections that are important for employability in respective job roles. For example in order to be considered for an Analyst role a candidate is required to do well on the Analytical, Quantitative, English.</Typography>
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "end" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "30px", color: "#009ba5" }}>Job Suitability</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, pr: 1, color: "#737373" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, }}>
                            <Box sx={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "green" }} />
                            <Typography sx={{ fontSize: "22px", }}>High</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, }} >
                            <Box sx={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "gray" }} />
                            <Typography sx={{ fontSize: "22px", }}>Low</Typography>
                        </Box>
                    </Box>
                </Box>
                <JobList examCondectedOn={examCondectedOn} />
                <Box sx={{height:"200px"}}>
                    <BasicTable />
                </Box>
            </Box>
            <FooterComponent id={id} />
        </Box>
    )
}
export default PdfPage7;