import { Box, Typography } from "@mui/material"

const FooterComponent = ({ id }) => {
    return (
      <Box sx={{
        width:"100%",
        minHeight: "100px",
        display: "flex",
        alignItems: "center"
      }}>
        <Typography sx={{
            fontSize:"25px", pl: 5, color:"black"
        }}>
            Student ID:
        </Typography>
        <Typography sx={{
            fontSize:"25px", fontWeight:"bold", pl: 1, color:"black"
        }}>
            {id}
        </Typography>
      </Box>
    )
  }

 export default FooterComponent;