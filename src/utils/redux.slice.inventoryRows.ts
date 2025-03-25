import { createSlice } from '@reduxjs/toolkit';

const inventoryRowSlice = createSlice({
    name: 'inventory',
    initialState: 3 as number,
    reducers: {
        addInventoryRow: (state) => ( state+ + 1 ),
        removeInventoryRow: (state) => ( state - 1 )
    }
});

export const { 
    addInventoryRow,
    removeInventoryRow,
} = inventoryRowSlice.actions;
export default inventoryRowSlice.reducer; 