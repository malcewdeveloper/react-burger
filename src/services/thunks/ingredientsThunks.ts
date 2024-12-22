import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";
import { checkResponse } from "../../utils";

export const getIngredients = createAsyncThunk(
    "ingredients/get",
    async () => await fetch(`${API_URL}/ingredients`).then(checkResponse),
);
