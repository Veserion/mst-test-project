export interface ITicket {
    price: number
    routes: IRoute[]
    companyName: string
}

export interface IRoute {
    startpoint: string
    endpoint: string
    departureTime: Date
    arrivalTime: Date
}