import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
};

export default function Modal({ children, open, onClose }: ModalProps) {
    const modalRef = useRef<null | HTMLDialogElement>(null);

    useEffect(() => {
        const modal = modalRef.current;

        if (open) {
            modal!.showModal();
        }

        return () => modal!.close();
    }, [open]);

    return createPortal(
        <dialog ref={modalRef} onClose={onClose} className="modal">
            {children}
        </dialog>,
        document.getElementById("modal-root")!
    );
}
