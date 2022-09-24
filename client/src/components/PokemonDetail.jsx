import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, clearDetail } from "../redux/actions";
import style from '../styles/PokemonDetail.module.css';
import loading from '../images/loading.gif';
import logo from '../images/logo.svg';
import notfound from '../images/notfoundd.png';


export default function PokemonDetail () {

    const dispatch = useDispatch();
    let { id } = useParams();
    const myPokemon = useSelector(state => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
        return () => dispatch(clearDetail())
    },[dispatch, id])

    return (
        <div className={style.details}>
            <div className={style.column}>
            <div>
                <img src={logo} alt="img not found" width='200px' height='100px'/>
            </div>
            <div>
                <Link to="/home">
                    <button className={style.blue}>Home</button>
                </Link>
                <Link to="/create">
                    <button className={style.blue}>Create Pokemon</button>
                </Link>
            </div>
            </div>
            
            {
                (myPokemon.length && myPokemon[0] !== 'Not Found') ?
                
                    <div className={style.detailCard}>
                        <div className={style.rowInfo}>
                            <div className={style.name}>
                                <h1 className={style.blue}>Name: {myPokemon[0].name}</h1>
                                <img src={myPokemon[0].image} alt='' width='200px' height='300px' />
                            </div>
                            <div className={style.properties}>
                                <span className={style.blue}>ID: {myPokemon[0].id}</span>
                                <span className={style.blue}>HP: {myPokemon[0].hp}</span>
                                <span className={style.blue}>Attack: {myPokemon[0].attack}</span>
                                <span className={style.blue}>Defense: {myPokemon[0].defense}</span>
                                <span className={style.blue}>Speed: {myPokemon[0].speed}</span>
                                <span className={style.blue}>Height: {myPokemon[0].height}</span>
                                <span className={style.blue}>Weight: {myPokemon[0].weight}</span>
                                <span className={style.blue}>Types: {(myPokemon[0].types.map(type => type.name)).join(', ')}</span>
                            </div>
                        </div>
                    </div>
                : (myPokemon.length && myPokemon[0] === 'Not Found') ?
                    <div>
                        <h1 className={style.blue}>Nothing found</h1>
                        <img src={notfound} background='transparent' alt="img not found" width='300px' height='200px'/>
                    </div>
                    
                :
                    <div className={style.bodyReloading}>
                        <img src={loading} alt="img not found"/>
                    </div>
            }
            {
                myPokemon.length?
                    <Link to= '/home'>
                    <button className={style.blue}>Go back</button>
                    </Link>
                : null
            }
            
        </div>
    )
}