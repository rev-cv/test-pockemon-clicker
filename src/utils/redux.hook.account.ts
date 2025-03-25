
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux.store';
import { payAccountMoney, earnAccountMoney } from './redux.slice.account';

type TypeuseAccount = [
    number,
    (money: number) => void,
    (money: number) => void
]

export const useAccount = () : TypeuseAccount => {
    const account = useSelector((state: RootState) => state.account);
    const dispatch = useDispatch<AppDispatch>();

    const payMoney = (money:number) => {
        dispatch(payAccountMoney(money));
    };

    const earnMoney = (money:number) => {
        dispatch(earnAccountMoney(money));
    };

    return [ account,  payMoney, earnMoney ];
};

