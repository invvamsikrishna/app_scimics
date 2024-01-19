import { Box } from "@mui/material";
import { PUBLIC_URL } from "../../constants";

const getIcon = (src) => <Box component="img" src={`${PUBLIC_URL}${src}`} sx={{ width: 16, height: 16 }} />;

const NavConfigAdmin = [
  {
    title: "Cognitive Abilities",
    path: "/admin-dashboard/cognitive-abilities-page",
    icon: getIcon("/static/icons/admin-cognitive.svg"),
  },
  {
    title: "Technical Proficiency",
    path: "/admin-dashboard/technical-proficiency-page",
    icon: getIcon("/static/icons/admin-technical.svg"),
  },
  {
    title: "Communication Skills",
    path: "/admin-dashboard",
    // /communication-skills-page",
    icon: getIcon("/static/icons/admin-communication.svg"),
  },
  {
    title: "Personality & Behavioral",
    path: "/admin-dashboard/personality-behavioral-page",
    icon: getIcon("/static/icons/admin-personality.svg"),
  },
  {
    title: "Exam Configuration",
    path: "/admin-dashboard/admin-configuration-page",
    icon: getIcon("/static/icons/admin-config.svg"),
  },
  {
    title: "User Management",
    path: "/admin-dashboard/admin-user-configuration-page",
    icon: getIcon("/static/icons/user-configuration.svg"),
  },
  {
    title: "Ques Management",
    path: "/admin-dashboard/ques-management",
    icon: getIcon("/static/icons/ques-management.svg"),
    children: [
      {
        title: "Add MCQ Question",
        path: "/admin-dashboard/ques-management/add-mcq-question",
      },
      {
        title: "Questions List",
        path: "/admin-dashboard/ques-management/questions-list",
      },
    ],
  },
];

export { NavConfigAdmin };
