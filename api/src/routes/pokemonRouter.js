const axios = require ('axios');
const { Router } = require('express');
const { getAllPokemons, getPokemonId, createPokemon } = require('../controllers/index.js');
const { Pokemon, Type } = require('../db.js');

const pokemonRouter = Router();

pokemonRouter.get('/', async (req, res) => {
    const name = req.query.name;
    let allPokemons = await getAllPokemons();
    if (name) {
        let pokemonFound = await allPokemons.find(poke => poke.name === name.toLowerCase());
        if (pokemonFound) res.status(200).json(pokemonFound)
        else {
            try {
                pokemonFound = await axios.get (`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (pokemonFound) {
                    pokeToReturn = {
                        name: pokemonFound.data.name,
                        id: Number(pokemonFound.data.id),
                        hp: pokemonFound.data.stats[0].base_stat,
                        attack: pokemonFound.data.stats[1].base_stat,
                        defense: pokemonFound.data.stats[2].base_stat,
                        speed: pokemonFound.data.stats[5].base_stat,
                        height: pokemonFound.data.height,
                        weight: pokemonFound.data.weight,
                        image: pokemonFound.data.sprites.other.dream_world.front_default,
                        types: pokemonFound.data.types.map((type) => {
                            return { name: type.type.name };
                        }),
                    }
                    res.status(200).json(pokeToReturn)
                }
                else res.status(404).send('Pokemon not found');
            } catch (error) {
                res.status(404).send('Pokemon not found');
            }
        }
    } else {
        return res.status(200).json(allPokemons);
    }
});

pokemonRouter.get('/:id', async (req, res) => {
    let pokemonId = await getPokemonId(req.params.id);
    if(pokemonId) res.status(200).json(pokemonId);
        else res.status(404).send('Pokemon not found');
})

pokemonRouter.post('/', async (req, res) => {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
    try {
        const newPokemonSuccessMsg = await createPokemon(name, hp, attack, defense, speed, height, weight, image, types);
        res.status(201).send(newPokemonSuccessMsg);
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
})



module.exports = pokemonRouter;