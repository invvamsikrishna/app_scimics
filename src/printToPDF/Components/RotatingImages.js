import { Box } from "@mui/material"
import arrowA from "../Assets/images/circlearrow1.png"
import arrowB from "../Assets/images/circlearrow2.png"
import arrowC from "../Assets/images/circlearrow3.png"
import arrowD from "../Assets/images/circlearrow4.png"
import arrowE from "../Assets/images/circlearrow5.png"
const RotatingImages = ({ overallScore, scoreMinRange, scoreMaxRange }) => {
  const images = [arrowA, arrowB, arrowC, arrowD, arrowE];
  const clampedScore = Math.min(Math.max(overallScore, scoreMinRange), scoreMaxRange);
  const percentage = ((clampedScore - scoreMinRange) / (scoreMaxRange - scoreMinRange)) * 100;
  // Calculate the index based on the percentage and the length of the images array
  const index = Math.floor((percentage / 100) * images.length);
  const clampedIndex = Math.min(Math.max(index, 0), images.length - 1);
  return (
    <Box>
      <img
        src={images[clampedIndex]}
        alt={`Image${clampedIndex + 1}`}
        style={{width: '100%', height: '40%' }}
      />
    </Box>
  );
};
export default RotatingImages;