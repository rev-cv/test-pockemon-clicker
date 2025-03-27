import './style.scss';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { formatNumber } from '@utils/formatNumber';
import { RootState } from '@utils/redux.store';
import { placeNewElementInInventory } from '@utils/inventory.calcPostition';
import { useInventory } from '@utils/redux.hook.inventory';
import SearchPanel from '@comps/WSearchPanel/SearchPanel';

const Shop = () => {

    const purchases = useSelector((state: RootState) => state.goods);
    const {updateInventory} = useInventory();
    
    const [indexShake, setShake] = useState<number | undefined>();

    return <div className="app-shop">
        <div className="app-shop__title">Shop</div>

        <SearchPanel />

        {
            purchases.map((elem, index) => (
                <div className={`app-shop__card${index === indexShake ? " animate-shake": ""}`} key={`app-shop-card-${index}`} >
                    <div className="app-shop__card-title">{elem.title}</div>
                    <div className="app-shop__card-descr">{elem.descr}</div>
                    <picture className="app-shop__card-img" title={elem.title}>
                        <img src={elem.img} alt={elem.title} />
                    </picture>
                    <button 
                        className="app-shop__card-btn"
                        onClick={() => {

                            const result = placeNewElementInInventory({
                                name: elem.title, 
                                img: elem.img, 
                                isEdible: elem.type === "fruit",
                                weight: elem.weight,
                                height: elem.height || 1,
                                width: elem.width || 1,
                            });

                            if (!result.permissionToPlace) {
                                setShake(index);
                                setTimeout(() => setShake(undefined), 1000)
                                return;
                            }

                            if (result.newListElements) {
                                updateInventory(result.newListElements);
                            }
                        }}
                        
                        >{`Купить за ${formatNumber(elem.price)}`}
                    </button>
                </div>
            ))
        }
    
    </div>
}

export default Shop;