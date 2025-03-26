import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './redux.slice.account';
import inventorySlice from './redux.slice.inventory';
import inventoryRowSlice from './redux.slice.inventoryRows';
import gardenSlice from './redux.slice.garden';



export const store = configureStore({
    reducer: {
        account: accountSlice,
        inventory: inventorySlice,
        inventoryRow: inventoryRowSlice,
        garden: gardenSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;