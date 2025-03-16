import React from "react";
import IngredientList from "../../components/ingredient-details/components/IngredientList";
import { ClipLoader } from "react-spinners";
import { Link, Navigate, useParams } from "react-router";
import { addProduct } from "../../services/slices/view/viewSlice";
import { getIngredients } from "../../services/thunks/ingredientsThunks";
import { useAppDispatch, useAppSelector } from "../../services/store";
import styles from "./Ingredient.module.css";

export default function Ingredient() {
    const { id } = useParams();
    const { data, isLoading } = useAppSelector((state) => state.ingredients);
    const { selectProduct } = useAppSelector((state) => state.view);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getIngredients());
    }, []);

    React.useEffect(() => {
        if (data.length) {
            const currentIngredient = data.find((item) => item._id === id);

            currentIngredient && dispatch(addProduct(currentIngredient));
        }
    }, [data]);

    return isLoading ? (
        <ClipLoader
            size={150}
            color="#4C4CFF"
            cssOverride={{ margin: "0 auto", borderWidth: "5px" }}
        />
    ) : data && selectProduct ? (
        <div className={`${styles.container} pt-30`}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            <img
                className={`${styles.image} mb-4`}
                src={selectProduct.image}
                alt={selectProduct.name}
            />
            <h2 className="text text_type_main-medium mb-8">
                {selectProduct.name}
            </h2>
            <IngredientList {...selectProduct} />
        </div>
    ) : (
        <div style={{ margin: "0 auto", textAlign: "center" }}>
            <div className="text text_type_main-medium mb-4">
                Ингридиент не найден
            </div>
            <Link
                to="/"
                className="text text_type_main-default text_color_inactive"
            >
                В конструктор
            </Link>
        </div>
    );
}
