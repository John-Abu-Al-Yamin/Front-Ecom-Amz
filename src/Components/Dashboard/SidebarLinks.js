import { FaUsers } from "react-icons/fa"; // أيقونة المستخدمين
import { IoPersonAddOutline, IoAdd } from "react-icons/io5"; // أيقونة إضافة المستخدمين
import { MdCategory, MdAddBox } from "react-icons/md"; // أيقونات التصنيفات
import { FaBox, FaPlusSquare } from "react-icons/fa"; // أيقونات المنتجات

const sidebarLinks = [
  {
    to: "users",
    icon: FaUsers, // أيقونة المستخدمين
    label: "Users",
    role: ["1995", "1999"],
  },
  {
    to: "user/add",
    icon: IoPersonAddOutline, // أيقونة إضافة المستخدم
    label: "Add User",
    role: ["1995", "1999"],
  },
  {
    to: "categories",
    icon: MdCategory, // أيقونة التصنيفات
    label: "Categories",
    role: ["1995", "1999"],
  },
  {
    to: "category/add",
    icon: MdAddBox, // أيقونة إضافة تصنيف
    label: "Add Category",
    role: ["1995", "1999"],
  },
  {
    to: "products",
    icon: FaBox, // أيقونة المنتجات
    label: "Products",
    role: ["1995", "1999"],
  },
  {
    to: "product/add",
    icon: FaPlusSquare, 
    label: "Add Product",
    role: ["1995", "1999"],
  },
];

export default sidebarLinks;
