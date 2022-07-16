import express from 'express';
import calculateBMI from './bmiCalculator';
import calculateExercise from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req.params);
    res.send('Hello Full Stack!');
    });

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBMI(height, weight);
    const resObj = {
        height,
        weight,
        bmi
    };

    if (!height || !weight) {
        const error = {
            error: 'malformed parameters'
        };
        res.status(400).send(JSON.stringify(error));
    }

    res.json(resObj);
}
);

app.post('/exercises', (req, res) => {
    if (!req.body) {
        const error = {
            error: 'malformed parameters'
        };
        res.status(400).send(JSON.stringify(error));
    }
    interface Body {
        dailyExercises: number[];
        target: number;
    }
    const { dailyExercises, target } = req.body as Body;

    if (!dailyExercises || !target) {
        const error = {
            error: 'parameters missing'
        };
        res.status(400).send(JSON.stringify(error));
    }

    if (dailyExercises.some(day => isNaN(day))) {
        const error = {
            error: 'malformed parameters'
        };
        res.status(400).send(JSON.stringify(error));
    }

    const result = calculateExercise(dailyExercises, target);

    res.json(result);
});

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }
    );
