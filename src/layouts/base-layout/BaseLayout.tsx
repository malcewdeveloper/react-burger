import AppHeader from "../../components/app-header/AppHeader";
import { Outlet } from "react-router";

export default function BaseLayout() {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    );
}
