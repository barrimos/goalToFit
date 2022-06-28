const classifierActivity = (value, unit, decimal = 0) => {
    let newValue;
    if(unit === '' || unit === ' ' || unit === undefined || unit === null){
        unit = '';
    }
    if(value === 0){
        return (`${value}`);
    } else if(value < 1000 && value > 0){
        return (`${value} ${value > 1 ? (unit[unit.length - 1] === 's' ? unit : (unit ? unit + 's' : '')) : unit}`);
    } else if(value >= 1000 && value <= 999999){
        newValue = value / 1000;
        return (`${newValue.toFixed(decimal) - (decimal >= 2 && newValue.toFixed(decimal) > newValue ? 1 / Math.pow(10, decimal) : 0)}${'K ' + (unit ? (unit[unit.length - 1] === 's' ? unit : unit + 's') : '')}`);
    } else if(value >= 1000000){
        newValue = value / 1000000;
        return (`${newValue.toFixed(decimal) - (decimal >= 2 && newValue.toFixed(decimal) > newValue ? 1 / Math.pow(10, decimal) : 0)}${'M ' + (unit ? (unit[unit.length - 1] === 's' ? unit : unit + 's') : '')}`);
    } else {
        return;
    }
}

module.exports = { classifierActivity };