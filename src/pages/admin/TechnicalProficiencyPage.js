import React, { useState } from "react";
import { Box, Container, Tooltip, Typography } from "@mui/material";
import Page from "../../components/Page";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import AdminGeneratedQue from "../../components/AdminGeneratedQue";
import { AGTextField } from "../../components/hook-form/RHFTextField";
import { useAlertContext } from "../../components/AlertProvider";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { generatePageInformation, generateAgainMessage } from "./CognitiveAbilitiesPage";

const TechnicalProficiencyPage = () => {
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

  const DSKhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount2 >= 1) {
      setDisableGenerate(false);
    } else {
      setDisableGenerate(true);
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText1("Value: 0 to 10");
    } else {
      setErrorText1("");
      setQuestionCount1(inputValue);
    }
  };

  const HChandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount1 >= 1) {
      setDisableGenerate(false);
    } else {
      setDisableGenerate(true);
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText2("Value: 0 to 10");
    } else {
      setErrorText2("");
      setQuestionCount2(inputValue);
    }
  };

  const handleArrowButtonUp1 = (e) => {
    e.preventDefault();
    setQuestionCount1((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setErrorText1("");
    setDisableGenerate(false);
  };

  const handleArrowButtonDown1 = (e) => {
    setErrorText1("");
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
    setErrorText2("");
    setDisableGenerate(false);
  };

  const handleArrowButtonDown2 = (e) => {
    setErrorText2("");
    e.preventDefault();
    setQuestionCount2((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount1 == 0);
      return newValue;
    });
  };

  const DSKhandleArrowKeys = (e) => {
    if (e.key === "ArrowUp") {
      handleArrowButtonUp1(e);
    } else if (e.key === "ArrowDown") {
      handleArrowButtonDown1(e);
    } else if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  const HChandleArrowKeys = (e) => {
    if (e.key === "ArrowUp") {
      handleArrowButtonUp2(e);
    } else if (e.key === "ArrowDown") {
      handleArrowButtonDown2(e);
    } else if (e.key === "-" || e.key === "." || e.key === "e" || e.key === "+") {
      e.preventDefault();
    }
  };

  const onGenerateClicked = async () => {
    if (questionCount1 > 0 || questionCount2 > 0) {
      setLoading(true);
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/gettechnicalq", {
          stream: "Btech",
          course: "CSE",
          "1Q_time": "2",
          "1Q_a_count": questionCount1,
          "1Q_b_count": questionCount2,
        });
        // console.log(response.data.data.MCQ_Questions[0].questions);
        setQueArray(response.data.data.MCQ_Questions[0].questions);
        setGenrated(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onApproveQue = async (items, index) => {
    const icap_category_id = 2;
    const icap_qscategory_id = 1;
    let icap_subcategory_id;
    if (items.category === "coding questions") {
      icap_subcategory_id = 4;
    } else {
      icap_subcategory_id = 3;
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

  const onHandleRemoveError = () => {
    setErrorText1("");
    setErrorText2("");
  };

  return (
    <Page title="Technical Proficiency Generate Page">
      <Container maxWidth="xl" sx={{ py: 1 }} onClick={() => onHandleRemoveError()}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Technical Proficiency
          <Tooltip
            title={
              <ul>
                {generatePageInformation.map((info, index) => (
                  <li key={index} style={{ marginLeft: "20px" }}>
                    {info}
                  </li>
                ))}
              </ul>
            }
            placement="right"
            arrow
          >
            <InfoOutlinedIcon sx={{ color: "gray", cursor: "pointer", fontSize: 16, marginLeft: 1 }} />
          </Tooltip>
        </Typography>

        <Box p={1} />

        <Box px={2} py={1} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" }, minHeight: "145px" }}>
          <Typography variant="subtitle1" color="gray">
            Number of Questions
          </Typography>
          <Box p={1} />
          <Box sx={{ display: "flex", alignItems: "start", width: { xs: "100%", md: "100%" }, flexWrap: "wrap" }}>
            <Box sx={{ width: { xs: "20%", md: "20%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
              <AGTextField
                handleArrowButtonUp={handleArrowButtonUp1}
                handleArrowButtonDown={handleArrowButtonDown1}
                errorText={errorText1}
                handleInputChange={DSKhandleInputChange}
                handleArrowKeys={DSKhandleArrowKeys}
                name="DSKQuestionCount"
                label="Domain-Specific"
                value={questionCount1}
                setQuestionCount={setQuestionCount1}
              />
            </Box>
            <Box sx={{ width: { xs: "20%", md: "20%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
              <AGTextField
                handleArrowButtonUp={handleArrowButtonUp2}
                handleArrowButtonDown={handleArrowButtonDown2}
                errorText={errorText2}
                handleInputChange={HChandleInputChange}
                handleArrowKeys={HChandleArrowKeys}
                name="HCQuestionCount"
                label="Hands-on Coding"
                value={questionCount2}
                setQuestionCount={setQuestionCount2}
              />
            </Box>
            <Box sx={{ width: { xs: "20%", md: "20%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}></Box>
            <Box sx={{ width: { xs: "20%", md: "20%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}></Box>
            <Box sx={{ width: { xs: "20%", md: "20%" }, minWidth: "120px", display: "flex", justifyContent: "center" }}>
              <LoadingButton
                variant="outlined"
                loading={isLoading}
                disabled={disableGenerate}
                onClick={() => onGenerateClicked()}
                sx={{ marginTop: 1, minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 4, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7" }}
              >
                Generate
              </LoadingButton>
            </Box>
          </Box>
        </Box>
        <Box p={1} />

        {isLoading ? (
          <Box px={5} py={3} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" } }}>
            <Typography>Please wait...</Typography>
          </Box>
        ) : (queArray === null ? (
          generateAgainMessage
        ) : (
          queArray.length > 0 && isGenrated ? (
            <>
              {
                queArray.map((items, index) => {
                  return (<AdminGeneratedQue
                    items={items}
                    index={index}
                    onApproveQue={onApproveQue}
                    disabledButtons={disabledButtons}
                    setQueArray={setQueArray}
                  />);
                })}
            </>
          ) : (queArray.length === 0 && isGenrated && generateAgainMessage)
        ))}
      </Container>
    </Page>
  );
};
export default TechnicalProficiencyPage;
