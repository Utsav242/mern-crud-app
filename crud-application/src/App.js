import AddUser from "./addUser/AddUser";
import "./App.css";
import User from "./getUser/User";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useLocation } from "react-router-dom";
import UpdateUser from "./updateUser/UpdateUser";
import Header from "./components/Header/header";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Auth wrapper for protected routes
const RequireAuth = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// Layout component to wrap Header and page content
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

function App() {
  const route = createBrowserRouter([
    // Public routes (no header)
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    // Protected/app routes (with header)
    {
      path: "/",
      element: <Layout />, // Wrap all routes with Header
      children: [
        { path: "", element: <RequireAuth><User /></RequireAuth> },
        { path: "add-user", element: <RequireAuth><AddUser /></RequireAuth> },
        { path: "update-user/:id", element: <RequireAuth><UpdateUser /></RequireAuth> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
