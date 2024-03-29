import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { connect } from "react-redux";
import { getExamQuestions, getNextQuestion, getPrevQuestion, setAnstoQues, clearAnstoQues, markReviewtoQues, getNextTest } from "../../actions/exam";
import TimerWidget from "./TimerWidget";
import { COMMON_ERROR_MSG, NO_AVAILABLE_TESTS_THROW, QUES_STATUS } from "../../constants";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { LoadingButton } from "@mui/lab";
import TexttoSpeachCheck from "../../components/TexttoSpeachCheck";
import { useSpeechSynthesis } from "../../components/createContextCodes/SpeechSynthesisContext";
import { useAlertContext } from "../../components/AlertProvider";

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.success.main,
  },
}));

const QuestionPaper = ({ account, exam, getExamQuestions, setAnstoQues, clearAnstoQues, markReviewtoQues, getPrevQuestion, getNextQuestion, getNextTest }) => {
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { showLoading, hideLoading, showSnackbar, showAlertDialog } = useAlertContext();

  const [comprehensionText, setcomprehensionText] = useState("");
  const { stop } = useSpeechSynthesis();
  const [raviIndiaVoice, setRaviIndiaVoice] = useState(null);

  useEffect(() => {
    getExamQuestions();
    stop();
  }, []);

  useEffect(() => {
    const synthesis = window.speechSynthesis;
    const voices = synthesis.getVoices();
    const findingVoice = voices.find((voice) => voice.name === "Microsoft Ravi - English (India)" && voice.lang === "en-IN");
    setRaviIndiaVoice(findingVoice);

    if (exam.currentTest === 2 && exam.data[exam.currentTest]?.questions[exam.currentQues]?.category === "English Listening") {
      setcomprehensionText(exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension);
      // console.log(exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension);
    } else {
      // console.log("--");
      setcomprehensionText("-");
    }
  }, [exam.data[exam.currentTest]?.questions[exam.currentQues]]);

  const onPlayingNext = (comp) => {
    if (exam.data[exam.currentTest]?.questions[exam.currentQues + 1]?.comprehension_pk != comp) {
      // console.log("playing");
      // }else{
      // console.log("stoping");
      stop();
    }
  };
  const onPlayingPrev = (comp) => {
    if (exam.data[exam.currentTest]?.questions[exam.currentQues - 1]?.comprehension_pk != comp) {
      // console.log("playing");
      // }else{
      // console.log("stoping");
      stop();
    }
  };
  useEffect(() => {
    if (exam.currentTest != null) {
      if (exam.data[exam.currentTest]?.duration != null) {
        // console.log("start timer");
        timerRef.current.startTimer(exam.data[exam.currentTest].duration);
      }
    }
  }, [exam.currentTest]);

  const handleClearTimer = () => {
    var notVisited = exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[0] || e.status == null).length;
    var notAnswered = exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[1]).length;
    var markReview = exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[3]).length;
    var ansmarkReview = exam.data[exam.currentTest]?.questions?.filter((e) => e.status == QUES_STATUS[4]).length;

    var customSum1 = notVisited + notAnswered + markReview;
    var customSum2 = markReview + ansmarkReview;
    console.log(customSum2);

    var description = "Are you sure, you want to move to the next section? You currently have:";
    var points = [
      `You have ${timerRef.current.getTimeRemaining()} time remaining`,
      ...(customSum1 > 0 ? [`${customSum1} Not Answered`] : []),
      ...(customSum2 > 0 ? [`${customSum2} Marked For Review`] : []),
      `You can't revisit this section, even if you have MARKED some questions for "Review".`,
    ];

    if (exam.data.length - 1 <= exam.currentTest) {
      description = "Are you sure, you want to submit the exam?";
    }

    showAlertDialog({
      title: "Confirmation ?",
      description: description,
      points: points,
      agreeCallback: () => {
        timerRef.current.clearTimer();
      },
    });
  };

  const handleFinish = async () => {
    var result = getNextTest();
    if (result == true) return;

    if (result == NO_AVAILABLE_TESTS_THROW) {
      showLoading();
      try {
        const response = await UserServices.validateExamTest(account.user.user_pk, exam.data);
        const responseData = response.data?.data ?? {};
        hideLoading();

        navigate("/user/result", { replace: true, state: responseData });
      } catch (err) {
        showSnackbar(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
        hideLoading();
      }
    }
  };

  return (
    <>
      {exam.isLoading && (
        <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!exam.isLoading && exam.errorMessage && (
        <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
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
                {exam.currentTest === 2 && exam.data[exam.currentTest]?.questions[exam.currentQues]?.category === "English Listening" ? (
                  <TexttoSpeachCheck comprehensionText={comprehensionText} raviIndiaVoice={raviIndiaVoice} />
                ) : (
                  <Typography variant="subtitle1" fontWeight="normal" textAlign="justify">
                    {exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension ?? "-"}
                  </Typography>
                )}
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
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mr: 1 }}
                disabled={exam.currentQues <= 0}
                onClick={() => {
                  getPrevQuestion();
                  onPlayingPrev(exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension_pk);
                }}
              >
                Previous
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                sx={{ mr: 3 }}
                disabled={exam.data[exam.currentTest]?.questions?.length - 1 <= exam.currentQues}
                onClick={() => {
                  getNextQuestion();
                  onPlayingNext(exam.data[exam.currentTest]?.questions[exam.currentQues]?.comprehension_pk);
                }}
              >
                Next
              </Button>

              <LoadingButton
                variant="contained"
                color="success"
                onClick={() => {
                  handleClearTimer();
                  stop();
                }}
              >
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
