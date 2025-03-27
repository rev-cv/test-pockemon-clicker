import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './redux.slice.account';
import inventorySlice from './redux.slice.inventory';
import gardenSlice from './redux.slice.garden';
import pokeSlice from './redux.slice.poke';
import goodsSlice from './redux.slice.shop';

export const store = configureStore({
    reducer: {
        account:   accountSlice,
        inventory: inventorySlice,
        garden:    gardenSlice,
        pokemons:  pokeSlice,
        goods:     goodsSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;