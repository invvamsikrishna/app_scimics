import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', border:"1px solid gray", borderRadius:"50%"  }}>
      <CircularProgress variant="determinate" {...props} size="200px" color="warning" thickness={1.5} />
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
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({value}) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
      setProgress(value);
  }, [value]);

  return <CircularProgressWithLabel value={progress} />;
}