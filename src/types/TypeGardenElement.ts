export type TypeAccelerator = [number, number]; // [ускорение, оставшееся время в минутах]

export type TypeGardenElement = {
    name: string;
    column: number;
    row: number;
    width: number;
    height: number;
    img: string;
    weight: number;                   // вес в граммах на который увеличит покемона
    speedGrow: number;                // процент на который вырастает фрукт за минуту
    complete: number;                     // процент на который вырос фрукт
}

export type TypeGarden = {
    area: number;                     // 5 * 5 сторона площади грядки
    maxArea: number;
    speed: 15;                        // стандартная (не изменяемая) скорость роста фруктов на грядке
    accelerators: TypeAccelerator[];  // список ускорителей влияющих на speed
    bed: TypeGardenElement[];         // растущие на грядке фрукты
}
