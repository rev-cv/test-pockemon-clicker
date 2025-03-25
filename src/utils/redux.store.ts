import { configureStore } from '@reduxjs/toolkit';
import accountSlice from './redux.slice.account';
import inventorySlice from './redux.slice.inventory';
import inventoryRowSlice from './redux.slice.inventoryRows';

export const store = configureStore({
    reducer: {
        account: accountSlice,
        inventory: inventorySlice,
        inventoryRow: inventoryRowSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;