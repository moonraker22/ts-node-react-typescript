const height:number = Number(process.argv[2]);
const weight:number = Number(process.argv[3]); 

const calcBMI = (height: number, weight: number): string => {
    const result: number = weight / (height / 100) ** 2;
    if (result < 18.5) {
        return 'Underweight (narrowly)';
    }
    if (result < 25) {
        return 'Normal (healthy weight)';
    }
    if (result < 30) {
        return 'Overweight (predium)';
    }
    return 'Obese (morbidly)';
}

console.log(calcBMI(height, weight));