import { Box, Typography } from "@mui/material";
import AnalyticalWhite from "../Assets/images/page2skills/AnalyticalWhite.png";
import CodingWhite from "../Assets/images/page2skills/CodingWhite.png";
import ComputerWhite from "../Assets/images/page2skills/ComputerWhite.png";
import DomainWhite from "../Assets/images/page2skills/DomainWhite.png";
import EnglishWhite from "../Assets/images/page2skills/EnglishWhite.png";
import QuantitativeWhite from "../Assets/images/page2skills/QuantitativeWhite.png";
import WetWhite from "../Assets/images/page2skills/WetWhite.png";

import AnalyticalGry from "../Assets/images/page2skills/AnalyticalGry.png";
import CodingGry from "../Assets/images/page2skills/CodingGry.png";
import ComputerGry from "../Assets/images/page2skills/ComputerGry.png";
import DomainGry from "../Assets/images/page2skills/DomainGry.png";
import EnglishGry from "../Assets/images/page2skills/EnglishGry.png";
import QuantitativeGry from "../Assets/images/page2skills/QuantitativeGry.png";
import WetGry from "../Assets/images/page2skills/WetGry.png";

const SkillWiseComponent = ({ analyticalSkillScore,
    QuantitativeSkillScore,
    EnglishSkillScore,
    DomainSkillScore,
    ComputerSkillScore,
    CodingSkillScore,
    WETSkillScore }) => {
        const greenSkills = [
            {
              name: "Analytical",
              score: analyticalSkillScore,
              image: AnalyticalWhite,
              color:"#66a91e"
            },
            {
              name: "Quantitative",
              score: QuantitativeSkillScore,
              image: QuantitativeWhite,
              color:"#66a91e"
            },
            {
                name: "English",
                score: EnglishSkillScore,
                image: EnglishWhite,
                color:"#66a91e"
            },
            {
                name: "Domain",
                score: DomainSkillScore,
                image: DomainWhite,
                color:"#66a91e"
            },
            {
                name: "Computer Fundamentals",
                score: ComputerSkillScore,
                image: ComputerWhite,
                color:"#66a91e"
            },
            {
                name: "Coding",
                score: CodingSkillScore,
                image: CodingWhite,
                color:"#66a91e"
            },
            {
                name: "WET",
                score: WETSkillScore,
                image: WetWhite,
                color:"#66a91e"
            }
          ];
        
          const graySkills = [
            {
              name: "Analytical",
              score: analyticalSkillScore,
              image: AnalyticalGry,
              color:"#cfcfcf"
            },
            {
              name: "Quantitative",
              score: QuantitativeSkillScore,
              image: QuantitativeGry,
              color:"#cfcfcf"
            },{
                name: "English",
                score: EnglishSkillScore,
                image: EnglishGry,
                color:"#cfcfcf"
            },
            {
                name: "Domain",
                score: DomainSkillScore,
                image: DomainGry,
                color:"#cfcfcf"
            },
            {
                name: "Computer Fundamentals",
                score: ComputerSkillScore,
                image: ComputerGry,
                color:"#cfcfcf"
            },
            {
                name: "Coding",
                score: CodingSkillScore,
                greenImage: CodingWhite,
                image: CodingGry,
                color:"#cfcfcf"
            },
            {
                name: "WET",
                score: WETSkillScore,
                image: WetGry,
                color:"#cfcfcf"
            }
          ];
        

    return (
        <Box sx={{ width: "100%", height: "150px", display: "flex", gap: "1rem" }}>
            {
                greenSkills.map((skill, index) => (
            <Box sx={{display:"flex"}} id="greenImagesDisplay" key={index}>
                <Box sx={{ borderBottom:"2px solid #66a91e",borderLeft:"2px solid #66a91e",borderTop:"2px solid #66a91e", width:"10px", height:"100%",}}/>
                <Box sx={{}}>
                    <Box sx={{backgroundColor:"#66a91e", height:"10px",marginBottom:"10px",marginTop:"10px"}}/>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box sx={{backgroundColor:"#66a91e",borderRadius:"50%", width:"80px", height:"80px", display:"flex",justifyContent:"center", alignItems:"center"}}>
                            <Box component="img" 
                                    sx={{ width: "80%", height:"80%"}}
                                    alt="The End"
                                    src={AnalyticalWhite}
                                    />
                        </Box>
                        <Typography sx={{fontSize:"25px"}}>Analytical</Typography>
                    </Box>
                </Box>
                <Box sx={{ borderBottom:"2px solid #66a91e",borderRight:"2px solid #66a91e",borderTop:"2px solid #66a91e", width:"10px", height:"100%",}}/>
            </Box>
                ))
            }
            

            <Box sx={{display:"flex"}} id="grayImagesDisplay">
                <Box sx={{ borderBottom:"2px solid #cfcfcf",borderLeft:"2px solid #cfcfcf",borderTop:"2px solid #cfcfcf", width:"10px", height:"100%",}}/>
                <Box sx={{}}>
                    <Box sx={{backgroundColor:"#cfcfcf", height:"10px",marginBottom:"10px",marginTop:"10px"}}/>
                    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <Box sx={{backgroundColor:"#cfcfcf",borderRadius:"50%", width:"80px", height:"80px", display:"flex",justifyContent:"center", alignItems:"center"}}>
                            <Box component="img" 
                                    sx={{ width: "80%", height:"80%"}}
                                    alt="The End"
                                    src={QuantitativeGry}
                                    />
                        </Box>
                        <Typography sx={{fontSize:"25px"}}>Quantitative</Typography>
                    </Box>
                </Box>
                <Box sx={{ borderBottom:"2px solid #cfcfcf",borderRight:"2px solid #cfcfcf",borderTop:"2px solid #cfcfcf", width:"10px", height:"100%",}}/>
            </Box>
        </Box>
    )
}
export default SkillWiseComponent;