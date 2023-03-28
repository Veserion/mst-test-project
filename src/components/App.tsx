import React from "react";
import { useStores } from "../common/useStore";
import { Filters } from "./Filters";
import { SortBlock } from "./SortBlock";
import { Ticket } from "./Ticket";
import { observer } from "mobx-react-lite"

import "./index.scss"

export const App: React.FC = observer(() => {
    const {ticketsStore} = useStores()

    return <div className="root">
        <Filters />
        <div className="tickets">
            <SortBlock/>
            {ticketsStore.filteredTickets?.map(ticket => <Ticket ticket={ticket}/>)}
        </div>
    </div>
})