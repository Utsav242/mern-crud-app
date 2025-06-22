import AddUser from "./addUser/AddUser";
import "./App.css";
import User from "./getUser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./updateUser/UpdateUser";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add-user",
      element: <AddUser />,
    },
    {
      path: "/update-user/:id",
      element: <UpdateUser />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
