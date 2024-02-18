import { IChildCallback } from "./children";



export type IActions = {

    [K in keyof HTMLElementEventMap]?: IChildCallback

}