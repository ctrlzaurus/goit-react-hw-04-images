import { useState } from 'react';

import { TfiSearch } from "react-icons/tfi";
import { toast } from 'react-toastify';

import d from './searchbar.module.css';

function Searchbar({onSubmit}) {
    const [searchValue, setSearchValue] = useState('');

    const handlerChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handlerSubmit = (event) => {
        event.preventDefault();
        if (searchValue === '') {
            return toast.error('Wasted!')
        }

        onSubmit(searchValue);
        setSearchValue('');

        event.target.reset();
    };

    return(
        <header className={d.searchBar}>
            <form action='' onSubmit={handlerSubmit} className={d.searchbarForm}>
                <input
                // value={this.state.userValue}
                onChange={handlerChange}
                className={d.input}
                type='text'
                autoComplete='off'
                autoFocus
                placeholder='Search images and photos'
                />
                <button type='submit' className={d.button}>
                    <TfiSearch width={20}/>
                </button>
            </form>
        </header>
    )
}

export default Searchbar;

