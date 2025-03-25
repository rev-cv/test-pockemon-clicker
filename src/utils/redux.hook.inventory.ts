
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux.store';
import { updateInventoryElements } from './redux.slice.inventory';
import { TypeInventoryElement } from '@mt/TypeInventoryElement';

export const useInventory = () : [TypeInventoryElement[], (newInventory: TypeInventoryElement[]) => void] => {
    const inventory = useSelector((state: RootState) => state.inventory);
    const dispatch = useDispatch<AppDispatch>();

    const updateInventory = (newInventory: TypeInventoryElement[]) => {
        dispatch(updateInventoryElements(newInventory));
    };

    return [ 
        inventory,  updateInventory
    ];
};

