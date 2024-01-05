import { Box, Button } from "@mui/material"
// import { useEffect, useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';

const TexttoSpeachCheck = ({ isSpeaking, speak, isSpeakingPause, pause, resume, stop, replay }) => {
  
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      {
        !isSpeaking ?
          <Button sx={{ border: "1px solid #5C67C7" }} onClick={speak} disabled={isSpeaking}><PlayArrowIcon /></Button>
          :
          <Box>
            {
              !isSpeakingPause ?
                <Button onClick={pause} sx={{ border: "1px solid #5C67C7" }} disabled={!isSpeaking}><PauseIcon /></Button>
                :
                <Button onClick={resume} sx={{ border: "1px solid #5C67C7" }} disabled={!isSpeaking}><PlayArrowIcon /></Button>
            }
            <Button onClick={stop} sx={{ border: "1px solid #5C67C7" }} color="error" disabled={!isSpeaking}><StopIcon /></Button>
            <Button onClick={replay} sx={{ border: "1px solid #5C67C7" }} disabled={!isSpeaking}><ReplayIcon /></Button>
          </Box>
      }
    </Box>
  )
}
export default TexttoSpeachCheck;