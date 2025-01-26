import styles from "../IngredientDetails.module.css";

type Props = {
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
};

const labels = {
    calories: "Калории,ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
};

export default function IngredientList(props: Props) {
    return (
        <ul className={styles.list}>
            {Object.keys(labels).map((label) => (
                <li key={label} className={styles.item}>
                    <span className="text text_type_main-default text_color_inactive">
                        {labels[label as keyof typeof labels]}
                    </span>
                    <span className="text text_type_digits-default text_color_inactive">
                        {props[label as keyof typeof labels]}
                    </span>
                </li>
            ))}
        </ul>
    );
}
