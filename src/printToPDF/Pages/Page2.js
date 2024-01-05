import { Box, Typography } from "@mui/material";
import page2png from "../Assets/images/page2header.png";
import Footer from "../Components/Footer";
import HeaderComponent from "../Components/HeaderComponent";
import { ApageRenderingBox, aFullPdfPage } from "../Assets/data/styling";
import RotatingImages from "../Components/RotatingImages";
import brain from "../Assets/images/brain.png"
import CircularWithValueLabeled from "../Components/CircularBar";
import { personalityAgreeablenessAchived, personalityConscientiousnessAchived, personalityEmotionalAchived, personalityExtraversionAchived, personalityOpennessAchived } from "../Assets/data/internalData";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import SkillWiseComponent from "../Components/SkillWiseComponent";

const Page2 = ({ id, firstName, lastName, 
    overallScore, scoreMinRange, scoreMaxRange,
    OpennessZScore,
    ConscientiousnessZScore,
    ExtraversionZScore,
    AgreeablenessZScore,
    EmotionalZScore,
    analyticalSkillScore,
    QuantitativeSkillScore,
    EnglishSkillScore, 
    DomainSkillScore,
    ComputerSkillScore,
    CodingSkillScore,
    WETSkillScore,
    institutePercentile, nationalPercentile, regionalPercentile }) => {
    const PercentileData = [
        {
            name: "Institute",
            score: institutePercentile
        },
        {
            name: "National",
            score: nationalPercentile
        },
        {
            name: "Regional",
            score: regionalPercentile
        }
    ]
    const minValue = -2;
    const maxValue = 2;
    const convertToPercentage = (value) => {
        const clampedValue = Math.max(minValue, Math.min(maxValue, value));
        const percentage = ((clampedValue - minValue) / (maxValue - minValue)) * 100;
        return percentage;
    };

    const OpennessScore = convertToPercentage(OpennessZScore);
    const ConscientiousnessScore = convertToPercentage(ConscientiousnessZScore);
    const ExtraversionScore = convertToPercentage(ExtraversionZScore);
    const AgreeablenessScore = convertToPercentage(AgreeablenessZScore);
    const EmotionalStabilityScore = convertToPercentage(EmotionalZScore);

    const addMessageData = (score, msg) => {
        if (score >= 0 && score <= 20) {
            return msg[0];
        } else if (score > 20 && score <= 40) {
            return msg[1];
        } else if (score > 40 && score <= 60) {
            return msg[2];
        } else if (score > 60 && score <= 80) {
            return msg[3];
        } else if (score > 80 && score <= 100) {
            return msg[4];
        } else {
            return msg[0];
        }
    };
    const setOpennessMessage = addMessageData(OpennessScore, personalityOpennessAchived);
    const setConscientiousnessMessage = addMessageData(ConscientiousnessScore, personalityConscientiousnessAchived);
    const setExtraversionMessage = addMessageData(ExtraversionScore, personalityExtraversionAchived);
    const setAgreeablenessMessage = addMessageData(AgreeablenessScore, personalityAgreeablenessAchived);
    const setEmotionalStabilityMessage = addMessageData(EmotionalStabilityScore, personalityEmotionalAchived);

    const averageScore = ["Not Good", "Normal", "Good", "Super", "Excelent"];
    const clampedScore = Math.min(Math.max(overallScore, scoreMinRange), scoreMaxRange);
    const percentage = ((clampedScore - scoreMinRange) / (scoreMaxRange - scoreMinRange)) * 100;
    const index = Math.floor((percentage / 100) * averageScore.length);
    const clampedIndex = Math.min(Math.max(index, 0), averageScore.length - 1);
    const averageScoreText = averageScore[clampedIndex];

    return (
        <Box style={aFullPdfPage}>
            <HeaderComponent pngImage={page2png} />
            <Box style={ApageRenderingBox}>
                <Typography sx={{ color: "white", padding: "30px" }}>Your SCIMICS Score, Percentiles, Personality Type and Skill-wise performance snapshot</Typography>
                <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
                    <Box sx={{ width: "25%", height: "100px", padding: "30px", }}>
                        <RotatingImages overallScore={overallScore} scoreMinRange={scoreMinRange} scoreMaxRange={scoreMaxRange} />
                    </Box>
                    <Box sx={{ width: "75%", height: "100px", color: "white" }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "35px", paddingLeft: "30px" }}>{averageScoreText}</Typography>
                        <Typography sx={{ textAlign: "justify", padding: "0px 30px" }}>You have an above average overall score, which is an indicator of your performance across sections and past academics. You therefore have a good chance of being shortlisted and selected for opportunities across job roles given your sectional scores suffice respective job role criteria.</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "100%", height: "3px", backgroundColor: "blue", marginTop: "40px" }} />
                <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%", color: "white", margin: "40px 0px" }}>
                    <Box sx={{ width: "31%" }}>
                        <Typography sx={{ fontSize: "25px" }}>SCIMICS Score</Typography>
                        <CircularWithValueLabeled value={overallScore} scoreMinRange={scoreMinRange} scoreMaxRange={scoreMaxRange} />
                        <Typography>This score is seen as an indicator of your overall profile and performance across different skill aspects</Typography>
                        <Typography>*Score Range : {scoreMinRange} to {scoreMaxRange}</Typography>
                    </Box>
                    <Box sx={{ width: "31%", borderLeft: "dashed 1px white", borderRight: "dashed 1px white" }}>
                        <Typography sx={{ fontSize: "25px" }}>Percentile</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <RadarChart height={300} width={300}
                                outerRadius="50%" data={PercentileData} >
                                {/* sx={{backgroundColor:"#7c93c4", borderColor:'3px solid #68dbd1'}} */}
                                <PolarGrid stroke="gray" fill="#ceae79" fillOpacity={0.5} />
                                <PolarAngleAxis sx={{ color: "white" }} dataKey="name" fontSize='15px' />
                                <Radar dataKey="score" stroke="#ffb73a"
                                    fill="#ceae79" fillOpacity={0.5} />
                            </RadarChart>
                        </Box>

                    </Box>
                    <Box sx={{ width: "31%" }}>
                        <Typography sx={{ fontSize: "25px" }}>Personality Type</Typography>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Box component="img"
                                sx={{ width: "60%", height: "60%" }}
                                alt="Brain"
                                src={brain} /></Box>
                        <Typography sx={{ textAlign: "center", fontSize: "35px" }}>uDEAN</Typography>
                        <Typography sx={{ textAlign: "center" }}>{setOpennessMessage} | {setConscientiousnessMessage} | {setExtraversionMessage} | {setAgreeablenessMessage} | {setEmotionalStabilityMessage}</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: "100%", height: "3px", backgroundColor: "blue" }} />
                <Box sx={{color:"white", display:"flex",flexDirection:"column", gap:"10px", padding:"30px"}}>
                    <Typography sx={{fontSize:"30px", fontWeight:"bold"}}>Skill-wise Performance</Typography>
                    <SkillWiseComponent analyticalSkillScore={analyticalSkillScore}
        QuantitativeSkillScore={QuantitativeSkillScore}
        EnglishSkillScore={EnglishSkillScore} 
        DomainSkillScore={DomainSkillScore}
        ComputerSkillScore={ComputerSkillScore}
        CodingSkillScore={CodingSkillScore}
        WETSkillScore={WETSkillScore}/>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"#66a91e"}}/>
                        <Box sx={{display:"flex"}}>
                            <Typography>You will clear the required cut-off score in this skill for </Typography>
                            <Typography sx={{color:"#66a91e"}}>more than 80% job opportunities</Typography>
                        </Box>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"#ecc617"}}/>
                        <Box sx={{display:"flex"}}>
                            <Typography>You will clear the required cut-off score in this skill for </Typography>
                            <Typography sx={{color:"#ecc617"}}>more than 50% job opportunities</Typography>
                            <Typography>. With some practice you can jump to green</Typography>
                        </Box>
                    </Box><Box sx={{display:"flex", alignItems:"center"}}>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"#cfcfcf"}}/>
                        <Typography>You need training on this skill to clear the required cut off score for most job opportunities</Typography>
                    </Box>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                        <Box sx={{width:"15px", height:"15px", borderRadius:"50%", backgroundColor:"red"}}/>
                        <Typography>You did not attempt this section. You need to attempt it to be considered for the job roles which require the associated skill</Typography>
                    </Box>
                </Box>
            </Box>
            <Footer id={id} firstName={firstName} lastName={lastName} />
        </Box>
    )
}
export default Page2;