import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypePokemon } from '@mt/TypePokemon';

const PokemonMok = [
    {
        "id": 1,
        "name": "",
        "species": "clefairy",
        "weight": 5500,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 60400,
        "avatar": "/pokemon.png"
    },

    {
        "id": 2,
        "name": "",
        "species": "clefairy",
        "weight": 9000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 *.5,
        "avatar": "/pokemon.png"
    },

    {
        "id": 3,
        "name": "",
        "species": "clefairy",
        "weight": 4200,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * .4,
        "avatar": "/pokemon.png"
    },

    {
        "id": 4,
        "name": "",
        "species": "clefairy",
        "weight": 11000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 1.2,
        "avatar": "/pokemon.png"
    },

    {
        "id": 5,
        "name": "",
        "species": "clefairy",
        "weight": 1000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 1.8,
        "avatar": "/pokemon.png"
    },

    {
        "id": 6,
        "name": "",
        "species": "clefairy",
        "weight": 12000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 5,
        "avatar": "/pokemon.png"
    },

    {
        "id": 7,
        "name": "",
        "species": "clefairy",
        "weight": 12000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400 * 3,
        "avatar": "/pokemon.png"
    },

    {
        "id": 8,
        "name": "",
        "species": "clefairy",
        "weight": 11000,
        "totalEarned": 0,
        "moneySec": 1.1,
        "age": 86400,
        "avatar": "/pokemon.png"
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
            // покормить покемона / увеличить вес
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