
import {TypeInventoryElement} from '@mt/TypeInventoryElement';
import {store} from '@utils/redux.store';

type TypeResultCalc = {
    permissionToMove: boolean,
    newListElements?: TypeInventoryElement[]
}

type TypeResultPlace = {
    permissionToPlace: boolean;
    newListElements?: TypeInventoryElement[];
};

type TypeNewElement = Omit<TypeInventoryElement, 'row' | 'column'>;

type TypeMatrixInventory = {
    width: number,
    height: number,
}

function moveFruitInInventory ( idElem:number, idCell: number ) : TypeResultCalc {
    const elements = [...store.getState().inventory.elements];
    const matrix = store.getState().inventory.matrix;
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
        newListElements: elements
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

function createOccupiedCellsArrayNEW(matrix: TypeMatrixInventory, elements: TypeInventoryElement[]): boolean[] {
    const occupiedCells = new Array(matrix.width * matrix.height).fill(false);
    elements.forEach(element => {
        for (let dr = 0; dr < element.height; dr++) {
            for (let dc = 0; dc < element.width; dc++) {
                const row = element.row + dr;  // строка начинается с 1
                const col = element.column + dc;  // колонка начинается с 1
                const index = (row - 1) * matrix.width + (col - 1);  // корректировка для массива с 0
                if (index >= 0 && index < occupiedCells.length) {
                    occupiedCells[index] = true;
                }
            }
        }
    });
    return occupiedCells;
}

function placeNewElementInInventory(newElement: TypeNewElement): TypeResultPlace {
    const elements = store.getState().inventory.elements;
    const matrix = store.getState().inventory.matrix;
    const occupiedCells = createOccupiedCellsArrayNEW(matrix, elements);
    const totalCells = matrix.width * matrix.height;

    // Перебираем позиции, начиная с 1
    for (let r = 1; r <= matrix.height - newElement.height + 1; r++) {
        for (let c = 1; c <= matrix.width - newElement.width + 1; c++) {
            let canPlace = true;

            // Проверяем все ячейки, которые займет элемент
            for (let dr = 0; dr < newElement.height; dr++) {
                for (let dc = 0; dc < newElement.width; dc++) {
                    // Корректируем индекс для массива с индексацией с 0
                    const cellIndex = (r - 1 + dr) * matrix.width + (c - 1 + dc);

                    // Проверяем, свободна ли ячейка и находится ли она в пределах матрицы
                    if (cellIndex >= totalCells || occupiedCells[cellIndex]) {
                        canPlace = false;
                        break;
                    }
                }
                if (!canPlace) break;
            }

            if (canPlace) {
                const placedElement: TypeInventoryElement = {
                    ...newElement,
                    row: r,
                    column: c
                };
                return {
                    permissionToPlace: true,
                    newListElements: [...elements, placedElement]
                };
            }
        }
    }

    return { permissionToPlace: false };
}

export {
    moveFruitInInventory,
    getCellCoordinates,
    placeNewElementInInventory
}
