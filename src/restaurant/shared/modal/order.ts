import { Item } from "./item";

export interface Order {
    id : string | null,
    total : any,
    items : {it : Item, count : number }[],
    isPlaced : boolean,
    isFinished : boolean,
    table : any
}
