
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux.store';
import { updateInventoryElements, eatenFruitElement } from './redux.slice.inventory';
import { addInventoryRow } from './redux.slice.inventoryRows';
import { TypeInventoryElement } from '@mt/TypeInventoryElement';

type TypeUseInventory = [
    TypeInventoryElement[],
    (newInventory: TypeInventoryElement[]) => void,
    (colRow: [number, number]) => void
];

export const useInventory = () : TypeUseInventory => {
    const inventory = useSelector((state: RootState) => state.inventory);
    const dispatch = useDispatch<AppDispatch>();

    const updateInventory = (newInventory: TypeInventoryElement[]) => {
        dispatch(updateInventoryElements(newInventory));
    };

    const eatenFruit = (colRow: [number, number]) => {
        dispatch(eatenFruitElement(colRow));
    };

    return [ inventory,  updateInventory, eatenFruit ];
};

export const useInventoryRow = () : [number, () => void] => {
    const inventoryRow = useSelector((state: RootState) => state.inventoryRow);
    const dispatch = useDispatch<AppDispatch>();

    const addRow = () => {
        dispatch(addInventoryRow());
    };

    return [ inventoryRow,  addRow ];
};

