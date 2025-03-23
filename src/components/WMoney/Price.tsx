
import './style.scss';
import {formatNumber} from '@utils/formatNumber';

type TypePrice = {
    price: number;
}

const Price = ({price}:TypePrice) => {
    return <div className="price">
        <picture className='price__ico' >
            <img src="/money.png" alt="title" />
        </picture>
        <div className="price__account">{formatNumber(price)}</div>
    </div>
}

export default Price;