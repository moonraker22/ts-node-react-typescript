export interface Diagnoses {
  code: string
  name: string
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export type NewPatient = Omit<Patient, 'id'>
