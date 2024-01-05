import { Box, Typography } from "@mui/material"
import PersonalityProgress from "../Components/PersonalityProgress";
import { bFullPDFPage, barHeaderTypography, eachPersonalityBox, eachPersonalityEndTypography, eachPersonalityInnerBox, eachPersonalityPageEndBox, pageRenderingBox } from "../Assets/data/styling";
import page10to11png from "../Assets/images/page10to11header.png";
import Footer from "../Components/Footer";
import HeaderComponent from "../Components/HeaderComponent";
import { personalityAgreeablenessAchived, personalityConscientiousnessAchived, personalityEmotionalAchived, personalityExtraversionAchived, personalityOpennessAchived } from "../Assets/data/internalData";

const Page10 = ({ id,firstName, lastName,
    OpennessZScore, 
    ConscientiousnessZScore, 
    ExtraversionZScore,  
    AgreeablenessZScore, 
    EmotionalZScore }) => {
    
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

    const addMessageData = (score, msg )=>{
        if (score >= 0 && score <= 20) {
            return msg[0].charAt(0)+".A";
        } else if (score > 20 && score <= 40) {
            return msg[1].charAt(0);
        } else if (score > 40 && score <= 60) {
            return msg[2].split(' ')[1]?.[0]?.toLowerCase();
        } else if (score > 60 && score <= 80) {
            return msg[3].split(' ')[1]?.[0]?.toLowerCase();
        } else if (score > 80 && score <= 100) {
            return msg[4].charAt(0);
        } else {
            return msg[0].charAt(0)+".A";
        }
    };
    const setOpennessMessage = addMessageData(OpennessScore, personalityOpennessAchived);
    const setConscientiousnessMessage = addMessageData(ConscientiousnessScore, personalityConscientiousnessAchived);
    const setExtraversionMessage = addMessageData(ExtraversionScore, personalityExtraversionAchived);
    const setAgreeablenessMessage = addMessageData(AgreeablenessScore, personalityAgreeablenessAchived);
    const setEmotionalStabilityMessage = addMessageData(EmotionalStabilityScore, personalityEmotionalAchived);

    return (
        <Box style={bFullPDFPage}>
            <HeaderComponent pngImage={page10to11png}/>
            <Box id='page10' style={pageRenderingBox}>
                <Typography>Detailed description of your profile on each of the personality aspect</Typography>
                <Box style={eachPersonalityBox} >
                    <Box style={eachPersonalityInnerBox}>
                        <Typography style={barHeaderTypography} >Openness</Typography>
                        <Typography> - General appreciation for imagination and variety of experience.</Typography>
                    </Box>
                    <PersonalityProgress  messageData={setOpennessMessage} messagesArray={personalityOpennessAchived} scoreData={OpennessScore} />
                    <Typography style={eachPersonalityEndTypography} >You are likely to have a balanced view towards experimentation and learning. Hence, you are likely to exercise controlled experimentation in problem solving.</Typography>
                </Box>
                <Box style={eachPersonalityBox} >
                    <Box style={eachPersonalityInnerBox}>
                        <Typography style={barHeaderTypography}>Conscientiousness</Typography>
                        <Typography> - General appreciation for imagination and variety of experience.</Typography>
                    </Box>
                    <PersonalityProgress  messageData={setConscientiousnessMessage} messagesArray={personalityConscientiousnessAchived} scoreData={ConscientiousnessScore} />
                    <Typography style={eachPersonalityEndTypography}>You are likely to prefer a spontaneous approach over a systematic approach towards problem solving.</Typography>
                </Box>
                <Box style={eachPersonalityPageEndBox} >
                    <Box style={eachPersonalityInnerBox}>
                        <Typography style={barHeaderTypography}>Extraversion</Typography>
                        <Typography> - General appreciation for imagination and variety of experience.</Typography>
                    </Box>
                    <PersonalityProgress  messageData={setExtraversionMessage} messagesArray={personalityExtraversionAchived} scoreData={ExtraversionScore} />
                    <Typography style={eachPersonalityEndTypography}>You are likely to be assertive, talkative, cheerful and have a the tendency to seek stimulation in the company of others. Hence, you are likely to be successful in customer/team oriented jobs.</Typography>
                </Box>
            </Box>
            <Footer  id={id} firstName={firstName} lastName={lastName} />

            <HeaderComponent pngImage={page10to11png}/>
            <Box id='page11' style={pageRenderingBox}>
                <Box style={eachPersonalityBox} >
                    <Box style={eachPersonalityInnerBox}>
                        <Typography style={barHeaderTypography}>Agreeableness</Typography>
                        <Typography> - General appreciation for imagination and variety of experience.</Typography>
                    </Box>
                    <PersonalityProgress  messageData={setAgreeablenessMessage} messagesArray={personalityAgreeablenessAchived} scoreData={AgreeablenessScore} />
                    <Typography style={eachPersonalityEndTypography}>You are likely to be friendly and generally get along well with others. You are likely to thrive in roles requiring team interaction.</Typography>
                </Box>
                <Box style={eachPersonalityPageEndBox} >
                    <Box style={eachPersonalityInnerBox}>
                        <Typography style={barHeaderTypography}>Emotional Stability</Typography>
                        <Typography> - General appreciation for imagination and variety of experience.</Typography>
                    </Box>
                    <PersonalityProgress  messageData={setEmotionalStabilityMessage} messagesArray={personalityEmotionalAchived} scoreData={EmotionalStabilityScore} />
                    <Typography style={eachPersonalityEndTypography}>You are likely to be an emotional and sensitive person. Hence, you might come across as reactive and excitable</Typography>
                </Box>
            </Box>
            <Footer  id={id} firstName={firstName} lastName={lastName} />
            <Box>
            </Box>
        </Box>
    )
}
export default Page10;