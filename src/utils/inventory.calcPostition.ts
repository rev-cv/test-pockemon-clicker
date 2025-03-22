
import {TypeInventoryElement} from '@comps/FrameInventory/InventoryElement'

type TypeResultCalc = {
    permissionToMove: boolean,
    newListElements?: TypeInventoryElement[]
}

type TypeMatrixInventory = {
    width: number,
    height: number,
}

function moveFruitInInventory (
    idElem:number, 
    idCell: number,
    elements:TypeInventoryElement[], 
    matrix:TypeMatrixInventory 
) : TypeResultCalc 
{

    const elem = elements[idElem];
    const newPosition = getCellCoordinates(idCell, matrix.width);

    // выход за границы матрицы снизу или сверху
    const isBeyondСolumn = newPosition.column < 0 || newPosition.column + elem.width > matrix.width + 1;
    const isBeyondRow = newPosition.row < 0 || newPosition.row + elem.height > matrix.height + 1;

    if (isBeyondСolumn || isBeyondRow) {
        return {permissionToMove: false}; // - отказ
    }
    
    // исключение возможности наложения элементов
    const occupiedCells = createOccupiedCellsArray(matrix, elements, idElem);
    if (occupiedCells.length > 0) {
        // проверка каждой ячейки, которую будет занимать новый элемент
        for (let r = newPosition.row; r < newPosition.row + elem.height; r++) {
            for (let c = newPosition.column; c < newPosition.column + elem.width; c++) {
                // преобразование координаты в линейный индекс
                const cellIndex = r * matrix.width + c;
                if (occupiedCells[cellIndex]) {
                    // ячейка уже занята, размещение невозможно - отказ
                    return {permissionToMove: false};
                }
            }
        }
    }

    elements[idElem] = {...elements[idElem], column: newPosition.column, row: newPosition.row}

    return {
        permissionToMove: true,
        newListElements: [...elements]
    }

    // возможно ли мешающие элементы подвинуть в другое место корзины? 
    // ДА - рассчитать новые позиции элементов НЕТ - вернуть отказ
}

function getCellCoordinates( idCell: number, matrixWidth: number ): { column: number; row: number } {
    // перевод позиции с плоской матрицы на позицию в двухмерной матрице
    const row = Math.floor(idCell / matrixWidth) + 1;
    const column = idCell % matrixWidth + 1;
    return { column, row };
}


function createOccupiedCellsArray( matrix: TypeMatrixInventory, elements: TypeInventoryElement[], idElem: number = 999999 ): boolean[] {
    const totalCells = matrix.width * matrix.height;
    const occupiedCells: boolean[] = new Array(totalCells).fill(false);
    
    elements.forEach((element, index) => {
        if (index === idElem) return;
        for (let r = element.row; r < element.row + element.height; r++) {
            for (let c = element.column; c < element.column + element.width; c++) {
                const cellIndex = r * matrix.width + c;
                occupiedCells[cellIndex] = true;
            }
        }
    });
    return occupiedCells;
}

export {
    moveFruitInInventory,
    getCellCoordinates
}
