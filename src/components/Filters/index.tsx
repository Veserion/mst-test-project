import React from "react";
import { useStores } from "../../common/useStore";
import { FilterTypes } from "../../types";

import "./index.scss"

interface ITransferFilter {
    name: string,
    count: number
    id: string,
}

const transfers = [{
        name: 'Все',
        count: FilterTypes.ALL,
        id: 'all',
    }, {
        name: 'Без пересадок',
        count: FilterTypes.NON_STOP,
        id: '0_transfer',
    }, {
        name: '1 пересадка',
        count: FilterTypes.ONE_TRANSFER,
        id: '1_transfer',
    }, {
        name: '2 пересадки',
        count: FilterTypes.TWO_TRANSFERS,
        id: '2_transfers',
    }, {
        name: '3 пересадки',
        count: FilterTypes.THREE_TRANSFERS,
        id: '3_transfers',
}]

interface ITransfer {
    transfer: ITransferFilter,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    checked: boolean
}

const Transfer: React.FC<ITransfer> = ({transfer, onChange, checked}) => {
    return <label className="custom-checkbox">
        <input type="checkbox" id={transfer.id} value={transfer.count} name={transfer.id} onChange={onChange} checked={checked}/>
        <span>{transfer.name}</span>
    </label>
}

export const Filters: React.FC = () => {
    const {ticketsStore} = useStores()

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFilters = [...ticketsStore.selectedFilters]
        if (e.target.checked) {
            selectedFilters.push(Number(e.target.value))
        } else {
            const i = selectedFilters.indexOf(Number(e.target.value))
            selectedFilters.splice(i, 1)
        }

        ticketsStore.setFilters(selectedFilters)
    }

    return <div className="container_filters">
        <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
        {transfers.map(tr => <Transfer transfer={tr} onChange={handleClick} checked={ticketsStore.selectedFilters.includes(tr.count)} key={tr.id}/>)}
    </div>
}