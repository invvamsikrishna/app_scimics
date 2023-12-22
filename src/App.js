import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "./components/SnackBar";
import Router from "./customRoutes";
import ThemeProvider from "./theme";

const clientId = "136010808221-qcqe91l44c3i8060ib6novlgnmjkc8ot.apps.googleusercontent.com";

function App() {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
