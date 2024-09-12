import Modal from './Modal';
import React from 'react';

const DialogModal = ({ show = false, maxWidth = '2xl', closeable = true, onClose, children }) => {
    const slots = React.Children.toArray(children);
    const title = slots.find((child) => child.props.slot === 'title');
    const content = slots.find((child) => child.props.slot === 'content');
    const footer = slots.find((child) => child.props.slot === 'footer');
    const close = () => {
        if (onClose) onClose();
    };

    return (
        <Modal show={show} maxWidth={maxWidth} closeable={closeable} onClose={close}>
            <div className="px-6 py-4">
                <div className="text-lg font-medium text-gray-900">{title}</div>

                <div className="mt-4 text-sm text-gray-600">{content}</div>
            </div>

            <div className="flex flex-row justify-end px-6 py-4 bg-gray-100 text-end">{footer}</div>
        </Modal>
    );
};

export default DialogModal;
