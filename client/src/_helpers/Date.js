import dayjs from "dayjs"

const format = (dateStr, format = 'DD-MM-YYYY') => {
    const date = new Date(dateStr);
    const tempDate = dayjs(date);
    return tempDate.format(format)
}

export {format}