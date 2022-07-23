import patientsData from '../../data/patients'
import { NonSensitivePatient, NewPatient, Patient } from '../types'
import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientsData

const getPatients = (): Patient[] => {
  return patients
}

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  )
}

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id)
  return patient
}

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid()

  const newPatientEntry = {
    id,
    ...entry,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
}
