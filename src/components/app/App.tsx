import React from "react";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from "./App.module.css";

function App() {
    return (
        <>
            <AppHeader />
            <section className={style.section}>
                <BurgerIngredients />
                <BurgerConstructor />
            </section>
        </>
    );
}

export default App;
