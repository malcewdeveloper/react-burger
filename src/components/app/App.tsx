import { BrowserRouter as Router, Routes, Route } from "react-router";
import BaseLayout from "../../layouts/base-layout/BaseLayout";
import Main from "../../pages/main/Main";
import {
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    Profile,
    Ingredient,
} from "../../pages";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ingredients/:id" element={<Ingredient />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
