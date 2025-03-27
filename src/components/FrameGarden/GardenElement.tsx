import { useRef } from "react";
import { TypeGardenElement } from '@mt/TypeGardenElement';
import { useInventory } from '@utils/redux.hook.inventory';
import { placeNewElementInInventory } from '@utils/inventory.calcPostition';
import { useGarden } from '@utils/redux.hook.garden';

const GardenElement = ({name, column, row, height, width, img, complete, weight}:TypeGardenElement) => {

    const {updateInventory} = useInventory();
    const {pickFruit} = useGarden();
    const thisElem = useRef<HTMLDivElement>(null);

    return <div 
        className={`garden-elem${complete < 100 ? " animate-grow" : "" }`}
        ref={thisElem}
        style={{
            gridColumn: `${column} / ${column + width}`,
            gridRow: `${row} / ${row + height}`,
            cursor: complete === 100 ? 'pointer': ''
        }}
        title={
            complete === 100 ? `Cорвать |${name || ""}|` : name || ""
        }
        onClick={() => {
            if (complete != 100) return;

            const result = placeNewElementInInventory({name, height, width, img, weight, isEdible:true});

            if (!result.permissionToPlace) {
                thisElem.current?.classList.add('animate-shake')
                setTimeout(() => {
                    thisElem.current?.classList.remove('animate-shake')
                }, 1000)
                return;
            }
            
            if (result.newListElements) {
                updateInventory(result.newListElements);
                pickFruit([column, row])
            }

        }}
        ><img src={img} alt="" />
        { complete < 100 && <div className='garden-elem__complete'>{complete.toFixed(1)}</div> }
    </div>
}

export default GardenElement;
