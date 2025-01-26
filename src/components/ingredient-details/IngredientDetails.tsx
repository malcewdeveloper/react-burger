import { ItemType } from "../../types";
import IngredientList from "./components/IngredientList";
import styles from "./IngredientDetails.module.css";

type Props = ItemType;

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
                <IngredientList {...props} />
            </div>
        </div>
    );
}

export default IngredientDetails;
