import { Component } from 'react';

// import icon from '../../svg/symbol-defs.svg';
import { TfiSearch } from "react-icons/tfi";
import { toast } from 'react-toastify';

import d from './searchbar.module.css';

class Searchbar extends Component {
    state = {
        searchValue: '',
    };

    handlerChange = (event) => {
        this.setState({searchValue: event.target.value});
    };

    handlerSubmit = (event) => {
        event.preventDefault();
        if (this.state.searchValue === '') {
            return toast.error('Wasted!')
        }

        this.props.onSubmit(this.state.searchValue);
        this.setState({searchValue: ''});
    };

    render() {
        return(
            <header className={d.searchBar}>
                <form action='' onSubmit={this.handlerSubmit} className={d.searchbarForm}>
                    <input
                    value={this.state.userValue}
                    onChange={this.handlerChange}
                    className={d.input}
                    type='text'
                    autoComplete='off'
                    autoFocus
                    placeholder='Search images and photos'
                    />
                    <button type='submit' className={d.button}>
                        <TfiSearch width={20}/>
                        {/* <svg className={d.buttonIcon} width={18} height={18}>
                            <use href={ TfiSearch }></use>
                        </svg> */}
                    </button>
                </form>
            </header>
        )
    };
}

export default Searchbar;

