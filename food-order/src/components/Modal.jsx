import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
// import Button from "./Button";
const Modal = ({ children, open }) => {
    const modal = useRef();
    useEffect(() => {
        if (open) {
            modal.current.showModal();
        } else {
            modal.current.close();
        }
    }, [open]);
    return createPortal(
        <dialog className="modal" ref={modal}>
            {children}
            {/* <div className="modal-actions">
                <Button textBtn onClick={onCloseCart}>
                    Close
                </Button>
                <Button>Go To Checkout</Button>
            </div> */}
        </dialog>,
        document.getElementById("modal")
    );
};

export default Modal;
