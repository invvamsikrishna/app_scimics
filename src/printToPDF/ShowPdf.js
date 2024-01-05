import { Box, Button } from '@mui/material';
import Pages from './Pages';
import { useReactToPrint } from 'react-to-print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import personData from "./Assets/data/personData.json"
import { useRef } from 'react';

function ShowPdf({ report }) {
  // console.log(report);
  
  const targetRef = useRef();
  const toPDF = useReactToPrint({
    content: () => targetRef.current,
  });

  // console.log(personData);
  return (
    <Box className="App">

      <Box style={{ display: 'flex', justifyContent: 'start', width: '100vw' }} >
        <Button variant="outlined"
          sx={{
            color: "#5a64c1",
            margin: 3,
            backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", 
            border: "1px solid #5C67C7",
          }}
          onClick={toPDF}>Download <PictureAsPdfIcon />
        </Button>
      </Box>
      <Box ref={targetRef}>
        <Pages personData={personData} />
      </Box>

    </Box>
  );
}

export default ShowPdf;