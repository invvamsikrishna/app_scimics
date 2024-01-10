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
import MyTestReportsPage from "./pages/MyTestReportsPage";

import AdminSidebarLayout from "./layouts/adminSidebar/indexAdmin";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import TechnicalProficiencyPage from "./pages/admin/TechnicalProficiencyPage";
import CommunicationSkillsPage from "./pages/admin/CommunicationSkillsPage";
import CognitiveAbilitiesPage from "./pages/admin/CognitiveAbilitiesPage";
import PersonalityBehavioralPage from "./pages/admin/PersonalityBehavioralPage";
import AdminConfigurationPage from "./pages/admin/AdminConfigurationPage";
import ShowPdf from "./printToPDF/ShowPdf";

const CustomeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verification" element={<VerificationPage />} />

      <Route path="/adminpanellogin" element={<AdminLoginPage />} />

      <Route path="/admin-dashboard" element={<AdminSidebarLayout />}>
        <Route path="cognitive-abilities-page" element={<CognitiveAbilitiesPage />} />
        <Route path="technical-proficiency-page" element={<TechnicalProficiencyPage />} />
        <Route path="communication-skills-page" element={<CommunicationSkillsPage />} />
        <Route path="personality-behavioral-page" element={<PersonalityBehavioralPage />} />
        <Route path="admin-configuration-page" element={<AdminConfigurationPage />} />
        <Route path="adminprofile" element={<AdminProfilePage />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/user" element={<SidebarLayout />}>
          <Route path="icap-test" element={<IcapTestPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="test-reports" element={<MyTestReportsPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="viewpdf" element={<ShowPdf />} />
        </Route>

        <Route path="/user" element={<SidebarLayout isExam={true} />}>
          <Route path="examination" element={<ExaminationPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default CustomeRouter;
