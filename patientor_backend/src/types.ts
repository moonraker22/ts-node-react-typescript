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

