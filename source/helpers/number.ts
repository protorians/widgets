

export function adjustPercent(value: number){
    return value < 0 ? 0 : (value > 100 ? 100 : value);
}

export function adjustDecimalPercent(value: number){
    return value < 0 ? 0 : (value > 1 ? 1 : value);
}

export function pad(numeric: string, length: number = 2): string {
    return (new Array(length).join('0') + numeric).slice(-length);
}

export function interval(value: number, min: number, max: number): number {
    value = value > max ? max : value;
    value = value < min ? min : value;
    return value;
}