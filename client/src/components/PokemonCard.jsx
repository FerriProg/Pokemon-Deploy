import React from "react";
import style from "../styles/PokemonCard.module.css"
import { Link } from "react-router-dom";

export default function PokemonCard({image, name, attack, types, id}) {

    return (
        <div className={style.container}>
            <img src={image} alt="img not found" width="250px" height="200px" />
            <Link to={'/home/' + id}  className={style.name}>
            <h2>{name}</h2>
            </Link>
            <p className={style.blue}>Attack: {attack}</p>
            <p className={style.blue}>Types: {(types.map(el => (el.name))).join(', ')}</p>
        </div>
    );
}