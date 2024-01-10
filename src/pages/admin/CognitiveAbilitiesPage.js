import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Page from "../../components/Page";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import AdminGeneratedQue from "../../components/AdminGeneratedQue";
import { AGTextField } from "../../components/hook-form/RHFTextField";
import { useAlertContext } from "../../components/AlertProvider";

const CognitiveAbilitiesPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isGenrated, setGenrated] = useState(false);
  const [questionCount1, setQuestionCount1] = useState(0);
  const [questionCount2, setQuestionCount2] = useState(0);
  const [queArray, setQueArray] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const { showSnackbar } = useAlertContext();
  const [disableGenerate, setDisableGenerate] = useState(true);
  const [errorText1, setErrorText1] = useState("");
  const [errorText2, setErrorText2] = useState("");
  const [anstoChange, setAnstoChange] = useState("");

  const QAhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount2 >= 1) {
      setDisableGenerate(false);
    } else {
      setDisableGenerate(true);
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText1(`Value should be between 0 to 10`);
    } else {
      setErrorText1("");
      setQuestionCount1(inputValue);
    }
  };

  const LRhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount1 >= 1) {
      setDisableGenerate(false);
    } else {
      setDisableGenerate(true);
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText2(`Value should be between 0 to 10`);
    } else {
      setErrorText2("");
      setQuestionCount2(inputValue);
    }
  };

  const handleArrowButtonUp1 = (e) => {
    e.preventDefault();
    setQuestionCount1((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false);
  };

  const handleArrowButtonDown1 = (e) => {
    e.preventDefault();
    setQuestionCount1((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount2 == 0);
      return newValue;
    });
  };

  const handleArrowButtonUp2 = (e) => {
    e.preventDefault();
    setQuestionCount2((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false);
  };

  const handleArrowButtonDown2 = (e) => {
    e.preventDefault();
    setQuestionCount2((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount1 == 0);
      return newValue;
    });
  };

  const QAhandleArrowKeys = (e) => {
    if (e.key === "ArrowUp") {
      handleArrowButtonUp1(e);
    } else if (e.key === "ArrowDown") {
      handleArrowButtonDown1(e);
    } else if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  const LRhandleArrowKeys = (e) => {
    if (e.key === "ArrowUp") {
      handleArrowButtonUp2(e);
    } else if (e.key === "ArrowDown") {
      handleArrowButtonDown2(e);
    } else if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  const onGenerateClicked = async () => {
    if (questionCount1 >= 1 || questionCount2 >= 1) {
      setLoading(true);
      setGenrated(true);
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/getcognitiveq", {
          "3Q_time": "2",
          "3Q_a_count": questionCount1,
          "3Q_b_count": questionCount2,
        });
        // console.log(response.data.data.MCQ_Questions[0].questions);
        setQueArray(response.data.data.MCQ_Questions[0].questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onApproveQue = async (items, index) => {
    const icap_category_id = 1;
    const icap_qscategory_id = 1;
    let icap_subcategory_id;
    if (items.category === "Quantitative Aptitude") {
      icap_subcategory_id = 1;
    } else {
      icap_subcategory_id = 2;
    }
    try {
      setDisabledButtons((prev) => [...prev, index]);
      const response = await axios.post("https://scimics-api.onrender.com/scimics/approveq", {
        question: items.question,
        option1: items.options[0],
        option2: items.options[1],
        option3: items.options[2],
        option4: items.options[3],
        answer: items.correct_answer,
        icap_category_id: icap_category_id,
        icap_subcategory_id: icap_subcategory_id,
        icap_qscategory_id: icap_qscategory_id,
        comprehension_id: null,
        domain_id: null,
      });
      // console.log(response);
      showSnackbar("Question Approved successfully");
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("Question Approval failed");
    }
  };

  return (
    <Page title="Cognitive Abilities Generate Page">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Cognitive Abilities
        </Typography>

        <Box p={1} />

        <Box px={5} py={5} sx={{ display: "flex", alignItems: "center", bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
          <Typography variant="subtitle1" color="gray">
            Number of Questions
          </Typography>
          <AGTextField
            handleArrowButtonUp={handleArrowButtonUp1}
            handleArrowButtonDown={handleArrowButtonDown1}
            errorText={errorText1}
            handleInputChange={QAhandleInputChange}
            handleArrowKeys={QAhandleArrowKeys}
            name="QAQuestionCount"
            label="Quantitative Aptitude"
            value={questionCount1}
            setQuestionCount={setQuestionCount1}
          />
          <AGTextField
            handleArrowButtonUp={handleArrowButtonUp2}
            handleArrowButtonDown={handleArrowButtonDown2}
            errorText={errorText2}
            handleInputChange={LRhandleInputChange}
            handleArrowKeys={LRhandleArrowKeys}
            name="LRQuestionCount"
            label="Logical Reasoning"
            value={questionCount2}
            setQuestionCount={setQuestionCount2}
          />
          <LoadingButton
            variant="outlined"
            loading={isLoading}
            onClick={() => onGenerateClicked()}
            disabled={disableGenerate}
            sx={{ marginLeft: 3, minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 6, py: 1, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
          >
            Generate
          </LoadingButton>
        </Box>
        <Box p={1} />

        {queArray === null ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please Generate Questions again!</Typography>
          </Box>
        ) : queArray.length === 0 && isGenrated ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please wait...</Typography>
          </Box>
        ) : (
          queArray.length > 0 &&
          isGenrated &&
          queArray.map((items, index) => {
            return <AdminGeneratedQue items={items} index={index} onApproveQue={onApproveQue} disabledButtons={disabledButtons} setAnstoChange={setAnstoChange} />;
          })
        )}
      </Container>
    </Page>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     account: state.auth,
//   };
// };

export default CognitiveAbilitiesPage;
