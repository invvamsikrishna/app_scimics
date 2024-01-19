import { Box, Typography } from "@mui/material";

const HeadingField =({ icon, heading}) =>{

    return(
        <Box sx={{
            display: "inline-flex",
            alignItems:"center",
            pl: 2,
            pr: 4,
            backgroundColor: "#92a0ab",
            minHeight: "45px",
            borderTopRightRadius:"25px",
            borderBottomRightRadius:"25px",
        }}>
            <Box component="img" src={icon} alt="O.S"sx={{ width: 25, mr: 1, }}/>
            <Typography sx={{
            fontSize:"25px",
            fontWeight:"bold"
            }}>{heading}</Typography>
        </Box>
    )
}
export default HeadingField;