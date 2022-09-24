const axios = require ('axios');
const { Pokemon, Type } = require('../db.js');

const getPokemonFromApi = async () => {

    const one_Twenty = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const twentyOne_Forty = await axios.get(one_Twenty.data.next);
    const reqApi = one_Twenty.data.results.concat(twentyOne_Forty.data.results);

    const apiPokemons = await Promise.all(
        reqApi.map(async pokemon => {
            let subReqApi = await axios.get(pokemon.url);
            return {
                name: subReqApi.data.name,
                id: Number(subReqApi.data.id),
                hp: subReqApi.data.stats[0].base_stat,
                attack: subReqApi.data.stats[1].base_stat,
                defense: subReqApi.data.stats[2].base_stat,
                speed: subReqApi.data.stats[5].base_stat,
                height: subReqApi.data.height,
                weight: subReqApi.data.weight,
                image: subReqApi.data.sprites.other.dream_world.front_default,
                types: subReqApi.data.types.map((type) => {
                    return { name: type.type.name };
                }),
            }
        })
    )
    return apiPokemons;
}

const getPokemonFromDb = async () => {
    const dbPokemons = await Pokemon.findAll({
        include: {
            model: Type,
            through: { attributes: [] },
            attributes: ["name"],
        },
        
    })
    const mappedDBPokemons = dbPokemons.map(poke => poke.toJSON());
    return mappedDBPokemons;
}

const getAllPokemons = async () => {
    let apiPokemons = await getPokemonFromApi();
    let dbPokemons = await getPokemonFromDb();
    let allPokemons = apiPokemons.concat(dbPokemons);
    return allPokemons;
}

const getPokemonId = async (idParam) => {

    if (isNaN(idParam)) {
        try {
            const findDBPokemon = await Pokemon.findByPk(idParam, {
                include: {
                  model: Type,
                  attributes: ["name"],
                  through: {
                    attributes: [],
                  },
                },
            });
            return findDBPokemon;
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const getPokeById = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${idParam}`
            );
            
            return ({
                id: getPokeById.data.id,
                name: getPokeById.data.name,
                hp: getPokeById.data.stats[0].base_stat,
                attack: getPokeById.data.stats[1].base_stat,
                defense: getPokeById.data.stats[2].base_stat,
                speed: getPokeById.data.stats[5].base_stat,
                height: getPokeById.data.height,
                weight: getPokeById.data.weight,
                image: getPokeById.data.sprites.other.dream_world.front_default,
                types: getPokeById.data.types.map((type) => {
                    return { name: type.type.name };
                })
            })
        } catch (error) {
            return(error.response.data)
        }
    }
}

const getTypes = async () => {
    const typesApi = (await axios.get('https://pokeapi.co/api/v2/type')).data.results;
    const typesArray = typesApi.map(types => types.name);

    typesArray.forEach(type => {
        Type.findOrCreate({
            where: { name: type },
        })
    })

    const allTypes = await Type.findAll();
    return(allTypes);
}

const createPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {

    if(!name) throw new Error ('Name is a mandatory field');
    if(name.length < 2 || name.length > 15) throw new Error('Name must be between 2 and 15 characters');
    name = name.toLowerCase();
    if(!/^[a-zA-Z\s]*$/.test(name)) throw new Error ('Only letters allowed');

    hp = hp ? parseInt(hp) : 0;
    attack = attack ? parseInt(attack) : 0;
    defense = defense ? parseInt(defense) : 0;
    speed = speed ? parseInt(speed) : 0;
    height = height ? parseInt(height) : 0;
    weight = weight ? parseInt(weight) : 0;    

    if (hp < 0 || hp > 255) throw new Error ('HP must be between 0 and 255');
    if (attack < 0 || attack > 255) throw new Error ('Attack must be between 0 and 255');
    if (defense < 0 || defense > 255) throw new Error ('Defense must be between 0 and 255');
    if (speed < 0 || speed > 255) throw new Error ('Speed must be between 0 and 255');
    if (height < 0 || height > 1000) throw new Error ('Height must be between 0 and 1000');
    if (weight < 0 || weight > 1000) throw new Error ('Weight must be between 0 and 1000');

    if (!image) image = 'https://svgsilh.com/svg_v2/659509.svg';
    if (!(/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi).test(image)) throw new Error ('It must be an URL');

    if (types.length === 0) types.push('unknown');

    try {
        let pokemonCreated = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
        })

        let typeDb = await Type.findAll({
            where: { name: types }
        })
    
        pokemonCreated.addType(typeDb);
        
        return `Pokemon ${pokemonCreated.name} created successfully`;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllPokemons,
    getPokemonId,
    getTypes,
    createPokemon
};