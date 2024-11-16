import { FaUsers } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { SiLibreofficewriter } from "react-icons/si";
import { MdCategory } from "react-icons/md";

const sidebarLinks = [
  {
    to: "users",
    icon: FaUsers,
    label: "Users",
    role: ["1995", "1999"]
  },
  {
    to: "user/add",
    icon: IoAdd,
    label: "Add User",
    role: ["1995", "1999"]
  },
  {
    to: "categories",
    icon: MdCategory,
    label: "Categories",
    role: ["1995", "1999"]
  },
  {
    to: "category/add",
    icon: IoAdd,
    label: "Add Category",
    role: ["1995", "1999"]
  },
  {
    to: "writer",
    icon: SiLibreofficewriter,
    label: "Writer",
    role: ["1996", "1995"]
  }
];

export default sidebarLinks;
