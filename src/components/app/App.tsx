import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router";
import BaseLayout from "../../layouts/base-layout/BaseLayout";
import AuthLayout from "../../layouts/auth-layout/AuthLayout";
import ProfileLayout from "../../layouts/profile-layout/ProfileLayout";
import {
    Main,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Ingredient,
    NotFound,
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { useAppSelector } from "../../services/store";

function App() {
    const location = useLocation();
    const background = location.state?.background;

    return (
        <React.Fragment>
            <Routes location={background || location}>
                <Route element={<BaseLayout />}>
                    <Route path="/" index element={<Main />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                    </Route>
                    <Route
                        element={<ProtectedRoute element={<ProfileLayout />} />}
                    >
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/orders" />
                        <Route path="/prodile/orders/:id" />
                    </Route>
                    <Route path="/ingredients/:id" element={<Ingredient />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={<IngredientDetails isOpen={!!background} />}
                    ></Route>
                </Routes>
            )}
        </React.Fragment>
    );
}

export default App;
