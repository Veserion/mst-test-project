import { IRoute } from "../types/Ticket";

export const numberOfTransfersToString = (routes: IRoute[]): string => {
    const n = routes.length - 1
    let word
    if (n === 0) {
        return 'БЕЗ ПЕРЕСАДОК'
    } else if (n === 1) {
        word = 'ПЕРЕСАДКА'
    } else word = 'ПЕРЕСАДКИ'
    return `${n} ${word}`
}

export const transfersToString = (routes: IRoute[]): string => {
    const transfers = routes.map(route => route.endpoint)
    transfers.splice(-1, 1)
    return transfers.join(', ')
}