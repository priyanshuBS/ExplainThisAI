import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRoutes;