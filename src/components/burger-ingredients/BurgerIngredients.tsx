import React from "react";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ItemTypes } from "../../types";
import styles from "./BurgerIngredients.module.css";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

type Props = {
    items: ItemTypes[];
};

const tabs = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
};

type TabsKeys = keyof typeof tabs;

function Item(props: ItemTypes) {
    const { name, price, image, __v: count } = props;

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <li
                onClick={handleOpenModal}
                className={`${styles.item} pl-4 pr-4`}
            >
                <img src={image} alt={name} />
                <div className={`${styles.currency} pt-2 pb-2`}>
                    <span
                        className={`text text_type_main-default ${styles.price}`}
                    >
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">{name}</p>
                {!!count && <Counter count={count} />}
            </li>
            <Modal isOpen={openModal} onClose={handleCloseModal}>
                <IngredientDetails {...props} />
            </Modal>
        </>
    );
}

function BurgerIngredients({ items }: Props) {
    const [active, setActive] = React.useState<TabsKeys>("bun");

    return (
        <main className={styles.main}>
            <h1 className="text text_type_main-large pb-5 pt-10">
                Соберите бургер
            </h1>
            <div className={styles.tabs}>
                {Object.entries(tabs).map(([key, value]) => (
                    <a key={key} href={`#${key}`} className={styles.link}>
                        <Tab
                            active={active === key}
                            value={key}
                            onClick={() => setActive(key as TabsKeys)}
                        >
                            {value}
                        </Tab>
                    </a>
                ))}
            </div>
            <section className={`${styles.wrapper}`}>
                {Object.keys(tabs).map((key) => (
                    <React.Fragment key={key}>
                        <h2
                            className="text text_type_main-medium pt-10 pb-6"
                            id={key}
                        >
                            {tabs[key as TabsKeys]}
                        </h2>
                        <ul className={`${styles.content} pl-4 pr-4`}>
                            {items
                                .filter((item) => item.type === key)
                                .map((item) => (
                                    <Item key={item._id} {...item} />
                                ))}
                        </ul>
                    </React.Fragment>
                ))}
            </section>
        </main>
    );
}

export default BurgerIngredients;
