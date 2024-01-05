import { Box, Typography } from "@mui/material"
import LinearWithValueLabel from "./percentageBar";

const PersonalityProgress = ({ messageData, messagesArray, scoreData }) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "25px", borderBottom: "3px solid lightgray", paddingBottom: "1.5rem" }}>
            <Typography sx={{ width: "20%", fontSize:"15px" }} >{messageData}</Typography>
            <Box sx={{ width: "80%", height:"180px",}}>
                <Box sx={{ display: "flex", width: "100%", height:"4rem",  borderLeft: "5px solid gray",}}>
                    {messagesArray.map((msg, index) => (
                        <Typography
                            key={index}
                            sx={{
                                width: '20%',
                                // paddingLeft: '25px',
                                fontWeight: scoreData > index * 20 && scoreData <= (index + 1) * 20 ? 'bold' : 'normal',
                                borderRight: "5px solid gray",
                                color: scoreData > index * 20 && scoreData <= (index + 1) * 20 ? 'black' : "#7d7d7d",
                                height: "6rem",
                                textAlign: "center",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                fontSize:"12px"
                            }}
                        >
                            {msg}
                        </Typography>
                    ))}
                </Box>
                <Box sx={{ height:"2rem", borderLeft: "5px solid gray",}}>
                    <LinearWithValueLabel scoreData={scoreData} />
                </Box>
            </Box>
        </Box>
    )
}
export default PersonalityProgress;