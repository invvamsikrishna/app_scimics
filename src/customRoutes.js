import { Navigate, Routes, Route } from "react-router-dom";
import SidebarLayout from "./layouts/sidebar";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import VerificationPage from "./pages/VerificationPage";
import IcapTestPage from "./pages/IcapTestPage";
import ProfilePage from "./pages/ProfilePage";

const CustomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verification" element={<VerificationPage />} />

      <Route path="/user" element={<SidebarLayout />}>
        <Route path="icap-test" element={<IcapTestPage />} />

        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default CustomeRouter;
