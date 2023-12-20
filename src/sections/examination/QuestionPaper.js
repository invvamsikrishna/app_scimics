import React, { useEffect, useRef } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { connect } from "react-redux";
import { getExamQuestions, getNextQuestion, getPrevQuestion, setAnstoQues, clearAnstoQues, markReviewtoQues, getNextTest } from "../../actions/exam";
import TimerWidget from "./TimerWidget";

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.success.main,
  },
}));

const QuestionPaper = ({ exam, getExamQuestions, setAnstoQues, clearAnstoQues, markReviewtoQues, getPrevQuestion, getNextQuestion, getNextTest }) => {
  const timerRef = useRef(null);

  useEffect(() => {
    getExamQuestions();
  }, []);

  useEffect(() => {
    if (exam.currentTest != null) {
      if (exam.data[exam.currentTest]?.duration != null) {
        console.log("start timer");
        timerRef.current.startTimer(exam.data[exam.currentTest].duration);
      }
    }
  }, [exam.currentTest]);

  const handleClearTimer = () => {
    timerRef.current.clearTimer();
  };

  const handleFinish = () => {
    getNextTest();
    console.log("hai");
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontSize={20} fontWeight={500}>
          {exam.data[exam.currentTest]?.testname ?? "-"}
        </Typography>

        <TimerWidget ref={timerRef} handleFinish={handleFinish} />
      </Stack>

      <Box p={2} />

      <Box sx={{ bgcolor: "background.paper", px: { xs: 3, md: 6 }, py: 4, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
          Question {exam.currentQues + 1 ?? "-"}
        </Typography>

        <Typography variant="subtitle1" fontWeight={500}>
          {exam.data[exam.currentTest]?.questions[exam.currentQues]?.question ?? "-"}
        </Typography>
      </Box>

      <Box p={1} />

      <Box sx={{ bgcolor: "background.paper", px: { xs: 3, md: 6 }, py: 4, borderRadius: 2 }}>
        <FormControl>
          <RadioGroup value={exam.data[exam.currentTest]?.questions[exam.currentQues]?.answer ?? ""} name="answer" onChange={(e) => setAnstoQues(e.target.value)}>
            {exam.data[exam.currentTest]?.questions[exam.currentQues]?.options?.map((item, index) => (
              <FormControlLabel key={index} value={item} label={item} control={<StyledRadio />} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box p={2} />

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <div>
          <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={() => getPrevQuestion()}>
            Previous
          </Button>

          <Button variant="outlined" color="secondary" onClick={() => getNextQuestion()}>
            Next
          </Button>
        </div>

        <div>
          <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => clearAnstoQues()}>
            Clear Response
          </Button>

          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => markReviewtoQues()}>
            Mark for review and Next
          </Button>

          <Button variant="contained" color="success" onClick={handleClearTimer}>
            Finish
          </Button>
        </div>
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    exam: state.exam,
  };
};

export default connect(mapStateToProps, { getExamQuestions, setAnstoQues, clearAnstoQues, markReviewtoQues, getPrevQuestion, getNextQuestion, getNextTest })(QuestionPaper);
