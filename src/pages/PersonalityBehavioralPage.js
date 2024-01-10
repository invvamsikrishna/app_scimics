import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Page from "../components/Page";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import AdminGeneratedQue from "../components/AdminGeneratedQue";
import { useSnackbar } from "../components/SnackBar";
import { AGTextField } from "../components/hook-form/RHFTextField";

const PersonalityBehavioralPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [isGenrated, setGenrated] = useState(false);
  const [questionCount1, setQuestionCount1] = useState(0);
  const [questionCount2, setQuestionCount2] = useState(0);
  const [questionCount3, setQuestionCount3] = useState(0);
  const [questionCount4, setQuestionCount4] = useState(0);
  const [queArray, setQueArray] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const showAlert = useSnackbar();
  const [disableGenerate, setDisableGenerate] = useState(true);
  const [errorText1, setErrorText1] = useState('');
  const [errorText2, setErrorText2] = useState('');
  const [errorText3, setErrorText3] = useState('');
  const [errorText4, setErrorText4] = useState('');

  const ITShandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount2 >= 1 || questionCount3 >= 1 || questionCount4 >= 1) {
      setDisableGenerate(false)
    } else {
      setDisableGenerate(true)
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText1('Value: 0 to 10');
    } else {
      setErrorText1('');
      setQuestionCount1(inputValue)
    }
  };

  const handleArrowButtonUp1 = (e) => {
    e.preventDefault();
    setQuestionCount1((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false)
  }

  const handleArrowButtonDown1 = (e) => {
    e.preventDefault();
    setQuestionCount1((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount2 == 0 && questionCount3 == 0 && questionCount4 == 0);
      return newValue;
    });
  }

  const ITShandleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      handleArrowButtonUp1(e)
    } else if (e.key === 'ArrowDown') {
      handleArrowButtonDown1(e)
    } else if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  const ACLhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount1 >= 1 || questionCount3 >= 1 || questionCount4 >= 1) {
      setDisableGenerate(false)
    } else {
      setDisableGenerate(true)
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText2('Value: 0 to 10');
    } else {
      setErrorText2('');
      setQuestionCount2(inputValue)
    }
  };

  const handleArrowButtonUp2 = (e) => {
    e.preventDefault();
    setQuestionCount2((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false)
  }

  const handleArrowButtonDown2 = (e) => {
    e.preventDefault();
    setQuestionCount2((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount1 == 0 && questionCount3 == 0 && questionCount4 == 0);
      return newValue;
    });
  }

  const ACLhandleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      handleArrowButtonUp2(e)
    } else if (e.key === 'ArrowDown') {
      handleArrowButtonDown2(e)
    } else if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  const PTMhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount2 >= 1 || questionCount1 >= 1 || questionCount4 >= 1) {
      setDisableGenerate(false)
    } else {
      setDisableGenerate(true)
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText3('Value: 0 to 10');
    } else {
      setErrorText3('');
      setQuestionCount3(inputValue)
    }
  };

  const handleArrowButtonUp3 = (e) => {
    e.preventDefault();
    setQuestionCount3((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false)
  }

  const handleArrowButtonDown3 = (e) => {
    e.preventDefault();
    setQuestionCount3((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount2 == 0 && questionCount1 == 0 && questionCount4 == 0);
      return newValue;
    });
  }

  const PTMhandleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      handleArrowButtonUp3(e)
    } else if (e.key === 'ArrowDown') {
      handleArrowButtonDown3(e)
    } else if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  const PEIPhandleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue >= 1 || questionCount2 >= 1 || questionCount3 >= 1 || questionCount1 >= 1) {
      setDisableGenerate(false)
    } else {
      setDisableGenerate(true)
    }
    if (inputValue < 0 || inputValue > 10) {
      setErrorText4('Value: 0 to 10');
    } else {
      setErrorText4('');
      setQuestionCount4(inputValue)
    }
  };

  const handleArrowButtonUp4 = (e) => {
    e.preventDefault();
    setQuestionCount4((prevValue) => Math.min(Number(prevValue) + 1, 10));
    setDisableGenerate(false)
  }

  const handleArrowButtonDown4 = (e) => {
    e.preventDefault();
    setQuestionCount4((prevValue) => {
      const newValue = Math.max(Number(prevValue) - 1, 0);
      setDisableGenerate(newValue == 0 && questionCount2 == 0 && questionCount3 == 0 && questionCount1 == 0);
      return newValue;
    });
  }

  const PEIPhandleArrowKeys = (e) => {
    if (e.key === 'ArrowUp') {
      handleArrowButtonUp4(e)
    } else if (e.key === 'ArrowDown') {
      handleArrowButtonDown4(e)
    } else if (e.key === '-' || e.key === '.' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  const onGenerateClicked = async () => {
    if (questionCount1 > 0 || questionCount2 > 0 || questionCount3 > 0 || questionCount4 > 0) {
      setLoading(true);
      setGenrated(true);
      try {
        const response = await axios.post("https://scimics-api.onrender.com/scimics/getpersonalityq", {
          "6Q_time": "2",
          "6Q_a_count": questionCount1,
          "6Q_b_count": questionCount2,
          "6Q_c_count": questionCount3,
          "6Q_d_count": questionCount4,
        });
        // console.log(response.data.data.MCQ_Questions[0].questions);
        setQueArray(response.data.data.MCQ_Questions[0].questions)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  const onApproveQue = async (items, index) => {
    const icap_category_id = 4;
    const icap_qscategory_id = 1;
    let icap_subcategory_id;
    if (items.category === "Interpersonal and Team work Skills") {
      icap_subcategory_id = 10
    } else if (items.category === "Adaptability and Continuous Learning") {
      icap_subcategory_id = 11
    } else if (items.category === "Project Management and Time Management") {
      icap_subcategory_id = 12
    } else {
      icap_subcategory_id = 13
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
      // console.log(response);
      showAlert("Question Approved successfully");
      setTimeout(() => {
        if (showAlert.close) {
          showAlert.close();
        }
      }, 20000);
    } catch (error) {
      console.error("Error fetching data:", error);
      showAlert("Question Approval failed");
      setTimeout(() => {
        if (showAlert.close) {
          showAlert.close();
        }
      }, 20000);
    }
  }

  return (
    <Page title="Personality & Behavioral Generate Page">
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Personality & Behavioral
        </Typography>

        <Box p={1} />

        <Box px={2} py={1} sx={{ bgcolor: "background.primary", borderRadius: "12px", width: { xs: "100%", md: "100%" }, height:"125px" }}>
          <Typography variant="subtitle1" color="gray" >Number of Questions</Typography>
          <Box p={1} />
          <Box sx={{display:"flex", justifyContent:"space-evenly", alignItems:"start", width: { xs: "100%", md: "100%" }}}>
            <AGTextField handleArrowButtonUp={handleArrowButtonUp1} handleArrowButtonDown={handleArrowButtonDown1} errorText={errorText1} handleInputChange={ITShandleInputChange} handleArrowKeys={ITShandleArrowKeys} name="ITSQuestionCount" label="Interpersonal & Team-work Skills" value={questionCount1} setQuestionCount={setQuestionCount1} />
            <AGTextField handleArrowButtonUp={handleArrowButtonUp2} handleArrowButtonDown={handleArrowButtonDown2} errorText={errorText2} handleInputChange={ACLhandleInputChange} handleArrowKeys={ACLhandleArrowKeys} name="ACLQuestionCount" label="Adaptability & Continuous Learning" value={questionCount2} setQuestionCount={setQuestionCount2} />
            <AGTextField handleArrowButtonUp={handleArrowButtonUp3} handleArrowButtonDown={handleArrowButtonDown3} errorText={errorText3} handleInputChange={PTMhandleInputChange} handleArrowKeys={PTMhandleArrowKeys} name="PTMQuestionCount" label="Project & Time Management" value={questionCount3} setQuestionCount={setQuestionCount3} />
            <AGTextField handleArrowButtonUp={handleArrowButtonUp4} handleArrowButtonDown={handleArrowButtonDown4} errorText={errorText4} handleInputChange={PEIPhandleInputChange} handleArrowKeys={PEIPhandleArrowKeys} name="PEIPQuestionCount" label="Professional Etiquette & Interview Preparedness" value={questionCount4} setQuestionCount={setQuestionCount4} />
            <LoadingButton
              variant="outlined"
              disabled={disableGenerate}
              loading={isLoading}
              onClick={() => onGenerateClicked()}
              sx={{minHeight: "56px", color: "#5a64c1", fontSize: 16, fontWeight: 500, px: 3, py: 1, backgroundImage: "linear-gradient(to left, #5C67C759, #5C67C700)", border: "1px solid #5C67C7", flexWrap:"wrap"}}
            >
              Generate
            </LoadingButton>
          </Box>
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

// const mapStateToProps = (state) => {
//   return {
//     account: state.auth,
//   };
// };

export default PersonalityBehavioralPage;
