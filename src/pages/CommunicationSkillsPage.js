import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Page from "../components/Page";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/styles";
import axios from "axios";

const StyledRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&.Mui-checked": {
    color: theme.palette.success.main,
  },
}));

const CommunicationSkillsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isGenrated, setGenrated] = useState(false);
  const [questionCount1, setQuestionCount1] = useState(0);
  const [questionCount2, setQuestionCount2] = useState(0);
  const [questionCount3, setQuestionCount3] = useState(0);
  const [questionCount4, setQuestionCount4] = useState(0);
  const [queArray, setQueArray] = useState([]);

  const onGenerateClicked = async () => {
    console.log("onGenerateClicked");
    if (questionCount1 > 0 || questionCount2 > 0 || questionCount3 > 0 || questionCount4 > 0) {
      setLoading(true);
      setGenrated(true);
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/getcommunicationq", {
          "2Q_time": "2",
          "2Q_a_count": questionCount1,
          "2Q_b_count": questionCount2,
          "2Q_c_count": questionCount3,
          "2Q_d_count": questionCount4,
        });
        console.log(response.data.data.MCQ_Questions[0].questions);
        setQueArray(response.data.data.MCQ_Questions[0].questions)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  }
  const onApproveQue = () => {
    console.log("onApproveQue");
  }
  return (
    <Page title="Communication Skills">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Communication Skills
        </Typography>

        <Box p={1} />

        <Box px={5} py={5} sx={{ display: "flex", alignItems: "center", bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
          <Typography variant="subtitle1" fontSize={22} fontWeight={500} color="gray" sx={{ marginRight: 3 }}>
            Number of Questions
          </Typography>

          <TextField name="questionCount" type="number" label="English Speaking" sx={{ marginLeft: 3, marginRight: 3, width: "150px" }} value={questionCount1} onChange={(e) => setQuestionCount1(e.target.value)} />
          <TextField name="questionCount" type="number" label="English Listening" sx={{ marginLeft: 3, marginRight: 3, width: "150px" }} value={questionCount2} onChange={(e) => setQuestionCount2(e.target.value)} />
          <TextField name="questionCount" type="number" label="English Reading" sx={{ marginLeft: 3, marginRight: 3, width: "150px" }} value={questionCount3} onChange={(e) => setQuestionCount3(e.target.value)} />
          <TextField name="questionCount" type="number" label="English Writing" sx={{ marginLeft: 3, marginRight: 3, width: "150px" }} value={questionCount4} onChange={(e) => setQuestionCount4(e.target.value)} />

          <LoadingButton
            variant="outlined"
            loading={isLoading}
            onClick={() => onGenerateClicked()}
            sx={{ minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, py: 1, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7", }}
          >
            Generate
          </LoadingButton>
        </Box>
        <Box p={1} />
        {queArray === null ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please Generate Questions again! </Typography>
          </Box>
        ) : (queArray.length === 0 && isGenrated) ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please Generate Questions again! </Typography>
          </Box>
        ) : ((queArray.length > 0 && isGenrated) && (
          queArray.map((items, index) => {
            return (
              <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" }, marginBottom: 1 }}>
                <Typography>Question {index + 1} {items.category}</Typography>
                <Box p={1} />

                <Typography>{items.question}</Typography>
                <Box p={1} />

                <Box sx={{ display: "flex" }}>
                  <Box sx={{ width: "88%" }} >
                    <FormControl>
                      <RadioGroup value={items.correct_answer}>
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
                  <Box sx={{ width: "10%", display: "flex", alignItems: "end", marginRight: "6" }} >
                    <Button fullWidth variant="contained" color="success" onClick={() => onApproveQue()}>Approve</Button>
                  </Box>
                </Box>
              </Box>
            )
          })
        ))}
      </Container>
    </Page>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     account: state.auth,
//   };
// };

export default CommunicationSkillsPage;