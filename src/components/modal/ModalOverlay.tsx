import React from "react";
import styles from "./Modal.module.css";

type Props = {
    children: React.ReactNode;
    onClose: () => void;
};

function ModalOverlay({ children, onClose }: Props) {
    function handleClose(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`${styles.overlay} pt-30 pb-30`} onClick={handleClose}>
            {children}
        </div>
    );
}

export default ModalOverlay;
