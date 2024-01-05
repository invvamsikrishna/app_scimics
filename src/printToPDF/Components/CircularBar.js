import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  // console.log(props);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', border:"1px solid gray", borderRadius:"50%"  }}>
      <CircularProgress variant="determinate" value={props.range} size="200px" color="success" thickness={1.5} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border:"1px solid gray",
          borderRadius:"50%",
          margin:"6px",
        }}
      >
        <Typography variant="caption" component="div" color="white"  sx={{fontSize:"40px"}}>
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabeled({value, scoreMinRange, scoreMaxRange}) {
  const [progress, setProgress] = React.useState(0);
  const [range,setRange]=React.useState(0);
  React.useEffect(() => {
    const clampedValue = Math.min(scoreMaxRange, Math.max(scoreMinRange, value));
    const percentage = ((clampedValue - scoreMinRange) / (scoreMaxRange - scoreMinRange)) * 100;
    setRange(Math.ceil(percentage));
    setProgress(value);
  }, [value]);
  return <CircularProgressWithLabel value={progress[0]} range={range} />;
}