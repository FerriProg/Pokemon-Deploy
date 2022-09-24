import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../redux/actions";
import { validate } from "./PokemonCreateValidations";
import style from "../styles/PokemonCreate.module.css";
import logo from '../images/logo.svg';


export default function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector(state => state.types);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: [],
    })

    function handleChange (event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        setErrors(
            validate({
              ...input,
              [event.target.name]: event.target.value,
            }, false, false)
          );
    }

    function handleSelect (event) {
        if (!input.types.includes(event.target.value) && input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, event.target.value]
            });
            setErrors(
                validate({
                ...input,
                types: [...input.types, event.target.value],
                }, false, false)
            );
        } else if (input.types.length < 2) {                    //repeated type
            setErrors(
                validate({
                ...input,
                types: [...input.types, event.target.value],
                }, true, false)
            );
        } else {                                                //max types exceeded
            setErrors(
                validate({
                ...input,
                types: [...input.types, event.target.value],
                }, false, true)
            );
        }
    }

    function handleDelete (event) {
        setInput({
            ...input,
            types: input.types.filter(e => e !== event)
        })
        setErrors(
            validate({
              ...input,
              types: input.types.filter(e => e !== event),
            }, false, false)
        );
    }

    function handleSubmit (event) {
        event.preventDefault();
        if (!input.name) return alert('Required fields are missing')
        input.name = input.name.trim();
        if (input.name.length < 2 || input.name.length > 15) return alert('Delete blank spaces, name must be between 2 and 15 characters')
        if (errors.name ||
            errors.hp ||
            errors.attack ||
            errors.defense ||
            errors.speed ||
            errors.height ||
            errors.weight ||
            errors.image) return alert('Correct errors')

        dispatch(postPokemon(input));

        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            image: '',
            types: [],
        });
        history.push("/home");
    }

    let key = 0;
    function addKey () {
        return key++;
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    return (
        <div className={style.createBackground}>
            <div>
                <div>
                    <img src={logo} alt="img not found" width='200px' height='100px'/>
                </div>
                <div>
                    <Link to="/home">
                        <button className={style.blue}>Home</button>
                    </Link>
                </div>

                <form className={style.createCard} onSubmit={(event) => handleSubmit(event)}>
                    <div className={style.rowCreate}>
                        <div className={style.textAlign}>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Name*: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.name}
                                    name = 'name'
                                    id = 'name'
                                    placeholder = 'Enter the name...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.name && 
                                    <p className={style.errors}>{errors.name}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>HP: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.hp}
                                    name = 'hp'
                                    id = 'hp'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.hp && 
                                    <p className={style.errors}>{errors.hp}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Attack: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.attack}
                                    name = 'attack'
                                    id = 'attack'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.attack && 
                                    <p className={style.errors}>{errors.attack}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Defense: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.defense}
                                    name = 'defense'
                                    id = 'defense'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.defense && 
                                    <p className={style.errors}>{errors.defense}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Speed: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.speed}
                                    name = 'speed'
                                    id = 'speed'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.speed && 
                                    <p className={style.errors}>{errors.speed}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Height: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.height}
                                    name = 'height'
                                    id = 'height'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.height && 
                                    <p className={style.errors}>{errors.height}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Weight: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.weight}
                                    name = 'weight'
                                    id = 'weight'
                                    placeholder = '0...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.weight && 
                                    <p className={style.errors}>{errors.weight}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Image: </label>
                                    <input
                                    className={style.blue}
                                    type = 'text'
                                    size = '40'
                                    value = {input.image}
                                    name = 'image'
                                    id = 'image'
                                    placeholder = 'Enter the image...'
                                    onChange={(event) => handleChange(event)}
                                    />
                                </div>
                                {errors.image && 
                                    <p className={style.errors}>{errors.image}</p>
                                }
                            </div>
                            <div>
                                <div className={style.pushApart}>
                                    <label className={style.blue}>Types: </label>
                                    <select className={style.selectCss} onChange={(event) => handleSelect(event)}>
                                        <option className={style.blue} value='Select' defaultValue hidden>Select</option>
                                        {types.map((type) => (
                                        <option  className={style.blue} value={type.name} key={addKey()}>
                                        {type.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={style.rowTypes}>
                                    {input.types.map(el => 
                                        <div className={style.row} key={addKey()}>
                                            <p>{el}</p>
                                            <button
                                            className={style.close}
                                            key={el.id}
                                            type="button"
                                            onClick={() => handleDelete(el)}
                                            >
                                            X
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {errors.types && 
                                <div className={style.errors}>{errors.types}</div>
                                }
                            </div>
                        </div>
                        <div>
                            <button className={style.blue} type="submit">
                                Create new Pokemon
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}