import { Link as RouterLink } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import Page from "../components/Page";

export default function Page404() {
  return (
    <Page title="Login">
      <Container>
        <Box sx={{ textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.</Typography>

          <Box p={2} />

          <div>
            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </div>
        </Box>
      </Container>
    </Page>
  );
}
