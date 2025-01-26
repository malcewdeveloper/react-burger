import React from "react";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { Navigate, Outlet } from "react-router";
import { getUser } from "../../services/thunks/authThunks";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
    const dispatch = useAppDispatch();
    const { user, isLoading, isError, errorMessage } = useAppSelector(
        (state) => state.auth,
    );

    React.useEffect(() => {
        dispatch(getUser());
    }, []);

    React.useEffect(() => {
        if (isError) {
            toast.error(errorMessage);
        }
    }, [isError, errorMessage]);

    return isLoading ? (
        <ClipLoader
            size={150}
            color="#4C4CFF"
            cssOverride={{ margin: "0 auto", borderWidth: "5px" }}
        />
    ) : user ? (
        <Navigate to="/" replace />
    ) : (
        <div className={styles.container}>
            <Outlet />
        </div>
    );
}
