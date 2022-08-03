import dayjs from "dayjs"

const format = (dateStr, format = 'DD-MM-YYYY') => {
    if(!dateStr) {
        return ''
    }
    
    const current = dayjs(new Date()).format(format);
    const yesterday = dayjs(dayjs().add(-1, 'day')).format(format);

    const date = dayjs(new Date(dateStr)).format(format);

    if(date === current) {
        return dayjs(new Date(dateStr)).format('HH:mm')
    } else if(date === yesterday) {
        return 'Yesterday'
    } else {
        return dayjs(new Date(dateStr)).format('D/M/YY')
    }
}

export {format}