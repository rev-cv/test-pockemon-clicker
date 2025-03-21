
import './style.scss';

const CurrentMoney = () => {
    return <div className="current-money">
        <picture className='current-money__ico' >
            <img src="/money.png" alt="title" />
        </picture>
        <div className="current-money__account">100 000 000</div>
    </div>
}

export default CurrentMoney;