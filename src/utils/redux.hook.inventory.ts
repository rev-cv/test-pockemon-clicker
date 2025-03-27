
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux.store';
import { updateInventoryElements, eatenFruitElement, addInventoryRow } from './redux.slice.inventory';
import { TypeInventory, TypeInventoryElement } from '@mt/TypeInventoryElement';
import { useAccount } from '@utils/redux.hook.account';

type TypeUseInventory = {
    inventory: TypeInventory;
    updateInventory: (newInventory: TypeInventoryElement[]) => void;
    eatenFruit: (colRow: [number, number]) => void;
    addRow: (money: number) => void;
}

export const useInventory = () : TypeUseInventory => {
    const inventory = useSelector((state: RootState) => state.inventory);
    const dispatch = useDispatch<AppDispatch>();
    const {payMoney} = useAccount();

    const updateInventory = (newInventory: TypeInventoryElement[]) => {
        dispatch(updateInventoryElements(newInventory));
    };

    const eatenFruit = (colRow: [number, number]) => {
        dispatch(eatenFruitElement(colRow));
    };

    const addRow = (money: number) => {
        dispatch(addInventoryRow());
        payMoney(money);
    };

    return {inventory, updateInventory, eatenFruit, addRow };
};
