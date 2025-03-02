import styles from "../ListOrders.module.css";

type Props = {
    background: string;
    text?: string;
    style?: React.CSSProperties;
};

export function ListOrdersBadge({ background, text, ...props }: Props) {
    const style = text
        ? {
              background,
              opacity: 0.6,
          }
        : {
              background,
          };

    return (
        <span className={styles.badge} {...props}>
            <span className={styles.badgeBackground} style={style}></span>
            {text && (
                <span className={`text text_type_main-default ${styles.extra}`}>
                    {text}
                </span>
            )}
        </span>
    );
}
