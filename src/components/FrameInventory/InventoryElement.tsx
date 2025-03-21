export type TypeInventoryElement = {
    name?: string;
    column: number;
    row: number;
    width: number;
    heigh: number;
    img: string;
}

const InventoryElement = ({name, column, row, heigh, width, img}:TypeInventoryElement) => {

    return <div 
        className="invertory-elem"
        style={{
            gridColumn: `${column} / ${column + width}`,
            gridRow: `${row} / ${row + heigh}`,
        }}
        title={name || ""}
        ><img src={img} alt="" />
    </div>
}

export default InventoryElement;

