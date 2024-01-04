import React, { useState } from "react";
import { Box, Container,  TextField, Typography } from "@mui/material";
import Page from "../components/Page";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import AdminGeneratedQue from "../components/AdminGeneratedQue";

const CognitiveAbilitiesPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isGenrated, setGenrated] = useState(false);
  const [questionCount1, setQuestionCount1] = useState(0);
  const [questionCount2, setQuestionCount2] = useState(0);
  const [queArray, setQueArray] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);

  const onGenerateClicked = async () => {
    console.log("onGenerateClicked");
    if (questionCount1 > 0 || questionCount2 > 0) {
      setLoading(true);
      setGenrated(true);
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/getcognitiveq", {
          "3Q_time": "2",
          "3Q_a_count": questionCount1,
          "3Q_b_count": questionCount2,
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

  const onApproveQue = async (items, index) => {
    const icap_category_id = 1;
    const icap_qscategory_id = 1;
    let icap_subcategory_id;
    if (items.category === "Quantitative Aptitude") {
      icap_subcategory_id = 1
    } else {
      icap_subcategory_id = 2
    }
    try {
      setDisabledButtons(prev => [...prev, index]);
      const response = await axios.post("https://scimics-api.onrender.com/scimics/approveq", {
        "question": items.question,
        "option1": items.options[0],
        "option2": items.options[1],
        "option3": items.options[2],
        "option4": items.options[3],
        "answer": items.correct_answer,
        "icap_category_id": icap_category_id,
        "icap_subcategory_id": icap_subcategory_id,
        "icap_qscategory_id": icap_qscategory_id,
        "comprehension_id": null,
        "domain_id": null,
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <Page title="Cognitive Abilities">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Cognitive Abilities
        </Typography>

        <Box p={1} />

        <Box px={5} py={5} sx={{ display: "flex", alignItems: "center", bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
          <Typography variant="subtitle1" color="gray" >
            Number of Questions
          </Typography>

          <TextField name="questionCount" label="Quantitative Aptitude" type="number" sx={{ marginLeft: 3, width: "150px" }} value={questionCount1} onChange={(e) => setQuestionCount1(e.target.value)} />
          <TextField name="questionCount" label="Logical Reasoning" type="number" sx={{ marginLeft: 3, width: "150px" }} value={questionCount2} onChange={(e) => setQuestionCount2(e.target.value)} />

          <LoadingButton
            variant="outlined"
            loading={isLoading}
            onClick={() => onGenerateClicked()}
            sx={{ marginLeft: 3, minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, py: 1, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7", }}
          >
            Generate
          </LoadingButton>
        </Box>
        <Box p={1} />

        {queArray === null ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please Generate Questions again!</Typography>
          </Box>
        ) : (queArray.length === 0 && isGenrated) ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please wait...</Typography>
          </Box>
        ) : ((queArray.length > 0 && isGenrated) && (
          queArray.map((items, index) => {
            return (
              <AdminGeneratedQue items={items} index={index} onApproveQue={onApproveQue} disabledButtons={disabledButtons} />
            )
          })
        ))}
      </Container>
    </Page>
  );
};
export default CognitiveAbilitiesPage;