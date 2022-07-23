import express from 'express'
import patientsService from '../services/patientsService'
import toNewPatient from '../utils/toNewPatientEntry'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients())
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientsService.addPatient(newPatient)
    res.json(addedPatient)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

router.get('/:id', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id)
  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

export default router
