import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchNamePokemon } from "../redux/actions";
import style from '../styles/SearchBar.module.css';

export function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [isSearching, setSearching] = useState(false);

    function handleInputChange(event) {
        setName(event.target.value);
    }

    function handleSubmit() {
        if (!name.trim()) {
            setName("")
            return alert("You have to fill the input first");
        }
        setSearching(true)
        dispatch(searchNamePokemon(name.trim()))
        .then(() => {setSearching(false)});
        setName("");
    }

    return (
        <div>
            <input
            className={style.blue}
            type = 'text'
            placeholder = {isSearching ? 'Searching...' : 'Search Pokemon...' }
            value = {name}
            onChange = {handleInputChange}
            />
            <button className={style.blue} type = 'submit' onClick = {handleSubmit}>Search</button>
            
        </div>
    )
}