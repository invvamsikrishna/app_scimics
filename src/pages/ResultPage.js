import React, { useEffect, useState } from "react";
import { Avatar, Grid, Box, Container, Stack, Typography, Card, List, ListItem, ListItemAvatar, ListItemText, CardContent, Button, CircularProgress } from "@mui/material";
import Page from "../components/Page";
import Iconify from "../components/Iconify";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlertContext } from "../components/AlertProvider";

const ResultPage = ({ account }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useAlertContext();

  const props = useLocation().state;

  useEffect(() => {
    if (Object.keys(props).length <= 0) {
      navigate(-1);
      return;
    }
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
                  {props.won}
                </Typography>

                <Typography variant="h6" fontWeight="normal" gutterBottom>
                  out of {props.total} marks
                </Typography>

                <Typography variant="subtitle1" fontWeight="normal">
                  Percentage - {((props.won / props.total) * 100).toFixed(2)}%
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
                <ParamsListItem name="Cognitive Abilities" won={props.ca_won} total={props.ca_total} duration={props.ca_time} />
                <ParamsListItem name="Technical Proficiency" won={props.tp_won} total={props.tp_total} duration={props.tp_time} />
                <ParamsListItem name="Communication Skills" won={props.cs_won} total={props.cs_total} duration={props.cs_time} />
                <ParamsListItem name="Personality and Behavioral" won={props.pb_won} total={props.pb_total} duration={props.pb_time} />
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const ParamsListItem = ({ name, won, total, duration }) => {
  return (
    <ListItem secondaryAction={<Typography>{`${won} out of ${total} marks`}</Typography>}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}>
          <Iconify icon={"healthicons:i-exam-multiple-choice"} sx={{ color: "white" }} />
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={name} secondary={`${duration / 60} Min, ${total} questions`} />
    </ListItem>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps, null)(ResultPage);
