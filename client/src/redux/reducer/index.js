import {
    GET_POKEMONS,
    GET_TYPES,
    GET_NAME_POKEMONS,
    CREATE_POKEMON,
    FILTER_CREATED,
    FILTER_TYPES,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    CLEAR_STATE,
    GET_DETAILS,
    CLEAR_DETAIL,
    CLEAR_SPECIAL,
} from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    wasPokemonCreated: false,
    types: [],
    detail: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case GET_NAME_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case CREATE_POKEMON:
            return {
                ...state,
                wasPokemonCreated: action.payload
            }
        case FILTER_TYPES:
            //const allPokemons = state.allPokemons;
            const typesFilter = action.payload === "all" ? state.allPokemons : state.pokemons.filter(el => el.types?.map(object => object.name).includes(action.payload))
            if (typesFilter.length) {
                return {
                    ...state,
                    pokemons: typesFilter
                }
            } else {
                return {
                    ...state,
                    pokemons: false,
                }
            }
        case FILTER_CREATED:
            const createdFilter = action.payload === 'createdPokemons' ? state.pokemons.filter(el => el.createdInDb) : state.pokemons.filter(el => !el.createdInDb)
            if (createdFilter.length) {
                return {
                    ...state,
                    pokemons: action.payload === 'allPokemons' ? state.allPokemons : createdFilter
                }
            } else {
                return {
                    ...state,
                    pokemons: false,
                }
            }
        case ORDER_BY_NAME:
            let sortName = action.payload === 'a-z' ? 
            state.pokemons.sort(function (a, b){
                if (a.name > b.name){return 1};
                if (b.name > a.name){return -1};
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
                if (a.name > b.name){return -1};
                if (b.name > a.name){return 1};
                return 0;
            })
            return {
                ...state,
                pokemons: sortName
            }
        case ORDER_BY_ATTACK:
            let sortAttack = action.payload === 'ascAttack' ? 
            state.pokemons.sort(function (a, b){
                if (a.attack > b.attack){return 1};
                if (b.attack > a.attack){return -1};
                return 0;
            }) :
            state.pokemons.sort(function(a, b){
                if (a.attack > b.attack){return -1};
                if (b.attack > a.attack){return 1};
                return 0;
            })
            return {
                ...state,
                pokemons: sortAttack
            }
        case CLEAR_STATE:
            return {
                ...state,
                pokemons: state.allPokemons,
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                detail: []
            }
        case CLEAR_SPECIAL:
            return {                    
                ...state,
                pokemons: [],           
            }
        default:
            return state;
    }
}

export default rootReducer;