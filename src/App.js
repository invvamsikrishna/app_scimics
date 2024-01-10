import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./customRoutes";
import ThemeProvider from "./theme";
import { RowDataProvider } from "./components/createContextCodes/RowDataContext";
import { SpeechSynthesisProvider } from "./components/createContextCodes/SpeechSynthesisContext";
import { AlertProvider } from "./components/AlertProvider";

const clientId = "136010808221-qcqe91l44c3i8060ib6novlgnmjkc8ot.apps.googleusercontent.com";

function App() {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <AlertProvider>
          <RowDataProvider>
            <SpeechSynthesisProvider>
              <Router />
            </SpeechSynthesisProvider>
          </RowDataProvider>
        </AlertProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
