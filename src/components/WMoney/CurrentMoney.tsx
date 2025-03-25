
import './style.scss';
import { useAccount } from '@utils/redux.hook.account';
import { formatNumber } from '@utils/formatNumber'

const CurrentMoney = () => {
    const [money] = useAccount();

    return <div className="current-money">
        <picture className='current-money__ico' >
            <img src="/money.png" alt="title" />
        </picture>
        <div className="current-money__account">{formatNumber(money)}</div>
    </div>
}

export default CurrentMoney;