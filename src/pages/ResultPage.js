import React, { useEffect, useState } from "react";
import { Avatar, Grid, Box, Container, Stack, Typography, Card, List, ListItem, ListItemAvatar, ListItemText, CardContent, Button, CircularProgress } from "@mui/material";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import { connect } from "react-redux";
import { Router, useNavigate } from "react-router-dom";
import UserServices from "../services/UserServices";
import { useSnackbar } from "../components/SnackBar";
import { COMMON_ERROR_MSG } from "../constants";

const ResultPage = ({ account, exam }) => {
  const navigate = useNavigate();
  const showAlert = useSnackbar();

  const [marks, setMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    var currMarks = 0;
    var currTotal = 0;
    if (exam.data?.length <= 0) {
      navigate(-1);
      return;
    }

    exam.data?.map((item) => {
      var marksSum = item.questions?.filter((e) => e.answer == e.correct_answer).length ?? 0;
      var totalSum = item.questions?.length ?? 0;
      currMarks += marksSum;
      currTotal += totalSum;
    });

    setMarks(currMarks);
    setTotalMarks(currTotal);

    handleSubmit(currMarks, currTotal);
  }, []);

  const handleSubmit = async (currMarks, currTotal) => {
    try {
      var values = {
        user_id: account.user.user_pk,
        total: currTotal,
        won: currMarks,
        tp_total: exam.data[0].questions?.length,
        tp_won: exam.data[0].questions?.filter((e) => e.answer == e.correct_answer).length,
        cs_total: exam.data[1].questions?.length,
        cs_won: exam.data[1].questions?.filter((e) => e.answer == e.correct_answer).length,
        ca_total: exam.data[2].questions?.length,
        ca_won: exam.data[2].questions?.filter((e) => e.answer == e.correct_answer).length,
        iats_total: exam.data[3].questions?.length,
        iats_won: exam.data[3].questions?.filter((e) => e.answer == e.correct_answer).length,
        aacl_total: exam.data[4].questions?.length,
        aacl_won: exam.data[4].questions?.filter((e) => e.answer == e.correct_answer).length,
        pmatm_total: exam.data[5].questions?.length,
        pmatm_won: exam.data[5].questions?.filter((e) => e.answer == e.correct_answer).length,
        peaip_total: exam.data[6].questions?.length,
        peiap_won: exam.data[6].questions?.filter((e) => e.answer == e.correct_answer).length,
        technical_proficiency: 99,
        communication_skills: 99,
        cognitive_abilities: 99,
        interpersonal_and_teamwork_skills: 99,
        adaptability_and_continuous_learning: 99,
        project_management_and_time_management: 99,
        professional_etiquette_and_interview_preparedness: 99,
      };

      const response = await UserServices.addReport(values);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      showAlert(err.response?.data?.error ?? COMMON_ERROR_MSG, "error");
      setLoading(false);
    }
  };

  return (
    <Page title="ICAP Test Result">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          ICAP Test Result
        </Typography>

        <Box p={1} />

        {isLoading && (
          <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}

        {!isLoading && (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" fontWeight="normal">
                    You scored
                  </Typography>

                  <Typography variant="h1" fontWeight="normal">
                    {marks}
                  </Typography>

                  <Typography variant="h6" fontWeight="normal" gutterBottom>
                    out of {totalMarks} marks
                  </Typography>

                  <Typography variant="subtitle1" fontWeight="normal">
                    Percentage - {((marks / totalMarks) * 100).toFixed(2)}%
                  </Typography>

                  <Box p={1} />

                  <Button variant="contained" onClick={() => navigate(-1)}>
                    Go back
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={8}>
              <Card>
                <List sx={{ width: "100%" }}>
                  {exam.data?.map((item, index) => (
                    <ListItem key={index} secondaryAction={<Typography>{`${item.questions?.filter((e) => e.answer == e.correct_answer).length} out of ${item.questions?.length} marks`}</Typography>}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <Iconify icon={"healthicons:i-exam-multiple-choice"} sx={{ color: "white" }} />
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText primary={item.testname} secondary={`${item.questions?.length} questions`} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    exam: state.exam,
  };
};

export default connect(mapStateToProps, null)(ResultPage);
