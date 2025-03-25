import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/auth";
import userApi from "../../api/user";
import {
    ResponseAuth,
    RequestForgotData,
    RequestResetData,
    ResponseAuthData,
    RequestRegisterData,
    RequestLoginData,
} from "../../api/auth/types";
import { RequestUserUpdate, ResponseUser } from "../../api/user/types";

export const register = createAsyncThunk<ResponseAuthData, RequestRegisterData>(
    "auth/register",
    authApi.register,
);

export const login = createAsyncThunk<ResponseAuthData, RequestLoginData>(
    "auth/login",
    authApi.login,
);

export const logout = createAsyncThunk<ResponseAuth>(
    "auth/logout",
    authApi.logout,
);

export const forgotPassword = createAsyncThunk<ResponseAuth, RequestForgotData>(
    "auth/forgot",
    authApi.forgotPassword,
);

export const resetPassword = createAsyncThunk<ResponseAuth, RequestResetData>(
    "auth/reset",
    authApi.resetPassword,
);

export const getUser = createAsyncThunk<ResponseUser>(
    "get/user",
    userApi.getUser,
);

export const updateUser = createAsyncThunk<ResponseUser, RequestUserUpdate>(
    "patch/user",
    userApi.updateUser,
);
