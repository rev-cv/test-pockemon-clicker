import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TypeInventory, TypeInventoryElement} from '@mt/TypeInventoryElement';

const inventoryMok = {
    elements: [
        {column: 4, row:2, height:2, width:2, img: "/fruit1.png", name: "Ягода 2 уровня", weight: 200, isEdible: true },
        {column: 1, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", weight: 100, isEdible: true },
        {column: 2, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", weight: 100, isEdible: true },
        {column: 1, row:1, height:1, width:1, img: "/fruit2.png", name: "Покеболл 1 уровня"},
        {column: 3, row:2, height:1, width:1, img: "/fruit3.png", name: "Покеболл 2 уровня"},
    ],
    matrix: {
        width: 5,
        height: 3
    },
    maxRows: 11,
    droping: undefined,
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: inventoryMok as TypeInventory,
    reducers: {
        addInventoryElement: (state, action: PayloadAction<TypeInventoryElement>) => {
            // добавить в инвентарь новый элемент
            state.elements.push(action.payload);
        },
        updateInventoryElements: (state, action: PayloadAction<TypeInventoryElement[]>) => {
            // обновить состояние всего инвентаря
            state.elements.splice(0, state.elements.length, ...action.payload);
        },
        eatenFruitElement: (state, action: PayloadAction<[number, number]>) => {
            // съесть элемент из инвентаря
            state.elements = state.elements.filter(item => !(item.column === action.payload[0] && item.row === action.payload[1]));
        },
        addInventoryRow: (state) => {
            // добавить в матрицу инвентаря новый ряд
            state.matrix.height++
        },
        removeInventoryRow: (state) => {
            // удалить из матрицы инвентаря последний ряд
            state.matrix.height--
        },
    }
});

export const { 
    addInventoryElement,
    updateInventoryElements,
    eatenFruitElement,
    addInventoryRow,
    removeInventoryRow
} = inventorySlice.actions;
export default inventorySlice.reducer; 