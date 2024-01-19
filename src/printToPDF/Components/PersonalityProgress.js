import { Box, Typography } from "@mui/material"
import LinearWithValueLabel from "./percentageBar";

const PersonalityProgress = ({ messageData, scoreData }) => {
    return (
        <Box sx={{ width:"100%", minHeight:"40px", display:"flex",}}>
            <Typography sx={{ width: "35%", fontSize:"18px", color:"#92a0ab",}} >{messageData}</Typography>
            <Box sx={{ width: "65%",}}>
                <LinearWithValueLabel scoreData={scoreData} />
            </Box>
        </Box>
    )
}
export default PersonalityProgress;