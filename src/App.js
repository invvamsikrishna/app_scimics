import { SnackbarProvider } from "./components/SnackBar";
import Router from "./customRoutes";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
