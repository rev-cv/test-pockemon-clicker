
export type TypeInventoryElement = {
    name?: string;
    column: number;
    row: number;
    width: number;
    height: number;
    img: string;
    isEdible?: boolean; // съедобное? Может быть скормлено покемону?
    weight?: number; // вес в граммах на который увеличит покемона
}