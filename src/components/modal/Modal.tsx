import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Modal.module.css";

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

function Modal({ children, isOpen, onClose }: Props) {
    React.useEffect(() => {
        isOpen
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "");

        document.addEventListener("keydown", (event) => handleKeyDown(event));

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", (event) =>
                handleKeyDown(event),
            );
        };
    }, [isOpen]);

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") onClose();
    }

    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <ModalOverlay onClose={onClose}>
            <div className={`${styles.container}`}>
                <div
                    className={styles.modal}
                    role="dialog"
                    aria-describedby="modal-description"
                    aria-hidden={isOpen}
                >
                    <div id="modal-description">{children}</div>
                    <button className={styles.button} onClick={onClose}>
                        <CloseIcon type="primary" />
                    </button>
                </div>
            </div>
        </ModalOverlay>,
        document.getElementById("modal-root") as Element,
    );
}

export default Modal;