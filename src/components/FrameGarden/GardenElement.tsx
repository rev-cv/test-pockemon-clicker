import { TypeGardenElement } from '@mt/TypeGardenElement';

const GardenElement = ({name, column, row, height, width, img, complete}:TypeGardenElement) => {
    return <div 
        className="garden-elem"
        style={{
            gridColumn: `${column} / ${column + width}`,
            gridRow: `${row} / ${row + height}`,
        }}
        title={name || ""}
        ><img src={img} alt="" />
        { complete < 100 && <div className='garden-elem__complete'>{complete.toFixed(1)}</div> }
    </div>
}

export default GardenElement;