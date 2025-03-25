import './style.scss';

import { useState, useEffect } from "react";
import Price from "@comps/WMoney/Price";
import { moveFruitInInventory } from "@utils/inventory.calcPostition"

import InventoryElement from './InventoryElement';
import { useInventory } from '@utils/redux.hook.inventory';

const Inventory = () => {

    const inRow = 5; // количество ячеек в ряду
    const maxRows = 11; // максимально доступное количество рядов
    const cells = maxRows * inRow;
    const [boughtOutRows, setBoughtOutRows] = useState(6);
    const [currentIDElementDrop, setStatusDrop] = useState<number | undefined>(undefined);

    const [fruits, updateStateFuits] = useInventory();

    const movedFuit = (idCell: number ) => {
        if (boughtOutRows * inRow < idCell) return;
        if (currentIDElementDrop === undefined) return;

        const resultCalculation = moveFruitInInventory(
            currentIDElementDrop,
            idCell,
            [...fruits],
            { width: inRow, height: boughtOutRows }
        )

        if (resultCalculation.permissionToMove && resultCalculation.newListElements) {
            updateStateFuits(resultCalculation.newListElements)
        }
    }

    useEffect(() => {
        updateStateFuits([
            {column: 4, row:2, height:2, width:2, img: "/fruit1.png", name: "Ягода 2 уровня"},
            {column: 1, row:1, height:1, width:1, img: "/fruit2.png", name: "Покеболл 1 уровня"},
            {column: 3, row:2, height:1, width:1, img: "/fruit3.png", name: "Покеболл 2 уровня"},
        ])
    }, [])

    return <div className="app-inventory">
        <div className="app-inventory__title">Inventory</div>
        <div 
            className={`app-inventory__store${currentIDElementDrop === undefined ? "" : " moving"}`}
            style={{
                gridTemplateColumns: " 48px".repeat(inRow),
                gridAutoRows: "48px",
            }}
            >

            {
                Array.from({ length: cells }).map((_, index) => (
                    <div 
                        className={`app-inventory__cell${inRow * boughtOutRows <= index ? " blocked":""}`}
                        key={`inventory-cell-${index}`}
                        style={{
                            gridRow: Math.ceil((index + 1) / inRow),
                            gridColumn: ((index % inRow) + 1),
                        }}
                        // onDragEnter={e => movedFuit(e, index)}
                        // onDrop={() => movedFuit(index)}
                        >
                    </div>
                ))
            }

            <button 
                className="app-inventory__pay-row"
                style={{gridRow: boughtOutRows + 1}}
                ><Price price={100000} />
            </button>

            { fruits.map((elem, index) => 
                <InventoryElement 
                    setStatusDrop={(status:boolean) => {
                        status ? setStatusDrop(index) : setStatusDrop(undefined)
                        return {};
                    }} 
                    key={`invertory-elem-${index}`} 
                    {...elem} 
                />
            )}

            {
                // пришлось поступить так, чтобы была возможность 
                // перемещать элемент на ячейку
                // которую он уже занимает
                Array.from({ length: cells }).map((_, index) => (
                    <div 
                        className="app-inventory__cell-event"
                        key={`inventory-cell-event-${index}`}
                        style={{
                            gridRow: Math.ceil((index + 1) / inRow),
                            gridColumn: ((index % inRow) + 1),
                        }}
                        onDragEnter={() => movedFuit(index)}
                        // onDrop={() => movedFuit(index)}
                        >
                    </div>
                ))
            }

        </div>
    </div>
}

export default Inventory;