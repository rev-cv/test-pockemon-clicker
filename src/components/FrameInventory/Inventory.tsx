import './style.scss';

import { useState } from "react";
import Price from "@comps/WMoney/Price";
import { moveFruitInInventory } from "@utils/inventory.calcPostition"

import InventoryElement from './InventoryElement';
import { useInventory } from '@utils/redux.hook.inventory';

const Inventory = () => {

    const {inventory, updateInventory, addRow} = useInventory();

    const [currentIDElementDrop, setStatusDrop] = useState<number | undefined>(undefined);

    const movedFuit = (idCell: number ) => {
        if (inventory.matrix.height * inventory.matrix.width < idCell) return;
        if (currentIDElementDrop === undefined) return;

        const resultCalculation = moveFruitInInventory( currentIDElementDrop, idCell )

        if (resultCalculation.permissionToMove && resultCalculation.newListElements) {
            updateInventory(resultCalculation.newListElements)
        }
    }

    return <div className="app-inventory">
        <div className="app-inventory__title">Inventory</div>
        <div 
            className={`app-inventory__store${currentIDElementDrop === undefined ? "" : " moving"}`}
            style={{
                gridTemplateColumns: " 48px".repeat(inventory.matrix.width),
                gridAutoRows: "48px",
            }}
            >

            {
                Array.from({ length: inventory.maxRows * inventory.matrix.width }).map((_, index) => (
                    <div 
                        className={`app-inventory__cell${inventory.matrix.width * inventory.matrix.height <= index ? " blocked":""}`}
                        key={`inventory-cell-${index}`}
                        style={{
                            gridRow: Math.ceil((index + 1) / inventory.matrix.width),
                            gridColumn: ((index % inventory.matrix.width) + 1),
                        }}
                        >
                    </div>
                ))
            }

            {
                (inventory.matrix.height < inventory.maxRows) && <button 
                    className="app-inventory__pay-row"
                    style={{gridRow: inventory.matrix.height + 1}}
                    onClick={() => { 
                        if (inventory.matrix.height < inventory.maxRows) {
                            addRow(100000);
                        }
                    }}
                    ><Price price={100000} />
                </button>
            }           

            { inventory.elements.map((elem, index) => 
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
                Array.from({ length: inventory.maxRows * inventory.matrix.width }).map((_, index) => (
                    <div 
                        className="app-inventory__cell-event"
                        key={`inventory-cell-event-${index}`}
                        style={{
                            gridRow: Math.ceil((index + 1) / inventory.matrix.width),
                            gridColumn: ((index % inventory.matrix.width) + 1),
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