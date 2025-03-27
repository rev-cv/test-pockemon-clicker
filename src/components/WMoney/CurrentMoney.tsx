
import './style.scss';
import { useAccount } from '@utils/redux.hook.account';
import { formatNumber } from '@utils/formatNumber'

const CurrentMoney = () => {
    const {account} = useAccount();

    return <div className="current-money">
        <picture className='current-money__ico' >
            <img src="/money.png" alt="title" />
        </picture>
        <div className="current-money__account">{formatNumber(Math.round(account))}</div>
    </div>
}

export default CurrentMoney;