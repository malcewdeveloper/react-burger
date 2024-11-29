import React from "react";
import { ItemTypes } from "../../types";
import styles from "./IngredientDetails.module.css";

type Props = ItemTypes;

const labels = {
    calories: "Калории,ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
};

function IngredientDetails({ image, name, ...props }: Props) {
    return (
        <div className={`${styles.details} pt-10 pr-10 pl-10 pb-15`}>
            <header>
                <h2 className="text text_type_main-large">
                    Детали ингредиента
                </h2>
            </header>
            <div className={styles.content}>
                <img className={styles.image} src={image} alt={name} />
                <h3 className="text text_type_main-medium pb-8">{name}</h3>
                <ul className={styles.list}>
                    {Object.keys(labels).map((label) => (
                        <li className={styles.item}>
                            <span className="text text_type_main-default text_color_inactive">
                                {labels[label as keyof typeof labels]}
                            </span>
                            <span className="text text_type_digits-default text_color_inactive">
                                {props[label as keyof typeof labels]}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default IngredientDetails;
