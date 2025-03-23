export type TypeGardenElement = {
    name?: string;
    column: number;
    row: number;
    width: number;
    height: number;
    img: string;
    speedGrow?: number;
}

const GardenElement = ({name, column, row, height, width, img}:TypeGardenElement) => {
    return <div 
        className="garden-elem"
        style={{
            gridColumn: `${column} / ${column + width}`,
            gridRow: `${row} / ${row + height}`,
        }}
        title={name || ""}
        ><img src={img} alt="" />
    </div>
}

export default GardenElement;