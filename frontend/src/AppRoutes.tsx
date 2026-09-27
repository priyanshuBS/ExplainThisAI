import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/"
                    element={
                        <div className="p-8">
                            Dashboard
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;