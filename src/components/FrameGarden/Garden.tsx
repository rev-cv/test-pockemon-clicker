import './style.scss';
import { useState } from "react";

import GardenElement, {TypeGardenElement} from './GardenElement';
import Price from '@comps/WMoney/Price';

const MyGarden = () => {

    const [isExpanded, setStateExpanded] = useState(true);
    const [fuits, updateFuits] = useState<TypeGardenElement[]>([
		{column: 1, row:2, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 1},
		{column: 4, row:2, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 1},
		{column: 3, row:3, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 1},
		{column: 2, row:5, height:1, width:1, img: "/fruit1.png", name: "Ягода 1 уровня", speedGrow: 1},
		{column: 4, row:4, height:2, width:2, img: "/fruit1.png", name: "Ягода 2 уровня", speedGrow: 1},
	]);

	const maxArea = 7; // 7 x 7
	const [area, updateArea] =  useState(5);
	const [speedGrow, updateSpeedGrow] = useState(15); // %

    return <div className={`mygarden${isExpanded ? " expanded": ""}` }>
        <div className="mygarden__title" onClick={() => setStateExpanded(!isExpanded)}>Garden</div>
        <div className="mygarden__arrow" onClick={() => setStateExpanded(!isExpanded)}>
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.00004 0.0254974L0.762207 8.26216L3.23787 10.7378L9.00004 4.9745L14.7622 10.7378L17.2379 8.26216L9.00004 0.0254974Z" fill="#365FAC"/>
            </svg>
        </div>
        <div className="mygarden__wrapper">
			<div className="mygarden__content">

				<div 
					className="mygarden__garden"
					style={{
						gridTemplateColumns: " 48px".repeat(maxArea),
						gridAutoRows: "48px",
					}}
					>
					{
						Array.from({ length: maxArea * maxArea }).map((_, index) => {
							const row = Math.floor(index / maxArea) + 1;
							const col = (index % maxArea) + 1;
							const isArea = row <= area && col <= area;

							return <div 
								className={`mygarden__garden-cell${ isArea ? " active":"" }`}
								key={`mygarden__garden-cell-${index}`}
								style={{
									gridRow: Math.ceil((index + 1) / maxArea),
									gridColumn: col,
								}}
								>
							</div>
						})
					}

					{
						fuits.map((elem, index) => <GardenElement {...elem} key={`garden-fruit-index-${index}`} />)
					}
				</div>

				<div className="mygarden__garden-shop">

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Увеличить площадь грядки</div>
						<div className="mygarden__garden-shop-card-price"><Price price={1000}/></div>
						<button className="mygarden__garden-shop-card-buy">Купить</button>
					</div>

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Ускорить рост на 2%/час на 2 часа</div>
						<div className="mygarden__garden-shop-card-price"><Price price={2000}/></div>
						<button className="mygarden__garden-shop-card-buy">Купить</button>
					</div>

					<div className="mygarden__garden-shop-card">
						<div className="mygarden__garden-shop-card-title">Ускорить рост на 5%/час на 2 часа</div>
						<div className="mygarden__garden-shop-card-price"><Price price={5000}/></div>
						<button className="mygarden__garden-shop-card-buy">Купить</button>
					</div>

					<div className="mygarden__garden-shop-speed">
						<span>Скорость роста</span>
						<span>{speedGrow}%/час</span>
					</div>

				</div>

			</div>
            
        </div>
    </div>
}

export default MyGarden;