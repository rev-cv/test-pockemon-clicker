
export const formatNumber = (num:number) => {
    const numStr = num.toString();
    if (numStr.length <= 4) {
        return numStr;
    } else {
        return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
}

export const roundFormatNumber = (num:number) => {
    const fixed = num % 1000 === 0 ? 0 : 1;
    return `${(num / 1000).toFixed(fixed)}`;
}