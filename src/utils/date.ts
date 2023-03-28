export const dateToString = (date: Date): string => `${date.getHours()}:${date.getMinutes()}`

export const differenceTimeToString = (date1: Date, date2: Date): string => {
    const mins = Math.floor((date2.getTime() - date1.getTime())/60000)
    const diffHours = Math.floor(mins/60)
    const diffMins = mins - diffHours*60
    return `${diffHours}ч ${diffMins}м`
}
