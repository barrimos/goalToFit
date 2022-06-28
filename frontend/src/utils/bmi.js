const calcBMI = (weigth, height, decimal=2)=>{
    return (weigth / Math.pow((height/100),2)).toFixed(decimal);
}

const getBmiResult = (weight, height)=>{
    const bmi = calcBMI(weight, height);
    if(bmi < 18.5) return 'underweight'
    if(bmi >= 18.5 && bmi<25) return 'normal'
    if(bmi >= 25 && bmi<30) return 'overweight'
    if(bmi > 30) return 'obeserve'
}

module.exports = { calcBMI, getBmiResult }