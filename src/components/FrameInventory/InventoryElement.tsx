
import { useState, useEffect } from "react";

export type TypeInventoryElement = {
    name?: string;
    column: number;
    row: number;
    width: number;
    height: number;
    img: string;
}

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

