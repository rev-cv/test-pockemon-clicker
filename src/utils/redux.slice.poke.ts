import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypePokemon } from '@mt/TypePokemon';

const PokemonMok = [
    {
        "id": 25,
        "name": "pikachu",
        "species": "pikachu",
        "weight": 5500,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 60400,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },

    {
        "id": 6,
        "name": "charizard",
        "species": "charizard",
        "weight": 9000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 *.5,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
    },

    {
        "id": 133,
        "name": "eevee",
        "species": "eevee",
        "weight": 4200,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * .4,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
    },

    {
        "id": 150,
        "name": "mewtwo",
        "species": "mewtwo",
        "weight": 11000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 1.2,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
    },

    {
        "id": 143,
        "name": "snorlax",
        "species": "snorlax",
        "weight": 1000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 1.8,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png"
    },

    {
        "id": 1,
        "name": "bulbasaur",
        "species": "bulbasaur",
        "weight": 12000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 5,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },

    {
        "id": 7,
        "name": "squirtle",
        "species": "squirtle",
        "weight": 12000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 3,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },

    {
        "id": 39,
        "name": "jigglypuff",
        "species": "jigglypuff",
        "weight": 11000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400,
        "avatar": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png"
    }
]

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState: PokemonMok as TypePokemon[],
    reducers: {
        updateAllPokemons: (state, action: PayloadAction<TypePokemon[]>) => {
            // обновить состояние всех покемонов
            state.splice(0, state.length, ...action.payload);
        },

        tickMakingMoney: (state) => {
            state.map(elem => {
                elem.totalEarned += elem.moneySec * elem.weight / 10000;
                elem.age++;
                return elem;
            })
        },

        feedPokemon: (state, action: PayloadAction<[number, number]>) => { // id, weight
            // покормить покемона / увеличить вес
            state.map(elem => {
                if (elem.id === action.payload[0]) {
                    elem.weight += action.payload[1]
                }
                return elem;
            })
        },

        renamePokemon: (state, action: PayloadAction<[number, string]>) => { // id, newName
            // удалить покемона
            state.map(elem => {
                if (elem.id === action.payload[0]) {
                    elem.name = action.payload[1];
                }
                return elem;
            })
        },

        getRidOfPokemon: (state, action: PayloadAction<number>) => {
            // удалить покемона
            return state.filter(item => !(item.id === action.payload));
        },

        setData: (_, action) => action.payload,
    }
});

export const { 
    updateAllPokemons,
    feedPokemon,
    renamePokemon,
    getRidOfPokemon,
    tickMakingMoney,
    setData
} = pokemonSlice.actions;
export default pokemonSlice.reducer; 