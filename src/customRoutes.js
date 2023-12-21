import { Navigate, Routes, Route } from "react-router-dom";
import SidebarLayout from "./layouts/sidebar";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerificationPage from "./pages/VerificationPage";
import IcapTestPage from "./pages/IcapTestPage";
import ProfilePage from "./pages/ProfilePage";
import ExaminationPage from "./pages/ExaminationPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Page404 from "./pages/Page404";
import ResultPage from "./pages/ResultPage";

const CustomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/404" element={<Page404 />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verification" element={<VerificationPage />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/user" element={<SidebarLayout />}>
          <Route path="icap-test" element={<IcapTestPage />} />

          <Route path="profile" element={<ProfilePage />} />

          <Route path="result" element={<ResultPage />} />
        </Route>

        <Route path="/user" element={<SidebarLayout isExam={true} />}>
          <Route path="examination" element={<ExaminationPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CustomeRouter;
