import './style.scss';
import { useState, useEffect } from "react";

import GardenElement from './GardenElement';
import Price from '@comps/WMoney/Price';
import {useGarden} from '@utils/redux.hook.garden';

const MyGarden = () => {

    const [isExpanded, setStateExpanded] = useState(false);
	const {garden, increaseBed, addAccelerator, tickGrowFuit} = useGarden();

	const calcAccelerator = (speed:number, accelerators: [number, number][]) => {
		accelerators.forEach(acc => speed += speed * acc[0] / 100)
		return speed.toFixed(1);
	}

	useEffect(() => {
		const intervalId = setInterval(tickGrowFuit, 1000); 
		return () => { clearInterval(intervalId) };
	  }, []);

    return <div className={`mygarden${isExpanded ? " expanded": ""}` }>
        <div className="mygarden__title">Garden</div>
        <div className="mygarden__arrow">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00004 0.0254974L0.762207 8.26216L3.23787 10.7378L9.00004 4.9745L14.7622 10.7378L17.2379 8.26216L9.00004 0.0254974Z" fill="#365FAC"/>
            </svg>
        </div>
        <div className="mygarden__wrapper">
			<div className="mygarden__content">

				<div 
					className="mygarden__garden"
					style={{
						gridTemplateColumns: " 48px".repeat(garden.maxArea),
						gridAutoRows: "48px",
					}}
					>
					{
						Array.from({ length: garden.maxArea * garden.maxArea }).map((_, index) => {
							const row = Math.floor(index / garden.maxArea) + 1;
							const col = (index % garden.maxArea) + 1;
							const isArea = row <= garden.area && col <= garden.area;

							return <div 
								className={`mygarden__garden-cell${ isArea ? " active":"" }`}
								key={`mygarden__garden-cell-${index}`}
								style={{
									gridRow: Math.ceil((index + 1) / garden.maxArea),
									gridColumn: col,
								}}
								>
							</div>
						})
					}

					{
						garden.bed.map((elem, index) => <GardenElement {...elem} key={`garden-fruit-index-${index}`} />)
					}
				</div>

				<div className="mygarden__garden-shop">

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Увеличить площадь грядки</div>
						<div className="mygarden__garden-shop-card-price"><Price price={1000}/></div>
						<button className="mygarden__garden-shop-card-buy" onClick={() => increaseBed(1000)}>Купить</button>
					</div>

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Ускорить рост на 2%/час на 2 часа</div>
						<div className="mygarden__garden-shop-card-price"><Price price={2000}/></div>
						<button className="mygarden__garden-shop-card-buy" onClick={()=>addAccelerator([2, 120 * 60], 2000)}>Купить</button>
					</div>

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Ускорить рост на 5%/час на 2 часа</div>
						<div className="mygarden__garden-shop-card-price"><Price price={5000}/></div>
						<button className="mygarden__garden-shop-card-buy" onClick={()=>addAccelerator([5, 120 * 60], 5000)}>Купить</button>
					</div>

					<div className="mygarden__garden-shop-speed">
						<span>Скорость роста</span>
						<span>{calcAccelerator(garden.speed, garden.accelerators)}%/час</span>
					</div>

				</div>

			</div>
            
        </div>

		<div className="mygarden__switch" onClick={() => setStateExpanded(!isExpanded)}></div>
    </div>
}

export default MyGarden;