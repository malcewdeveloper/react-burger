import React from "react";
import { ClipLoader } from "react-spinners";
import { Navigate, useLocation } from "react-router";
import { getUser } from "../../services/thunks/authThunks";
import { useAppDispatch, useAppSelector } from "../../services/store";

type Props = {
    element: React.ReactElement;
};

export default function ProtectedRoute({
    element,
}: Props): React.ReactElement | null {
    const { user, isLoading } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    const location = useLocation();

    React.useEffect(() => {
        dispatch(getUser());
    }, []);

    return isLoading ? (
        <ClipLoader
            size={150}
            color="#4C4CFF"
            cssOverride={{ margin: "0 auto", borderWidth: "5px" }}
        />
    ) : user ? (
        element
    ) : (
        <Navigate
            to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
            replace
        />
    );
}
