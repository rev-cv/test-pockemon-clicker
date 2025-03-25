import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TypeInventoryElement} from '@mt/TypeInventoryElement';

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: [] as TypeInventoryElement[],
    reducers: {
        addInventoryElement: (state, action: PayloadAction<TypeInventoryElement>) => {
            state.push(action.payload);
        },
        updateInventoryElements: (state, action: PayloadAction<TypeInventoryElement[]>) => {
            state.splice(0, state.length, ...action.payload);
        }
    }
});

export const { 
    addInventoryElement,
    updateInventoryElements,
} = inventorySlice.actions;
export default inventorySlice.reducer; 