import patientsData from '../../data/patients'
import { NonSensitivePatient, NewPatient, Patient, Entry } from '../types'
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

const addEntry = (id: string, entry: Entry): Entry => {
  const patient = patients.find((p) => p.id === id)

  if (patient) {
    const newEntry = {
      ...entry,
      id: uuid(),
    }

    patient.entries.push(newEntry)
    return newEntry
  } else {
    throw new Error('Patient not found')
  }
}

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry,
}
