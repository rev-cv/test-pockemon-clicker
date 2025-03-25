import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TypeInventoryElement} from '@mt/TypeInventoryElement';

const inventoryElements = [
    {column: 4, row:2, height:2, width:2, img: "/fruit1.png", name: "Ягода 2 уровня", weight: 200, isEdible: true },
    {column: 1, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", weight: 100, isEdible: true },
    {column: 2, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", weight: 100, isEdible: true },
    {column: 1, row:1, height:1, width:1, img: "/fruit2.png", name: "Покеболл 1 уровня"},
    {column: 3, row:2, height:1, width:1, img: "/fruit3.png", name: "Покеболл 2 уровня"},
]

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: inventoryElements as TypeInventoryElement[],
    reducers: {
        addInventoryElement: (state, action: PayloadAction<TypeInventoryElement>) => {
            state.push(action.payload);
        },
        updateInventoryElements: (state, action: PayloadAction<TypeInventoryElement[]>) => {
            state.splice(0, state.length, ...action.payload);
        },
        eatenFruitElement: (state, action: PayloadAction<[number, number]>) => {
            return state.filter(item => !(item.column === action.payload[0] && item.row === action.payload[1]));
        }
    }
});

export const { 
    addInventoryElement,
    updateInventoryElements,
    eatenFruitElement,
} = inventorySlice.actions;
export default inventorySlice.reducer; 