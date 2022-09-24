import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterCreated, orderByName, sortByAttack, filterTypes, clearState, clearSpecial } from "../redux/actions";
import PokemonCard from "./PokemonCard";
import { SearchBar } from "./SearchBar";
import style from '../styles/Home.module.css';
import { Link } from "react-router-dom";
import loading from '../images/loading.gif';
import logo from '../images/logo.svg';
import notfound from '../images/notfoundd.png';


export default function Home() {

    const dispatch = useDispatch();
    const [nameSort, setNameSort] = useState("");
    const [attackSort, setAttackSort] = useState("");
    const [createdFilter, setCreatedFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const allTypes = useSelector(state => state.types);

    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const allPokemons = useSelector(state => state.pokemons);
    const totalPages = Math.ceil(allPokemons.length / pokemonsPerPage);
    const currentPokemons = useSelector(state =>
        state.pokemons
        ? state.pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
        : false
    );

    function prevPage () {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    }

    function nextPage () {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
    }

    if (currentPage > totalPages) prevPage();

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        return () => dispatch(clearSpecial())
    },[dispatch])                       

    function handleFilterCreated(event) {
        dispatch(filterCreated(event.target.value));
        setCurrentPage(1);
        setCreatedFilter(event.target.value);
    }

    function handleFilterByType(event) {
        dispatch(filterTypes(event.target.value));
        setCurrentPage(1);
        setTypeFilter(event.target.value);
    }

    function handleAttackSort(event) {
        dispatch(sortByAttack(event.target.value));
        setCurrentPage(1);
        setAttackSort(event.target.value);
    }

    function handleSort(event) {
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setNameSort(event.target.value);
    }

    function clear() {
        dispatch(clearState());
    }

    function refreshPage() {
        window.location.reload();
    }

    let key = 0;
    function addKey () {
        return key++;
    }

    if (!currentPokemons) {

        return (
            <div className={style.bodyReloading}>
                <img src={logo} alt="img not found" width='200px' height='100px'/>
                <h1 className={style.blue}>There are no pokemons.</h1>
                <img src={notfound} background='transparent' alt="img not found" width='300px' height='200px'/>
                <Link to="/home">
                <button className={style.blue} onClick={clear}>Return</button>
                </Link>
            </div>
        )
    } else if (currentPokemons.length) {
        return (
            <div className={style.body}>
                <img src={logo} alt="img not found" width='200px' height='100px'/>
                <div>
                    <div className={style.row}>
                        <div>
                            <h4 className={style.blue}>Sorts</h4>
                            <select className={style.blue} onChange={(event) => handleSort(event)}>
                            <option value="alphabeticalSort" defaultValue hidden>Alphabetical sort</option>        
                            <option value = 'a-z'>A-Z</option>
                            <option value = 'z-a'>Z-A</option>
                            </select>
                            <select className={style.blue} onChange={(event) => handleAttackSort(event)}>
                            <option value="attackSort" defaultValue hidden>Attack sort</option>
                            <option value = 'ascAttack'>Asc attack</option>
                            <option value = 'descAttack'>Desc attack</option>
                            </select>
                        </div>
                        <div>
                            <h4 className={style.blue}>Filters</h4>
                            <select  className={style.blue} onChange={(event) => handleFilterCreated(event)}>
                            <option value = 'allPokemons' defaultValue hidden>All Pokemons</option>
                            <option value = 'createdPokemons'>Created Pokemons</option>
                            <option value = 'existentPokemonsInAPI'>Existent Pokemons in API</option>
                            </select>
                            <select className={style.blue} onChange={(event) => handleFilterByType(event)}>
                            <option value="all">All types</option>
                            {allTypes.map(type => (
                                <option key={type.id} value={type.name}>
                                {type.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div>
                            <h4 className={style.blue}>Search</h4>
                            <SearchBar />
                        </div>
                        <div>
                            <h4 className={style.blue}>Reload</h4>
                            <button className={style.blue} onClick={refreshPage}>
                            Reload all Pokemons
                            </button>
                        </div>
                        <div>
                            <h4 className={style.blue}>Create</h4>
                            <Link to="/create">
                            <button className={style.blue}>Create Pokemon</button>
                            </Link>
                        </div>
                    </div>

                    <div className={style.buttons}>
                        <button className={style.blue} onClick={prevPage} disabled={currentPage === 1}> Prev </button>
                        <p className={style.currentPage}>
                            {currentPage}
                        </p>
                        <button className={style.blue} onClick={nextPage} disabled={currentPage === totalPages}>Next </button>
                    </div>

                    <div className={style.card}>
                        <ul className={style.grid}>
                            {
                                
                                    currentPokemons.map( el => {
                                        return (
                                            <div className={style.card} key={addKey()}>
                                                <PokemonCard name={el.name} attack={el.attack} image={el.image} id={el.id} types={el.types}/>
                                            </div>
                                        );
                                    })
                                
                                
                            }
                        </ul>
                    </div>
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.bodyReloading}>
                <img src={logo} alt="img not found" width='200px' height='100px'/>
            <div className={style.reloading}>
                <img src={loading} alt="img not found"/>
            </div>
            </div>
        )
    }                   
}