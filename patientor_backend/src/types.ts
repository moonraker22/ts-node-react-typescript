export interface Diagnoses {
    code: string;
    name: string;
    latin?: string;
}
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type NewPatient = Omit<Patient, 'id'>;