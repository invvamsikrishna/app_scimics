import { Box, Typography } from "@mui/material"
import { FullPdfPage, PdfPageCenter } from "../Assets/data/pdfStylings"
import HeaderComponent from "../Components/HeaderComponent"
import FooterComponent from "../Components/FooterComponent"
import HeadingField from "../Components/HeadingField"
import osicon from "../Assets/images/page2skills/AnalyticalWhite.png"

const PdfPage8 = ({id}) =>{
    return(
        <Box style={FullPdfPage}>
            <HeaderComponent headText="Immediate Steps To Be Taken" />
            <Box style={PdfPageCenter}>
                <Box p={2}/>
                <Typography sx={{color:"#737373", fontSize:"18px", textAlign: "justify",}}>
                    Choose any course and start learning. Always remember, you need professional skills to stay alive in this generation. So learn new things. See if you can apply them anywhere. Stay in touch with your professors and classmates, plus focus on developing new contacts through trade associations, topical forums, etc.
                </Typography>
                <Box p={2}/>
                <HeadingField icon={osicon} heading="Start Applying For Companies" />
                <Box p={2}/>
                <Typography sx={{color:"#737373", fontSize:"18px", textAlign: "justify", pl: 5, pr: 5, }}>
                    Given that now you have PRE ASSESS score, you can start applying for jobs on Scimics.
                </Typography>
                <Box p={2}/>
                <HeadingField icon={osicon} heading="Take Career Test" />
                <Box p={2}/>
                <Typography sx={{color:"#737373", fontSize:"18px", textAlign: "justify", pl: 5, pr: 5, }}>
                    Your subscription includes 'Career Tests'. We would recommend that you take 'Career Tests' to practise and understand opportunities in private sector, government jobs and higher education.
                </Typography>
                <Box p={2}/>
                <HeadingField icon={osicon} heading="Login To View Article/Videos Regularly" />
                <Box p={2}/>
                <Typography sx={{color:"#737373", fontSize:"18px", textAlign: "justify", pl: 5, pr: 5, }}>
                    Our expert content team everyday spends time to find the right articles and videos for you to succeed. View and discuss them with your friends.
                </Typography>
            </Box>
            <FooterComponent id={id} />
        </Box>
    )
}
export default PdfPage8;