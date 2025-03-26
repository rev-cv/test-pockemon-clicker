
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux.store';
import { updateBed, pickFruit, increaseBed, tickGrowFuit, addAccelerator } from './redux.slice.garden';

import { TypeGarden, TypeGardenElement } from '@mt/TypeGardenElement';

import { useAccount } from '@utils/redux.hook.account';

type TypeUseGarden = {
    garden: TypeGarden;
    increaseBed: (money: number) => void;
    tickGrowFuit: () => void;
    pickFruit: (colRow: [number, number]) => void;
    updateBed: (bed: TypeGardenElement[]) => void;
    addAccelerator: (accelerator: [number, number], money: number) => void;
}

export const useGarden= () : TypeUseGarden => {
    const garden = useSelector((state: RootState) => state.garden);
    const dispatch = useDispatch<AppDispatch>();

    const [, payMoney] = useAccount();

    const pickFruitHook = (colRow: [number, number]) => {
        dispatch(pickFruit(colRow));
    };

    const increaseBedHook = (money: number) => {
        if (garden.area < garden.maxArea){
            dispatch(increaseBed());
            payMoney(money);
        }
    };

    const tickGrowFuitHook = () => {
        dispatch(tickGrowFuit());
    };

    const updateBedHook = (bed: TypeGardenElement[]) => {
        dispatch(updateBed(bed));
    };

    const addAcceleratorHook = (accelerator: [number, number], money: number) => {
        dispatch(addAccelerator(accelerator));
        payMoney(money);
    }

    return { 
        garden:garden,  
        increaseBed:increaseBedHook, 
        pickFruit: pickFruitHook,
        tickGrowFuit:tickGrowFuitHook,
        updateBed: updateBedHook,
        addAccelerator: addAcceleratorHook
    };
};
