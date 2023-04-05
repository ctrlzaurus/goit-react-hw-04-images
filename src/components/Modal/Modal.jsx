import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import d from './modal.module.css';

function Modal({closeModal, image}) {
    const handleCloseModalByEscape = useCallback(e => {
        if (e.code === 'Escape') {
            closeModal();
        }},[closeModal]);
        
    useEffect(() => {
        window.addEventListener('keydown', handleCloseModalByEscape);
        document.body.style.overflow = 'hidden';
        return() => {
            window.removeEventListener('keydown', handleCloseModalByEscape);
            document.body.style.overflow = '';
        }
    }, [handleCloseModalByEscape]);

    const handleCloseModal = e => {
    if (e.target === e.currentTarget) {
        closeModal();
    }};

    return(
        <div className={d.overlay} onClick={handleCloseModal}>
            <img className={d.modalImg} src={image} alt="" />
        </div>
    )
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default Modal;