import { Patient } from '../types'
import { Action } from './reducer'

export const setPatientList = (patients: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patients,
})
export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient,
})
export const setDisplayPatient = (patient: Patient): Action => ({
  type: 'SET_DISPLAY_PATIENT',
  payload: patient,
})
