import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIngredientsItem as Item } from "./components/BurgerIngredientsItem";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getIngredients } from "../../services/thunks/ingredientsThunks";
import styles from "./BurgerIngredients.module.css";

const tabs = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
};

type TabsKeys = keyof typeof tabs;

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
