interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyExercises: number[], target: number): Result => {
    const periodLength = dailyExercises.length;
    const trainingDays = dailyExercises.filter(day => day > 0).length;
    const average = dailyExercises.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = average >= target ? 3 : average >= target - 1 ? 2 : 1;
    const ratingDescription = average >= target ? 'good job' : 'not too bad but could be better';
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseArguments = (args: string[]): number[] => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 12) throw new Error('Too many arguments');
    const dailyExercises = args.slice(3).map(Number);
    return dailyExercises;
};

const target = Number(process.argv[2]);


try {
    const dailyExercises = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
} catch (error) {
    if (error instanceof Error) {
        console.log('Error, something bad happened, message: ', error?.message);
    } else {
        console.log('Error, something bad happened, message: ', error);
    }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

export default calculateExercises;