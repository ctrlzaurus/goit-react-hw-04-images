import React from 'react';
import PropTypes from 'prop-types';

import d from './button.module.css'

const Btn = ({onClick}) => {
    return <button className={d.buttonLM} onClick={onClick}>Load more</button>
}

Btn.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default Btn;