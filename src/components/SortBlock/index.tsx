import React from "react";
import { useStores } from "../../common/useStore";
import { SortTypes } from "../../types";

import "./index.scss"

export const SortBlock: React.FC = () => {
    const {ticketsStore} = useStores()

    const handleClick = (sortValue: SortTypes) => {
        if(ticketsStore.selectedSort !== sortValue) {
            ticketsStore.setSort(sortValue)
        }
    }

    return <div className="sort">
        <div className={`button ${ticketsStore.selectedSort === SortTypes.PRICE ? 'active' : 'disabled'} first`} 
            onClick={() => handleClick(SortTypes.PRICE)}>
            САМЫЙ ДЕШЕВЫЙ
        </div>
        <div className={`button ${ticketsStore.selectedSort === SortTypes.FLIGHT_TIME ? 'active' : 'disabled'} second`}
            onClick={() => handleClick(SortTypes.FLIGHT_TIME)}>
            САМЫЙ БЫСТРЫЙ
        </div>
    </div>
}