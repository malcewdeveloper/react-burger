import React from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { ItemTypes, ApiStateTypes } from "../../types";
import { API_URL } from "../../constants";
import style from "./App.module.css";

function App() {
    const [state, setState] = React.useState<ApiStateTypes<ItemTypes[]>>({
        hasError: false,
        isLoading: false,
        data: [],
    });

    React.useEffect(() => {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        fetch(`${API_URL}/ingredients`)
            .then((response) => response.json())
            .then((data) =>
                setState((prevState) => ({ ...prevState, data: data.data })),
            )
            .catch((error) => {
                setState((prevState) => ({ ...prevState, hasError: true }));
                console.log(error);
            })
            .finally(() =>
                setState((prevState) => ({ ...prevState, isLoading: false })),
            );
    }, []);

    return (
        <>
            <AppHeader />
            <section className={style.section}>
                {state.isLoading ? (
                    <div>Загрузка...</div>
                ) : state.hasError ? (
                    <div>Ошибка при загрузке данных</div>
                ) : (
                    <BurgerIngredients items={state.data} />
                )}
                {state.isLoading ? (
                    <div>Загрузка...</div>
                ) : state.hasError ? (
                    <div>Ошибка при загрузке данных</div>
                ) : (
                    <BurgerConstructor items={state.data} />
                )}
            </section>
        </>
    );
}

export default App;
