import { State } from './state'
import { Patient } from '../types'

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }
  | {
      type: 'SET_DISPLAY_PATIENT'
      payload: Patient
    }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'ADD_PATIENT':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'SET_DISPLAY_PATIENT':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patientDisplay: { patient: action.payload },
      }

    default:
      return state
  }
}
