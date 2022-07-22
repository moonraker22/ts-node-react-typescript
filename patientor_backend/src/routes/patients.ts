import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils/toNewPatientEntry';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
    }
);

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        res.status(400).send(e.message);
    }
});

export default router;