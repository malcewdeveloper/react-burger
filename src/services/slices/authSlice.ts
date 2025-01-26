import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    forgotPassword,
    resetPassword,
    register,
    login,
    logout,
    getUser,
    updateUser,
} from "../thunks/authThunks";
import { UserTypeWithoutPassword } from "../../types";
import { ResponseAuthData } from "../../api/auth/types";
import { ResponseUser } from "../../api/user/types";

type State = {
    user: UserTypeWithoutPassword | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
};

const initialState: State = {
    user: null,
    isLoading: true,
    isError: false,
    errorMessage: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isError = false;
            })
            .addCase(register.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(
                register.fulfilled,
                (state, { payload }: PayloadAction<ResponseAuthData>) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.user = payload.user;
                },
            )

            .addCase(login.pending, (state) => {
                state.isError = false;
            })
            .addCase(login.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(
                login.fulfilled,
                (state, { payload }: PayloadAction<ResponseAuthData>) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.user = payload.user;
                },
            )

            .addCase(logout.pending, (state) => {
                state.isError = false;
            })
            .addCase(logout.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.user = null;
            })

            .addCase(forgotPassword.pending, (state) => {
                state.isError = false;
            })
            .addCase(forgotPassword.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
            })

            .addCase(resetPassword.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(resetPassword.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
            })

            .addCase(getUser.pending, (state) => {
                state.isError = false;
            })
            .addCase(getUser.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(
                getUser.fulfilled,
                (state, { payload }: PayloadAction<ResponseUser>) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.user = payload.user;
                },
            )

            .addCase(updateUser.pending, (state) => {
                state.isError = false;
            })
            .addCase(updateUser.rejected, (state, { error }) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = error.message
                    ? error.message
                    : "Что-то пошло не так, попробуйте еще раз.";
            })
            .addCase(
                updateUser.fulfilled,
                (state, { payload }: PayloadAction<ResponseUser>) => {
                    state.isLoading = false;
                    state.isError = false;
                    state.user = payload.user;
                },
            );
    },
});

export default authSlice.reducer;
