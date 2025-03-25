
import { useState, useEffect } from "react";
import {TypeInventoryElement} from '@mt/TypeInventoryElement';

type TypeInveentoryEvents = {
    setStatusDrop: ((status: boolean) => {});
}

const InventoryElement = ({name, column, row, height, width, img, setStatusDrop}:TypeInventoryElement & TypeInveentoryEvents) => {

    const [isDroping, seStatus] = useState(false);

    useEffect(() => {
        setStatusDrop(isDroping);
    }, [isDroping]);

    return <div 
        className="invertory-elem"
        style={{
            gridColumn: `${column} / ${column + width}`,
            gridRow: `${row} / ${row + height}`,
        }}
        title={name || ""}
        onDragStart={() => 
            seStatus(true)
        }
        onDragEnd={() => {
            seStatus(false)
        }}
        draggable
        ><img src={img} alt="" />
    </div>
}

export default InventoryElement;

