import { Box, Typography } from "@mui/material"
import CircularWithValueLabeled from "./CircularBar";

const SubCategories =({ icon, category, text, value })=>{
    return(
        <Box sx={{width:"45%"}}>
            <Box sx={{display:"flex", alignItems:"center"}}>
                <Box sx={{ backgroundColor:"gray", borderRadius:"50%", height:"40px", width:"40px", display:"flex", justifyContent:"center", alignItems:"center" }}>
                    <Box component="img" src={icon} alt="O.S"sx={{ width: 25 }}/>
                </Box>
                <Typography sx={{fontWeight:"bold", fontSize:"25px", color:"gray", ml:2}}>{category}</Typography>
            </Box>
            <Typography sx={{ml:"40px", textAlign: "justify", color: "black", height:"100px"}}>
            {text}
            </Typography>
                <Box p={2}/>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", }}>
                <CircularWithValueLabeled value={value} scoreMinRange={0} scoreMaxRange={100} />
            </Box>
        </Box>
    )
}
export default SubCategories;