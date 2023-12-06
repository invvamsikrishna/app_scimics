import Router from "./customRoutes";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
