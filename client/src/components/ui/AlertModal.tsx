import { FC, ReactNode } from "react";
import Modal from "./Modal";
import Button from "./Button";

interface IAlertModalProps {
    onConfirm: () => void;
    onDeny?: () => void;
    isVisible: boolean;
    onClose: () => void;
    alertText?: string;
    confirmText?: string;
    denyText?: string;
    children?: ReactNode;
    modalClassName?: string;
    overlayClassName?: string;
}

const AlertModal: FC<IAlertModalProps> = ({
    alertText = "Are you sure in your actions?",
    confirmText = "Confirm",
    denyText = "Deny",
    onConfirm,
    onDeny,
    isVisible,
    onClose,
    children,
    modalClassName,
    overlayClassName,
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    const handleDeny = () => {
        if (onDeny) {
            onDeny();
        }
        onClose();
    };
    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            modalClassName={`max-w-80 ${modalClassName}`}
            overlayClassName={overlayClassName}
        >
            <div className="flex flex-col items-center">
                <p className="text-xl mb-2">{alertText}</p>
                {children}
                <div className="flex gap-2 w-full flex-wrap">
                    <Button onClick={handleConfirm} size="small">
                        {confirmText}
                    </Button>
                    <Button onClick={handleDeny} size="small" variant="deny">
                        {denyText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AlertModal;
