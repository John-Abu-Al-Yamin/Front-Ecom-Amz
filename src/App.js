import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

// Pages
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import Users from "./Pages/Dashboard/Users";
import UpdateUser from "./Pages/Dashboard/UpdateUser";
import AddUser from "./Pages/Dashboard/AddUser";
import Err403 from "./Pages/Auth/Err403";
import Writer from "./Pages/Dashboard/Writer";
import Err404 from "./Pages/Auth/Err404";
import RequireBack from "./Pages/Auth/RequireBack";
import Categories from "./Pages/Dashboard/Categories";
import AddCategory from "./Pages/Dashboard/AddCategory";
import UpdateCategory from "./Pages/Dashboard/UpdateCategory";
import ProductsHome from "./Pages/Dashboard/Products/ProductsHome";
import AddProducts from "./Pages/Dashboard/Products/AddProducts";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Route>

        <Route path="/auth/google/callback" element={<GoogleCallBack />} />

        {/*   Private Routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996","1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/add" element={<AddUser />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="categories/:id" element={<UpdateCategory />} />
              <Route path="products" element={<ProductsHome />} />
              <Route path="product/add" element={<AddProducts />} />
              <Route path="products/:id" element={<UpdateProduct />} />

            </Route>

            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              <Route path="categories" element={<Categories />} />
            </Route>

            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>

        {/* Error 404 */}
        <Route path="*" element={<Err404 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
