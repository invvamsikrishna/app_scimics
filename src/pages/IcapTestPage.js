import React from "react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import Page from "../components/Page";
import { TestOverview } from "../sections/icaptest";

const IcapTestPage = () => {
  return (
    <Page title="ICAP Test">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="subtitle1" fontSize={24} fontWeight={500}>
          Welcome back
          <Typography component="span" fontSize={24}>
            &#128075;
          </Typography>
        </Typography>

        <Box p={1} />

        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 56, height: 56 }} />

          <div>
            <Typography variant="subtitle1" fontSize={18} fontWeight={400}>
              Rakesh Harsha
            </Typography>

            <Typography variant="subtitle2" fontSize={12} fontWeight={500} color="text.disabled">
              Bangalore, India
            </Typography>
          </div>
        </Stack>

        <Box p={2} />

        <TestOverview />
      </Container>
    </Page>
  );
};

export default IcapTestPage;
