import { Component } from 'react';
import PropTypes from 'prop-types';

import d from './modal.module.css';

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleCloseModalByEscape);
        document.body.style.overflow = 'hidden';
    }
    
    componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEscape);
    document.body.style.overflow = '';
    }

    handleCloseModalByEscape = e => {
    if (e.code === 'Escape') {
        this.props.closeModal();
    }
    };

    handleCloseModal = e => {
    if (e.target === e.currentTarget) {
        this.props.closeModal();
    }
    };

    render() {
        const {image} = this.props;
        return(
            <div className={d.overlay} onClick={this.handleCloseModal}>
                <img className={d.modalImg} src={image} alt="" />
            </div>
        )
    }
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
}

export default Modal;