
import { useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from './redux.store';
import { renamePokemon, tickMakingMoney, getRidOfPokemon, feedPokemon } from './redux.slice.poke';
import { earnAccountMoney } from './redux.slice.account'
import { TypePokemon } from '@mt/TypePokemon';

type TypeUsePokemons = {
    pokemons: TypePokemon[];
    feedPokemon: (id:number, weight:number) => void;
    renamePokemon: (id:number, newname:string) => void;
    getRidOfPokemon: (id:number) => void;
    tickMakingMoney: () => void;
}

export const usePokemons = () : TypeUsePokemons => {
    const pokemons = useSelector((state: RootState) => state.pokemons);
    const dispatch = useDispatch<AppDispatch>();

    const feedPokemonHook = (id:number, weight:number) => {
        dispatch(feedPokemon([id, weight]));
    };

    const renamePokemonHook = (id:number, newname:string) => {
        dispatch(renamePokemon([id, newname]));
    };

    const getRidOfPokemonHook = (id:number) => {
        dispatch(getRidOfPokemon(id));
    };

    const tickMakingMoneyHook = () => {
        let sumTick = 0;
        store.getState().pokemons.map(elem => sumTick += elem.moneySec * elem.weight / 10000)
        dispatch(tickMakingMoney());
        dispatch(earnAccountMoney(sumTick));
    }

    return { 
        pokemons,
        feedPokemon:feedPokemonHook,
        renamePokemon:renamePokemonHook,
        getRidOfPokemon:getRidOfPokemonHook,
        tickMakingMoney:tickMakingMoneyHook,
    };
};
