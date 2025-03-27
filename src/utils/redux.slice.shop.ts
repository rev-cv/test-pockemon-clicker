import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeShopElement } from '@mt/TypeShopElement';

const ShopMok = [
    {
        title: "Ягода 1 уровня", 
        descr: "Накорми ей покемона для увеличения веса на 0.1 кг", 
        price: 1000, 
        img: "/fruit1.png", 
        type: "fruit", 
        weight: 100,
        height: 1,
        width: 1,
    },
    {
        title: "Ягода 2 уровня", 
        descr: "Накорми ей покемона для увеличения веса на 0.2 кг", 
        price: 2000, 
        img: "/fruit1.png", 
        type: "fruit", 
        weight: 200,
        height: 2,
        width: 2,
    },
    {
        title: "Покеболл 1 уровня", 
        descr: "Во время охоты ловит покемона с шансом 7%", 
        price: 5000, 
        img: "/fruit2.png", 
        type: "ball"
    },
    {
        title: "Покеболл 2 уровня", 
        descr: "Во время охоты ловит покемона с шансом 15%кг", 
        price: 10000, 
        img: "/fruit3.png", 
        type: "ball"
    },
]

const shopSlice = createSlice({
    name: 'pokemons',
    initialState: ShopMok as TypeShopElement[],
    reducers: { }
});

export default shopSlice.reducer; 