import React from "react";
import {
    Tab,
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { addProduct, removeProduct } from "../../services/slices/viewSlice";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getIngredients } from "../../services/thunks/ingredientsThunks";
import { ItemType } from "../../types";
import styles from "./BurgerIngredients.module.css";

const tabs = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
};

type TabsKeys = keyof typeof tabs;

function Item(props: ItemType) {
    const { name, price, image, __v: count } = props;

    const [openModal, setOpenModal] = React.useState(false);

    const dispatch = useAppDispatch();

    const handleOpenModal = () => {
        setOpenModal(true);
        dispatch(addProduct(props));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        dispatch(removeProduct());
    };

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

function BurgerIngredients() {
    const [active, setActive] = React.useState<TabsKeys>("bun");
    const { data, isLoading, isError } = useAppSelector(
        (state) => state.ingredients,
    );

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        const containerTop = event.currentTarget.getBoundingClientRect().top;
        const containerScroll = event.currentTarget.scrollTop;

        let closestKey: string | null = null;
        let distance = Infinity;

        Object.keys(tabs).forEach((key) => {
            const element = document.getElementById(key);

            if (element) {
                const elementTop =
                    element.getBoundingClientRect().top -
                    containerTop +
                    containerScroll;

                const distanceToTop = Math.abs(elementTop - containerScroll);

                if (distanceToTop < distance) {
                    distance = distanceToTop;
                    closestKey = key;
                }
            }
        });

        if (closestKey !== null) {
            setActive(closestKey);
        }
    };

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
            {isLoading ? (
                "Загрузка..."
            ) : isError ? (
                "Ошибка получения данных"
            ) : (
                <section
                    className={`${styles.wrapper}`}
                    onScroll={handleScroll}
                >
                    {Object.keys(tabs).map((key) => (
                        <React.Fragment key={key}>
                            <div id={key}>
                                <h2 className="text text_type_main-medium pt-10 pb-6">
                                    {tabs[key as TabsKeys]}
                                </h2>
                                <ul className={`${styles.content} pl-4 pr-4`}>
                                    {data
                                        .filter((item) => item.type === key)
                                        .map((item) => (
                                            <Item key={item._id} {...item} />
                                        ))}
                                </ul>
                            </div>
                        </React.Fragment>
                    ))}
                </section>
            )}
        </main>
    );
}

export default BurgerIngredients;
