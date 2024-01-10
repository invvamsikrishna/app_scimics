import { Box, Button, Typography, FormControl, FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import { styled } from "@mui/styles";
import { useEffect, useState } from "react";

const StyledRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.text.secondary,
    "&.Mui-checked": {
        color: theme.palette.success.main,
    },
}));
const AdminGeneratedQue = ({ items, index, onApproveQue, disabledButtons, value, setAnstoChange, anstoChange }) => {
    // const [ChangingAnswer,setChangingAnswer]=useState("")
    // const [isChanaged,setisChanaged]=useState(false)
    // useEffect(()=>{
    //     if(!isChanaged){
    //         setChangingAnswer(items.correct_answer)
    //     }else{
    //         setChangingAnswer(anstoChange)
    //     }
    // },[value])
    return (
        <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" }, marginBottom: 1 }}>
            <Typography>Question {index + 1} <span style={{ color: "gray" }}>(Category: {items.category})</span></Typography>
            <Box p={1} />

            <Typography>{items.question}</Typography>
            <Box p={1} />

            <Box sx={{ display: "flex" }}>
                <Box sx={{ width: "88%" }} >
                    <FormControl>
                        <RadioGroup value={items.correct_answer} 
                        // onChange={(e) => {setAnstoChange(e.target.value); setisChanaged(true)}}
                        >
                            {items.options.map((item, i) => {
                                return (
                                    <FormControlLabel
                                        key={i} value={item} label={item}
                                        control={<StyledRadio />} />
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ width: "10%", display: "flex", alignItems: "end", marginRight: "6" }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={() => onApproveQue(items, index)}
                        disabled={disabledButtons.includes(index)}
                    >
                        Approve
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default AdminGeneratedQue;