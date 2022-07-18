import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
    }
);

router.post('/', (_req, res) => {
    res.send(patientsService.addPatient());
    }
);

export default router;