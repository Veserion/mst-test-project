import { types, Instance, getSnapshot } from "mobx-state-tree";
import { FilterTypes, SortTypes } from "../types";

const Route = types.model({
    startpoint: types.string,
    endpoint: types.string,
    departureTime: types.Date,
    arrivalTime: types.Date
})

const Ticket = types.model({
    price: types.number,
    routes: types.array(Route),
    companyName: types.string
});

const Filters = types.array(
    types.union(
        types.literal(FilterTypes.ALL),
        types.literal(FilterTypes.NON_STOP),
        types.literal(FilterTypes.ONE_TRANSFER),
        types.literal(FilterTypes.TWO_TRANSFERS),
        types.literal(FilterTypes.THREE_TRANSFERS)
        ),
)

interface IFilters extends Instance<typeof Filters>{}

const TicketsArray = types.array(Ticket)

export const TicketsStore = types.model('TicketsStore', {
    tickets: TicketsArray,
    selectedSort: types.union(types.literal(SortTypes.PRICE), types.literal(SortTypes.FLIGHT_TIME)),
    selectedFilters: Filters
}).actions(self => ({
    setFilters(filters: FilterTypes[]) {
        self.selectedFilters = filters as IFilters
    },

    setSort(sort: SortTypes) {
        self.selectedSort = sort
    }
})).views(self => ({
    
    get filteredTickets() {
        const tickets = getSnapshot(self.tickets)

        let res = []
        if (self.selectedFilters.includes(FilterTypes.ALL) || self.selectedFilters.length === 0) {
            res = tickets
        } else {
            res = tickets.filter(ticket => ticket.routes.length - 1 <= Math.max(...self.selectedFilters) - 1)
        }
        
        if(self.selectedSort === SortTypes.PRICE) {
            res = [...res].sort((a, b) => a.price - b.price)
        } else {
            res = [...res].sort((a, b) => {
                const aDepTime = a.routes[0].departureTime
                const aArrTime = a.routes[a.routes.length - 1].arrivalTime
                const bDepTime = b.routes[0].departureTime
                const bArrTime = b.routes[b.routes.length - 1].arrivalTime
                return (Number(aArrTime) - Number(aDepTime)) - (Number(bArrTime) - Number(bDepTime));
            })
        }

        return TicketsArray.create(res)
    }
}))