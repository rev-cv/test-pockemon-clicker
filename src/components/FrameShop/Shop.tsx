import './style.scss';
import { useState } from "react";
import { formatNumber } from '@utils/formatNumber';

const Shop = () => {

    const [purchases, updatePurchases] = useState([
        {title: "Ягода 1 уровня", descr: "Накорми ей покемона для увеличения веса на 0.1 кг", price: 1000, img: "/fruit1.png"},
        {title: "Покеболл 1 уровня", descr: "Во время охоты ловит покемона с шансом 7%", price: 5000, img: "/fruit2.png"},
        {title: "Покеболл 2 уровня", descr: "Во время охоты ловит покемона с шансом 15%кг", price: 10000, img: "/fruit3.png"},
    ]);

    return <div className="app-shop">
        <div className="app-shop__title">Shop</div>

        {
            purchases.map((elem, index) => (
                <div className="app-shop__card" key={`app-shop-card-${index}`}>
                    <div className="app-shop__card-title">{elem.title}</div>
                    <div className="app-shop__card-descr">{elem.descr}</div>
                    <picture className="app-shop__card-img" title={elem.title}>
                        <img src={elem.img} alt={elem.title} />
                    </picture>
                    <button className="app-shop__card-btn">{`Купить за ${formatNumber(elem.price)}`}</button>
                </div>
            ))
        }
    
    </div>
}

export default Shop;