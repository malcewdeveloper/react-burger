import {
    ConstructorElement,
    Button,
    DragIcon,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ItemTypes } from "../../types";
import styles from "./BurgerConstructor.module.css";

type Props = {
    items: ItemTypes[];
};

type ItemProps = {
    thumbnail: string;
    type?: "top" | "bottom";
    text: string;
    price: number;
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
};

function Item(props: ItemProps) {
    return (
        <li className={`${styles.item} pl-8 ${props.extraClass}`}>
            {!!!props.type && (
                <button className={styles.grab}>
                    <DragIcon type="primary" />
                </button>
            )}
            <ConstructorElement {...props} />
        </li>
    );
}

function BurgerConstructor({ items }: Props) {
    const filteredItems = items.filter((item) => item.type !== "bun");
    const bunItem = items.find((item) => item.type === "bun");
    const count = items.reduce((prev, current) => prev + current.price, 0);

    return (
        <aside className={`${styles.aside} pl-4 pr-4 pt-25`}>
            {bunItem && (
                <Item
                    thumbnail={bunItem.image}
                    text={`${bunItem.name} (верх)`}
                    price={bunItem.price}
                    type="top"
                    isLocked
                />
            )}
            <ul className={`${styles.list} pt-4`}>
                {filteredItems.map((item) => (
                    <Item
                        key={item._id}
                        thumbnail={item.image}
                        text={item.name}
                        price={item.price}
                    />
                ))}
            </ul>
            {bunItem && (
                <Item
                    thumbnail={bunItem.image}
                    text={`${bunItem.name} (низ)`}
                    price={bunItem.price}
                    type="bottom"
                    extraClass="pt-4"
                    isLocked
                />
            )}
            <div className={`${styles.info} pt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{count}</p>
                    <CurrencyIcon type="primary" className={styles.icon} />
                </div>
                <Button htmlType="button" size="large">
                    Оформить заказ
                </Button>
            </div>
        </aside>
    );
}

export default BurgerConstructor;
