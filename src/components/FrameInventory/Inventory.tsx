import './style.scss';

import { useState } from "react";
import Price from "@comps/WMoney/Price";
import { moveFruitInInventory } from "@utils/inventory.calcPostition"

import InventoryElement from './InventoryElement';
import { useInventory, useInventoryRow } from '@utils/redux.hook.inventory';
import { useAccount } from '@utils/redux.hook.account';

const Inventory = () => {

    const inRow = 5; // количество ячеек в ряду
    const maxRows = 11; // максимально доступное количество рядов
    const cells = maxRows * inRow;
    // const [boughtOutRows, setBoughtOutRows] = useState(6);
    const [currentIDElementDrop, setStatusDrop] = useState<number | undefined>(undefined);

    const [fruits, updateStateFuits] = useInventory();
    const [boughtOutRows, addInventoryRow] = useInventoryRow();
    const [, payMoney] = useAccount();

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

            {
                (boughtOutRows < maxRows) && <button 
                    className="app-inventory__pay-row"
                    style={{gridRow: boughtOutRows + 1}}
                    onClick={() => { 
                        if (boughtOutRows < maxRows) {
                            addInventoryRow();
                            payMoney(100000);
                        }
                    }}
                    ><Price price={100000} />
                </button>
            }           

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
                // должна быть возможность 
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