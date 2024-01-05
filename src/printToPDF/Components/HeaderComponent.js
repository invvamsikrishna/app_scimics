import { Box } from "@mui/material"

const HeaderComponent=({pngImage})=>{
    return (
        <Box component="img" 
            sx={{ width: "100%", height:"130px"}}
            alt="Header"
            src={pngImage}
        />
    )
}
export default HeaderComponent;