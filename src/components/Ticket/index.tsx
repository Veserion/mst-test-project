import React from "react";
import { ITicket, IRoute } from "../../types/Ticket";
import { dateToString, differenceTimeToString, numberOfTransfersToString, transfersToString } from "../../utils";

import "./index.scss"

interface IProps {
    ticket: ITicket
}


const Route: React.FC<{route: IRoute}> = ({route}) => {
    return <div className="route">
        <div className="points">
            <div className="secondary_text">
                {`${route.startpoint} — ${route.endpoint}`}
            </div>
            <div className="main_text">
                {`${dateToString(route.departureTime)} — ${dateToString(route.arrivalTime)}`}
            </div>
        </div>

        <div className="time">
            <div className="secondary_text">
                В ПУТИ
            </div>
            <div className="main_text">
                {differenceTimeToString(route.departureTime, route.arrivalTime)}
            </div>
        </div>
    </div>
}

export const Ticket: React.FC<IProps> = ({ticket}) => {
    return <div className="container_ticket">
        <div className="header">
            <div className="price">
                {`${ticket.price} ₽`}
            </div>
            <div className="company">
                {ticket.companyName}
            </div>
        </div>

        <div className="wrapper">
            <div className="routes">
                {ticket.routes.map((route) => <Route route={route} key={route.arrivalTime.toDateString().concat(route.endpoint)}/>)}
            </div>

            <div className="transfers">
                <div className="secondary_text">
                    {numberOfTransfersToString(ticket.routes)}
                </div>
                <div className="main_text">
                    {transfersToString(ticket.routes)}
                </div>
                {
                    ticket.routes.length > 1 
                        ? <div className="main_text">
                            {`${differenceTimeToString(
                                ticket.routes[0].departureTime,
                                ticket.routes[ticket.routes.length - 1].arrivalTime)} в пути`}
                        </div>
                        : null
                }
            </div>
        </div>
    </div>
}
