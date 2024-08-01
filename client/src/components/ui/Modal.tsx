import React, { FC } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface IModalProps {
    isVisible: boolean;
    children?: React.ReactNode;
    modalClassName?: string;
    overlayClassName?: string;
    onClose: () => void;
}

const overlayVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

const modalVariants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        y: 30,
        transition: { duration: 0.2 },
    },
};

const Modal: FC<IModalProps> = ({ isVisible, children, modalClassName, overlayClassName, onClose }) => {
    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed inset-0 bg-background-black bg-opacity-55 z-30 ${overlayClassName}`}
                    onClick={() => {
                        onClose();
                    }}
                    variants={overlayVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <motion.div
                        className="fixed inset-0 z-40 min-h-screen flex justify-center items-center p-16"
                        variants={modalVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.div>
                            <div
                                className={`bg-background-black border border-green px-7 py-5 max-sm:px-6 max-sm:py-4 ${modalClassName}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                {children}
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default Modal;
