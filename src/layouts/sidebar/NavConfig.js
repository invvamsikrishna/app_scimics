import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={16} height={16} />;

const navConfig = [
  {
    title: "ICAP Test",
    path: "/user/icap-test",
    icon: getIcon("bxs:dashboard"),
  },
  {
    title: "My Test Reports",
    path: "/user/test-reports",
    icon: getIcon("streamline:desktop-code-solid"),
  },
  {
    title: "Webinars",
    path: "/user/webinars",
    icon: getIcon("streamline:group-meeting-call-solid"),
  },
  {
    title: "Blog",
    path: "/user/blog",
    icon: getIcon("solar:pen-new-square-bold"),
  },
];

export { navConfig };
