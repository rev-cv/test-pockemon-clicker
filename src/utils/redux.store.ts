import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './redux.slice.account';
import inventorySlice from './redux.slice.inventory';
import gardenSlice from './redux.slice.garden';
import pokeSlice from './redux.slice.poke';
import goodsSlice from './redux.slice.shop';
import { saveToIndexedDB } from './redux.middleware.indexed';
import { authApi } from './redux.api';

export const store = configureStore({
    reducer: {
        account:   accountSlice,
        inventory: inventorySlice,
        garden:    gardenSlice,
        pokemons:  pokeSlice,
        goods:     goodsSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(saveToIndexedDB)
        .concat(authApi.middleware)
    ,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;