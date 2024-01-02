import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={16} height={16} />;

const NavConfigAdmin = [
  {
    title: "Technical Proficiency",
    path: "/admin-dashboard/technical-proficiency-page",
    icon: getIcon("bxs:dashboard"),
  },
  {
    title: "Communication Skills",
    path: "/admin-dashboard",
    icon: getIcon("streamline:desktop-code-solid"),
  },
  {
    title: "Cognitive Abilities",
    path: "/admin-dashboard",
    icon: getIcon("streamline:group-meeting-call-solid"),
  },
  {
    title: "Personality & Behavioral",
    path: "/admin-dashboard",
    icon: getIcon("solar:pen-new-square-bold"),
  },
  {
    title: "Configuration",
    path: "/admin-dashboard",
    icon: getIcon("solar:pen-new-square-bold"),
  },
];

export { NavConfigAdmin };