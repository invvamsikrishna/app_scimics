import React from "react";
import Page from "../components/Page";
import { Box, Container, Typography } from "@mui/material";
import TestReportsList from "../sections/testreports/TestReportsList";

const MyTestReportsPage = () => {
  return (
    <Page title="My Test Reports">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Reports
        </Typography>

        <Box p={1} />

        <TestReportsList />
      </Container>
    </Page>
  );
};

export default MyTestReportsPage;
