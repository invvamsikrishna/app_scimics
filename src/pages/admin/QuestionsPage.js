import React from "react";
import Page from "../../components/Page";
import { Box, Container, Typography } from "@mui/material";
import QuestionsList from "../../sections/admin/QuestionsList";

const QuestionsPage = () => {
  return (
    <Page title="My Test Reports">
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Questions List
        </Typography>

        <Box p={1} />

        <QuestionsList />
      </Container>
    </Page>
  );
};

export default QuestionsPage;
