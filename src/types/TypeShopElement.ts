export type TypeShopElement = {
    title:   string;
    descr:   string;
    price:   number;
    img:     string;
    type:    "fruit" | "ball"; 
    weight?: number;
    height?: number;
    width?:  number;
}