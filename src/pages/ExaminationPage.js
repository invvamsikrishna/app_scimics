import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Page from "../components/Page";
import { QuestionPaper } from "../sections/examination";

const ExaminationPage = () => {
  return (
    <Page title="ICAP Test">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <QuestionPaper />
      </Container>
    </Page>
  );
};

export default ExaminationPage;
