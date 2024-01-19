import { Box, Typography } from "@mui/material";
import HeaderComponent from "../Components/HeaderComponent";
import { FullPdfPage, PdfPageCenter } from "../Assets/data/pdfStylings";
import FooterComponent from "../Components/FooterComponent";
import RotatingImages from "../Components/RotatingImages";
import HeadingField from "../Components/HeadingField";
import osicon from "../Assets/images/page2skills/AnalyticalWhite.png"
import CircularWithValueLabeled from "../Components/CircularBar";
import BasicBars from "../Components/BarChartComponent";
import PersonalityProgress from "../Components/PersonalityProgress";

const PdfPage2 = ({ id, overallScore, scoreMinRange, scoreMaxRange }) => {
    const averageScore = ["Not Good", "Normal", "Good", "Super", "Excelent"];
    const clampedScore = Math.min(Math.max(overallScore, scoreMinRange), scoreMaxRange);
    const percentage = ((clampedScore - scoreMinRange) / (scoreMaxRange - scoreMinRange)) * 100;
    const index = Math.floor((percentage / 100) * averageScore.length);
    const clampedIndex = Math.min(Math.max(index, 0), averageScore.length - 1);
    const averageScoreText = averageScore[clampedIndex];
    const skillAchived = ["Poor", "Need Training", "Average", "Need Practice", "Good to go"];
    return (
        <Box style={FullPdfPage}>
            <HeaderComponent headText="I-CAP Insights: Overview and Highlights" />
            <Box style={PdfPageCenter}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    height: "250px"
                }}>
                    <Box sx={{ width: "40%", height: "100%", }}>
                        <RotatingImages overallScore={overallScore} scoreMinRange={scoreMinRange} scoreMaxRange={scoreMaxRange} />
                    </Box>
                    <Box sx={{ width: "55%", height: "100%", }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: "25px", color: "black", textDecoration: "underline", mb: 2, }}>{averageScoreText}</Typography>
                        <Typography sx={{ textAlign: "justify", color: "black", }}>Your Overall I-CAP Score reflects a comprehensive evaluation of your abilities across various domains. With a score of 675, you rank in the 85%, indicating your performance relative to your peers. This aggregate score is a testament to your combined skills in Cognitive Abilities, Technical Proficiency, Communication Skills and Personality and Behavior.</Typography>
                    </Box>
                </Box>

                <Box sx={{
                    width: "100%",
                    height: "300px"
                }}>
                    <HeadingField icon={osicon} heading="Overall Score" />

                    <Box sx={{ width: "100%", height: "100%", display: "flex", }}>
                        <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircularWithValueLabeled value={355} scoreMinRange={0} scoreMaxRange={800} />
                        </Box>
                        <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <BasicBars />
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    width: "100%",
                    height: "370px"
                }}>
                    <HeadingField icon={osicon} heading="Key Strengths And Areas For Improvement" />
                    <Box sx={{ width: "100%", minHeight: "80px", display: "flex", alignItems: "center", }}>
                        <Box sx={{ width: "35%" }} />
                        <Box sx={{ display: "flex", width: "65%", borderLeft: "3px solid gray", }}>
                            {skillAchived.map((msg, index) => (
                                <Typography
                                    key={index}
                                    sx={{
                                        width: '20%',
                                        // paddingLeft: '25px',
                                        // fontWeight: scoreData > index * 20 && scoreData <= (index + 1) * 20 ? 'bold' : 'normal',
                                        borderRight: "3px solid gray",
                                        color: "#7d7d7d",
                                        height: "2rem",
                                        // textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "12px"
                                    }}
                                >
                                    {msg}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                        <PersonalityProgress messageData={"Cognitive Abilities"} scoreData={35} />
                        <PersonalityProgress messageData={"Technical Proficiency"} scoreData={55} />
                        <PersonalityProgress messageData={"Communication Skills"} scoreData={15} />
                        <PersonalityProgress messageData={"Personality and Behaviour"} scoreData={90} />
                </Box>
            </Box>
            <FooterComponent id={id} />
        </Box>
    )
}
export default PdfPage2;