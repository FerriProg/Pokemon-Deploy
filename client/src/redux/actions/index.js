import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_NAME_POKEMONS = "GET_NAME_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FILTER_TYPES = "FILTER_TYPES";
export const CLEAR_STATE = "CLEAR_STATE";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_SPECIAL = "CLEAR_SPECIAL";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      var type = await axios.get("/types");
      return dispatch({
        type: GET_TYPES,
        payload: type.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons/" + id);
      return dispatch({
        type: GET_DETAILS,
        payload: [json.data],
      });
    } catch (error) {
      return dispatch({
        type: GET_DETAILS,
        payload: ["Not Found"],
      });
    }
  };
}

export function searchNamePokemon(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons?name=" + name);
      return dispatch({
        type: GET_NAME_POKEMONS,
        payload: [json.data],
      });
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  };
}

export function postPokemon(pokeToCreate) {
  return async function (dispatch) {
    try {
      let response = await axios.post("/pokemons", pokeToCreate);
      dispatch({
        type: CREATE_POKEMON,
        payload: true,
      });
      alert("Pokemon created successfully");
      return response.status;
    } catch (error) {
      dispatch({
        type: CREATE_POKEMON,
        payload: false,
      });
      alert(error.response.data);
      return false;
    }
  };
}

export function filterTypes(payload) {
  return {
    type: FILTER_TYPES,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function sortByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function clearSpecial() {
  return {
    type: CLEAR_SPECIAL,
  };
}
