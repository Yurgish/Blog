import { FC } from "react";
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
}

const AlertModal: FC<IAlertModalProps> = ({
    alertText = "Are you sure in your actions?",
    confirmText = "Confirm",
    denyText = "Deny",
    onConfirm,
    onDeny,
    isVisible,
    onClose,
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
        <Modal isVisible={isVisible} onClose={onClose} modalClassName="max-w-80">
            <div className="flex flex-col items-center">
                <p className="text-xl mb-2 text-center">{alertText}</p>
                <div className="flex gap-2 w-full flex-wrap justify-around">
                    <Button value={confirmText} onClick={handleConfirm} className="px-5 py-2"></Button>
                    <Button value={denyText} onClick={handleDeny} className="px-5 py-2"></Button>
                </div>
            </div>
        </Modal>
    );
};

export default AlertModal;
