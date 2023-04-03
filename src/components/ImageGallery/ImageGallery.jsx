import React from 'react';

import PropTypes from 'prop-types';

import d from '../ImageGallery/imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({images, openModal}) => {
    return (
        <ul className={d.gallery}>
            {images.map(({id, webformatURL, largeImageURL}) => (
                <ImageGalleryItem 
                    key={id} 
                    openModal={openModal}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                />
            ))}    
        </ul>
    );
};

ImageGallery.protoType = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}

export default ImageGallery;