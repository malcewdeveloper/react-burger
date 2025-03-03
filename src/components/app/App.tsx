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
import MainLayout from "../../layouts/main-layout/MainLayout";
import {
    Main,
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Ingredient,
    NotFound,
    Feed,
    Orders,
    OrderInfo,
} from "../../pages";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderModal from "../order-modal/OrderModal";

function App() {
    const location = useLocation();
    const background = location.state?.background;

    return (
        <React.Fragment>
            <Routes location={background || location}>
                <Route element={<BaseLayout />}>
                    <Route path="/" index element={<Main />} />
                    <Route element={<MainLayout />}>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/feed/:id" element={<OrderInfo />} />
                    </Route>
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
                        <Route path="/profile/orders" element={<Orders />} />
                    </Route>
                    <Route
                        element={
                            <ProtectedRoute
                                element={<ProfileLayout hasMenu={false} />}
                            />
                        }
                    >
                        <Route
                            path="/profile/orders/:id"
                            element={<OrderInfo />}
                        />
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
                    />
                    <Route
                        path="/feed/:id"
                        element={<OrderModal isOpen={!!background} />}
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={<OrderModal isOpen={!!background} />}
                    />
                </Routes>
            )}
        </React.Fragment>
    );
}

export default App;
