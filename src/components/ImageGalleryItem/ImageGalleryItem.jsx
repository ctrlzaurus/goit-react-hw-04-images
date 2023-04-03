import React from "react";
import PropTypes from 'prop-types';

import d from '../ImageGalleryItem/imageGalleryItem.module.css'

const ImageGalleryItem = ({webformatURL, largeImageURL, openModal}) => {
    return (
        <li className={d.galleryItem} onClick={() => openModal({image: largeImageURL})}>
            <img src={webformatURL} alt="" />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default ImageGalleryItem;