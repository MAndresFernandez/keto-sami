import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

function Modal({ children, onClose, className = '' }) {
    useEffect(() => {
        // Prevent scrolling on the body when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return createPortal(
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget && onClose) {
                    onClose();
                }
            }}
        >
            <div className={`modal-content mb-12 sm:mb-0 ${className}`}>
                {children}
            </div>
        </div>,
        document.body
    );
}

export default Modal;
