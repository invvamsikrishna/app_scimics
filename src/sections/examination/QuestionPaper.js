import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { connect } from "react-redux";
import { getExamQuestions, getNextQuestion, getPrevQuestion, setAnstoQues, clearAnstoQues, markReviewtoQues, getNextTest } from "../../actions/exam";
import TimerWidget from "./TimerWidget";
import { COMMON_ERROR_MSG, NO_AVAILABLE_TESTS_THROW, QUES_STATUS } from "../../constants";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { useSnackbar } from "../../components/SnackBar";
import { LoadingButton } from "@mui/lab";
import { useAlertDialog } from "../../components/dialog/AlertDialog";

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.success.main,
  },
}));

const QuestionPaper = ({ account, exam, getExamQuestions, setAnstoQues, clearAnstoQues, markReviewtoQues, getPrevQuestion, getNextQuestion, getNextTest }) => {
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const showAlert = useSnackbar();
  const showAlertDialog = useAlertDialog();

  const [isLoading, setLoading] = useState(false);

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
    var markReview = exam.data[exam.currentTest]?.questions?.filter((e) => [QUES_STATUS[3], QUES_STATUS[4]].includes(e.status)).length;
    var description = `Are you sure, you want to move to the next section? ${markReview > 0 ? `You currently have ${markReview} marked questions for review.` : ""}`;

    if (exam.data.length - 1 <= exam.currentTest) {
      description = "Are you sure, you want to submit the exam?";
    }

    showAlertDialog({
      title: "Confirmation ?",
      description: description,
      agreeCallback: () => {
        timerRef.current.clearTimer();
      },
    });
  };

  const handleFinish = async () => {
    var result = getNextTest();
    if (result == true) return;

    if (result == NO_AVAILABLE_TESTS_THROW) {
      setLoading(true);
      try {
        const response = await UserServices.validateExamTest(account.user.user_pk, exam.data);
        const responseData = response.data?.data ?? {};
        setLoading(false);

        navigate("/user/result", { replace: true, state: responseData });
      } catch (err) {
        showAlert(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        setLoading(false);
      }
    }
  };

  return (
    <>
      {exam.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!exam.isLoading && exam.errorMessage && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <Typography color="error">{exam.errorMessage}</Typography>
        </Box>
      )}

      {!exam.isLoading && !exam.errorMessage && (
        <div>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" fontSize={20} fontWeight={500}>
              {exam.data[exam.currentTest]?.testname ?? "-"}
            </Typography>

            <TimerWidget ref={timerRef} handleFinish={handleFinish} />
          </Stack>

          <Box p={2} />

          {exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension && (
            <>
              <Box sx={{ bgcolor: "background.paper", px: { xs: 3, md: 6 }, py: 4, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
                  Comprehension
                </Typography>

                <Typography variant="subtitle1" fontWeight="normal" textAlign="justify">
                  {exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension ?? "-"}
                </Typography>
              </Box>

              <Box p={1} />
            </>
          )}

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
              <RadioGroup value={exam.data[exam.currentTest]?.questions[exam.currentQues]?.user_answer ?? ""} name="answer" onChange={(e) => setAnstoQues(e.target.value)}>
                {exam.data[exam.currentTest]?.questions[exam.currentQues]?.options?.map((item, index) => (
                  <FormControlLabel key={index} value={item} label={item} control={<StyledRadio />} />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box p={2} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => clearAnstoQues()}>
                Clear Response
              </Button>

              <Button variant="outlined" onClick={() => markReviewtoQues()}>
                Mark for review and Next
              </Button>
            </div>

            <div>
              <Button variant="outlined" color="secondary" sx={{ mr: 1 }} onClick={() => getPrevQuestion()}>
                Previous
              </Button>

              <Button variant="outlined" color="secondary" sx={{ mr: 3 }} onClick={() => getNextQuestion()}>
                Next
              </Button>

              <LoadingButton loading={isLoading} variant="contained" color="success" onClick={handleClearTimer}>
                Finish
              </LoadingButton>
            </div>
          </Stack>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    exam: state.exam,
  };
};

export default connect(mapStateToProps, { getExamQuestions, setAnstoQues, clearAnstoQues, markReviewtoQues, getPrevQuestion, getNextQuestion, getNextTest })(QuestionPaper);
