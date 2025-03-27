
export type TypeInventoryElement = {
    name?: string;
    column: number;
    row: number;
    width: number;
    height: number;
    img: string;
    isEdible?: boolean;      // съедобное? Может быть скормлено покемону?
    weight?: number;         // вес в граммах на который увеличит покемона
}

export type TypeInventory = {
    elements: TypeInventoryElement[];
    matrix: {
        width: number;       // бывшее inRow - количество ячеек в одном рядку
        height: number;      // количество купленных рядов в инвентаре (matrix)
    };
    maxRows: number;         // макссимальное количество рядов (height) доступные в инвентаре (matrix)
    droping: number | undefined; // перетаскиваемый в данный момент элемент инвентаря
}