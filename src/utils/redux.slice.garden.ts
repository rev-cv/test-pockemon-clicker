import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {TypeGarden, TypeGardenElement, TypeAccelerator } from '@mt/TypeGardenElement';

const gardenMok = {
    area: 5,
    maxArea: 7,
    speed: 15,
    accelerators: [
        [2, 120],
        [5, 120],
    ],
    bed: [
        {column: 1, row:1, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 2, weight: 100, complete: 100},
		{column: 4, row:2, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 2, weight: 100, complete: 25},
		{column: 3, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 2, weight: 100, complete: 40},
		{column: 2, row:5, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 2, weight: 100, complete: 87},
		{column: 4, row:4, height:2, width:2, img: "/fruit1.png", name: "Ягода 2 уровня", speedGrow: 1, weight: 200, complete: 100},
    ]
}

const gardenSlice = createSlice({
    name: 'garden',
    initialState: gardenMok as TypeGarden,
    reducers: {

        updateBed: (state, action: PayloadAction<TypeGardenElement[]>) => {
            // обновить состояние всех элементов на грядке
            state.bed.splice(0, state.bed.length, ...action.payload);
        },

        pickFruit: (state, action: PayloadAction<[number, number]>) => {
            // сорвать с грядки фрукт
            state.bed = state.bed.filter(item => !(item.column === action.payload[0] && item.row === action.payload[1]));
        },

        increaseBed: (state) => {
            // увеличить площадь грядки на 1
            state.area = state.area + 1 <= state.maxArea ? state.area + 1 : state.maxArea;
        },

        addAccelerator: (state, action: PayloadAction<[number, number]>) => {
            state.accelerators.push(action.payload)
        },

        tickGrowFuit: (state) => {

            let newAcc: TypeAccelerator[] = [];

            let speed = state.speed; // на сколько минут вырастит за час?

            state.accelerators.forEach(acc => {
                if (0 <= acc[1] - 1) {
                    // увеличивается процент скорости роста за тик за счет ускорителей
                    speed += speed * acc[0] / 100;
                    newAcc.push([acc[0], acc[1] - 1])
                }
            })

            // пересчет ускорения скорости роста в час в скорость роста в минутах (tick) в секундах
            const speedTick = speed / 60 / 60;

            state.bed = state.bed.map(elem => {
                if (100 <= elem.complete) {
                    return elem
                }

                elem.complete += elem.speedGrow * speedTick;

                if (elem.complete > 100) {
                    elem.complete = 100;
                }
                
                return elem;
            })
            
            state.accelerators = newAcc;
        },

        
    }
});

export const { 
    updateBed,
    pickFruit,
    increaseBed,
    tickGrowFuit,
    addAccelerator,
} = gardenSlice.actions;
export default gardenSlice.reducer; 