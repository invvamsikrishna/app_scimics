import React, { useEffect, useState } from "react";
import { Avatar, Grid, Box, Container, Stack, Typography, Card, List, ListItem, ListItemAvatar, ListItemText, CardContent, Button } from "@mui/material";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import { connect } from "react-redux";
import { Router, useNavigate } from "react-router-dom";

const ResultPage = ({ exam }) => {
  const navigate = useNavigate();
  const [marks, setMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  useEffect(() => {
    var currMarks = 0;
    var currTotal = 0;
    exam.data?.map((item) => {
      var marksSum = item.questions?.filter((e) => e.answer == e.correct_answer).length ?? 0;
      var totalSum = item.questions?.length ?? 0;
      currMarks += marksSum;
      currTotal += totalSum;
    });
    setMarks(currMarks);
    setTotalMarks(currTotal);
  }, []);

  return (
    <Page title="ICAP Test Result">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          ICAP Test Result
        </Typography>

        <Box p={1} />

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
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    exam: state.exam,
  };
};

export default connect(mapStateToProps, null)(ResultPage);
