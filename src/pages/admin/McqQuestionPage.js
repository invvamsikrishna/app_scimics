import React from "react";
import Page from "../../components/Page";
import { Box, Container, Typography } from "@mui/material";
import AddMcqQuestion from "../../sections/admin/AddMcqQuestion";

const McqQuestionPage = () => {
  return (
    <Page title="MCQ Question">
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          MCQ Question
        </Typography>

        <Box p={1} />

        <AddMcqQuestion />
      </Container>
    </Page>
  );
};

export default McqQuestionPage;
