export const momentAgo = (date: Date) => {
    const currentDate = new Date();

    // Разница в миллисекундах между текущей датой и входной датой
    const differenceMs = currentDate.valueOf() - date.valueOf();

    // Переводим разницу в секунды, минуты, часы, дни
    const seconds = Math.floor(differenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return days + (days === 1 ? ' день ' : ' днів ');
    }
    if (hours > 0) {
        return hours % 24 + (hours % 24 === 1 ? ' годину ' : ' годин ');
    }
    if (minutes > 0) {
        return minutes % 60 + (minutes % 60 === 1 ? ' хвилину ' : ' хвилин ');
    }
    if (seconds > 0) {
        return seconds % 60 + (seconds % 60 === 1 ? ' секунду ' : ' секунд ');
    }

    return 'За часів Римської Імперії';
}
