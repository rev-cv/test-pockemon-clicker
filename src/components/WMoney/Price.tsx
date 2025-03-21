
import './style.scss';
type TypePrice = {
    price: number;
}

const Price = ({price}:TypePrice) => {

    const formatNumber = (num:number) => {
        const numStr = num.toString();
        if (numStr.length <= 4) {
            return numStr;
        } else {
            return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        }
    }

    return <div className="price">
        <picture className='price__ico' >
            <img src="/money.png" alt="title" />
        </picture>
        <div className="price__account">{formatNumber(price)}</div>
    </div>
}

export default Price;