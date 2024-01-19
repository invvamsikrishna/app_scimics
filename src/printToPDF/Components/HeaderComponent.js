import { Box, Typography } from "@mui/material"

const HeaderComponent=({headText})=>{
    return (
        <Box sx={{
            width:"100%",
            minHeight: "100px",
            display: "flex",
            alignItems: "center"
        }} >
            <Box sx={{
                width:"100%",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                backgroundColor: "#92a0ab"
            }}>
                <Typography sx={{
                    fontSize:"22px", fontWeight:"bold", pr: 5,
                }}>{headText}</Typography>
            </Box>
        </Box>
    )
}
export default HeaderComponent;