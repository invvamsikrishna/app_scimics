import { Box, Typography } from "@mui/material"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import HeaderComponent from "../Components/HeaderComponent";
import page4svg from "../Assets/images/page4header.png";
import { aFullPdfPage, pageRenderingBox } from "../Assets/data/styling";
import Footer from "../Components/Footer";
import CircularWithValueLabel from "../Components/CircularProgressBar";
const alignment = {
    width:"25%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    gap:"10px",
    marginBottom:"30px"
}
const fontColor ={
    color:"white",
    fontSize:"15px",
    textAlign: 'justify'
}
const Page4 = ({ id,firstName, lastName, analyticalSkillScore,QuantitativeSkillScore,EnglishSkillScore,
    DomainSkillScore,ComputerSkillScore,CodingSkillScore, WETSkillScore, skillDataArray}) => {
        // console.log(skillDataArray[0]);
    return (
        <Box style={aFullPdfPage}>
            <HeaderComponent pngImage={page4svg}/>
            <Box id='page5' style={pageRenderingBox} >
                <Typography sx={{ color:"white", fontSize:"13px"}}>Scores across SCIMICS sections of Analytical, Quantitative, English, Domain, Computer Fundamentals, Coding & WET</Typography>
                <Box sx={{ width: "100%", display: "flex", justifyContent:"space-between" }}>
                    <Box sx={{ width: "40%", display:"flex", flexDirection:"column", gap:"1rem" }}>
                        <Typography style={fontColor}>This chart plots your <b>percentage score across skill dimensions</b> to display an overall picture along with a comparison with the highest scores obtained nationally and regionally in each of these areas to understand relative gaps.</Typography>
                        <Typography style={fontColor}>The <b>light blue chart</b> represents <b>maximum regional scores</b> obtained in respective competencies. The <b>purple chart</b> represents <b>maximum national scores</b> obtained in respective competencies. The <b>yellow chart</b> represents <b>your score</b> in respective competencies.</Typography>
                    </Box>
                    <Box sx={{ width: "60%", }}>
                        <RadarChart height={400} width={500}
                            outerRadius="60%" data={skillDataArray[0]} >
                                 {/* sx={{backgroundColor:"#7c93c4", borderColor:'3px solid #68dbd1'}} */}
                            <PolarGrid stroke="gray" fill="#ceae79" fillOpacity={0.5}/>
                            <PolarAngleAxis sx={{color:"white"}} dataKey="skills" fontSize='15px'/>
                            <Radar  dataKey="persentageScore" stroke="#ffb73a"
                                fill="#ceae79" fillOpacity={0.5} />
                        </RadarChart>
                    </Box>
                </Box>
                <Box sx={{ width: '95%', height: '3px', bgcolor: 'white', margin: '2vh 30px', }}/>
                <Box sx={{color:"white",display:"flex", flexWrap:"wrap", width:"100%"}}>
                    <Box style={alignment}><CircularWithValueLabel value={analyticalSkillScore} /><Typography>Analytical</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={QuantitativeSkillScore} /><Typography>Quantitative</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={EnglishSkillScore} /><Typography>English</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={DomainSkillScore} /><Typography>Domain</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={ComputerSkillScore} /><Typography>Computer Fundamentals</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={CodingSkillScore} /><Typography>Coding</Typography></Box>
                    <Box style={alignment}><CircularWithValueLabel value={WETSkillScore} /><Typography>WET</Typography></Box>
                </Box>
            </Box>
            <Footer  id={id} firstName={firstName} lastName={lastName} />
        </Box>
    )
}
export default Page4;