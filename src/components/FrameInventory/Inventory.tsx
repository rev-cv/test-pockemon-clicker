import './style.scss';

import Price from "@comps/WMoney/Price";
import { useState } from "react";

import InventoryElement, {TypeInventoryElement} from './InventoryElement';
type TypeInventoryElementArray = TypeInventoryElement[];


const Inventory = () => {

    const inRow = 5;
    const cells = 11 * inRow;

    const [boughtOutRows, setBoughtOutRows] = useState(3);

    const [fruits, moveFruits] = useState<TypeInventoryElementArray>([
        {column: 4, row:2, heigh:2, width:2, img: "/fruit1.png"},
        {column: 1, row:1, heigh:1, width:1, img: "/fruit2.png"},
        {column: 3, row:2, heigh:1, width:1, img: "/fruit3.png"},
    ])

    return <div className="app-inventory">
        <div className="app-inventory__title">Inventory</div>
        <div 
            className="app-inventory__store"
            style={{
                gridTemplateColumns: " 48px".repeat(inRow),
                gridAutoRows: "48px",
            }}
            >

            {
                Array.from({ length: cells }).map((_, index) => (
                    <div 
                        className={inRow * boughtOutRows <= index ? 'app-inventory__cell blocked':'app-inventory__cell'}
                        key={`inventory-cell-${index}`}
                        style={{
                            gridRow: Math.ceil((index + 1) / inRow),
                            gridColumn: ((index % inRow) + 1),
                        }}
                        >
                    </div>
                ))
            }

            <button 
                className="app-inventory__pay-row"
                style={{gridRow: boughtOutRows + 1}}
                ><Price price={100000} />
            </button>

            { fruits.map(elem => <InventoryElement {...elem} />) }

            {/* <InventoryElement column={4} row={2} heigh={2} width={2} img={'/fruit1.png'} />
            <InventoryElement column={1} row={1} heigh={1} width={1} img={'/fruit2.png'} />
            <InventoryElement column={3} row={2} heigh={1} width={1} img={'/fruit2.png'} /> */}
        </div>
    </div>
}

export default Inventory;