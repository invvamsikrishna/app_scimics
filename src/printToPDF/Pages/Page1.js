import { Box, Typography, styled } from "@mui/material"
import { ApageRenderingBox, aFullPdfPage, } from "../Assets/data/styling";
import CopyrightIcon from '@mui/icons-material/Copyright';
import page1ScimicsLogo from "../Assets/images/logo-scimics.svg"
import page1png from "../Assets/images/page1png.png"
import "@fontsource/courier-prime";

const Page1 = ({ firstName, lastName, assessedOn, batch, universityName, region, course, applicationValidity }) => {
    const HeaderBox = styled(Box)({
        width: "100%", 
        height: "130px", 
        display: "flex", 
        justifyContent: "end", 
        alignItems: "center"
    })
    const topContainer = {
        width:"100%",
        height:"100%",
        backgroundImage: `url(${page1png})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPosition: 'center',
        display:"flex",
        alignItems:"center",
      }
    const FooterBox = styled(Box)({
        borderTop: "dashed 3px black",
        width: '100%',
        height: '64px',
        color: 'gray',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        gap:'3px'
    })
    return (
        <Box style={aFullPdfPage}>
            <HeaderBox>
                <Box component="img" sx={{ width: "15%", height: "50px", marginRight: "40px" }} alt="Header Logo" src={page1ScimicsLogo} />
            </HeaderBox>
            <Box style={ApageRenderingBox}>
                <Box sx={{ width :"100%", height:"550px"}}>
                    <Box style={topContainer}>
                        <Box sx={{width:"78%", color: 'white', display: 'flex', flexDirection:"column", alignItems: 'end', gap:"8px"}}>
                            <Box sx={{display:"flex",alignItems:"center", gap:"30px",}}>
                                <Box component="img"
                                    sx={{ width: "200px", height: "55px" }}
                                    alt="Header Logo"
                                    src={page1ScimicsLogo}
                                />
                                <Typography sx={{fontFamily: "Courier Prime", fontSize:"48px"}}>REPORT</Typography>
                            </Box>
                            <Typography sx={{fontSize:"17px",}}>Skill Gap Analysis Report</Typography>
                            <Box sx={{width:"100%", border:"2px solid white"}}/>
                            <Typography sx={{fontSize:"17px",}}>Assessed on {assessedOn}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Typography sx={{ paddingLeft: "30px", color: 'white',fontSize:"14px" }}>
                    Your training  needs accross skills and knowledge areas critical for employability
                </Typography>
                <Box sx={{backgroundColor: "#0b353f", color: 'white', padding: "30px", width:"70%", display:"flex", flexDirection:"column", gap:"7px"}}>
                    <Box sx={{display:"flex", alignItems:"center", gap:".5rem"}}>
                        <Typography sx={{fontSize:"18px", fontWeight:"bold"}}>{firstName} {lastName} | </Typography>
                        <Typography sx={{fontSize:"14px"}}>{course} | Batch - {batch}</Typography>
                    </Box>
                    <Typography sx={{fontSize:"14px"}}>{universityName}</Typography>
                    <Typography sx={{fontSize:"14px"}}>Region: {region}</Typography>
                    <Typography sx={{fontSize:"14px"}}>Job Application Validity: {applicationValidity}</Typography>
                </Box>
            </Box>
            <FooterBox >
                <CopyrightIcon sx={{ fontSize:"9px"}} /><Typography sx={{ fontSize: "10px", marginRight: "3%" }}>2020 SIMICS. All rights reserved</Typography>
            </FooterBox>

        </Box>
    )
}
export default Page1;