const prettifyNumber = (value: number, divide: number) => {
    const divided = value / divide
    const fixed = divided.toFixed(1)
    const [head, tail] = fixed.split('.')

    return tail === '0' ? head : fixed
}

export const shorthandNumber = (value: number) => {
    if (value >= 1_000 && value < 1_000_000) {
        return `${prettifyNumber(value, 1_000)}k`
    }

    if (value >= 1_000_000) {
        return `${prettifyNumber(value, 1_000_000)}m`
    }

    return value.toString()
}


