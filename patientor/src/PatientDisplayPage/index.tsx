/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";

import { apiBaseUrl } from '../constants'
import { useStateValue } from '../state'
import { setDisplayPatient } from '../state/actions'
import { Patient, Diagnosis } from '../types'
import EntryDisplay from '../components/EntryDisplay'
import { Typography, Divider, Container, Button } from '@material-ui/core'
import ManIcon from '@mui/icons-material/Man'
import WomanIcon from '@mui/icons-material/Woman'
import { HospitalFieldFormValues } from '../AddHospitalFieldsModal/AddHospitalFieldForm'
import AddHospitalFieldsModal from '../AddHospitalFieldsModal'
import AddHealthCheckFieldsModal from '../AddHealthCheckModal'
import { HealthCheckFormValues } from '../AddHealthCheckModal/AddHealthCheckForm'
import AddOccupationalHealthcareFieldsModal from '../AddOccupationalHealthcareEntry'
import { OccupationalHealthcareFormValues } from '../AddOccupationalHealthcareEntry/AddOccupationHealthcareForm'

const PatientDisplayPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [{ patients, patientDisplay, diagnoses }, dispatch] = useStateValue()

  const [hospitalFieldModalOpen, setHospitalFieldModalOpen] =
    React.useState<boolean>(false)
  const openHospitalFieldModal = (): void => setHospitalFieldModalOpen(true)

  const [healthCheckModalOpen, setHealthCheckModalOpen] =
    React.useState<boolean>(false)
  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true)

  const [occupationalHealthcareModalOpen, setOccupationalHealthcareModalOpen] =
    React.useState<boolean>(false)
  const openOccupationalHealthcareModal = (): void =>
    setOccupationalHealthcareModalOpen(true)

  const [error, setError] = React.useState<string>()

  const closeHospitalFieldModal = (): void => {
    setHospitalFieldModalOpen(false)
    setError(undefined)
  }

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false)
    setError(undefined)
  }

  const closeOccupationalHealthcareModal = (): void => {
    setOccupationalHealthcareModalOpen(false)
    setError(undefined)
  }

  const { id } = useParams<{ id: string }>()

  React.useEffect(() => {
    if (patient?.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id || 'missing-id'}`
          )
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          dispatch(setDisplayPatient(patient))
        } catch (e) {
          console.error(e)
        }
      }

      void fetchPatient()
    }
  }, [id])
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const patient = patientDisplay?.patient as Patient
  const isMale = patient?.gender === 'male' ? <ManIcon /> : <WomanIcon />
  const diagnosisCodes = patient?.entries?.map(({ diagnosisCodes }) => {
    return diagnosisCodes
  })[0]
  const descriptions = diagnosisCodes?.map((code: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnoses[code]?.name
  })

  const submitNewHospitalFields = async (values: HospitalFieldFormValues) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Diagnosis>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        )
        console.log(newEntry)
      }
      closeHospitalFieldModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  const submitNewHealthCheckFields = async (values: HealthCheckFormValues) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Diagnosis>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        )
        console.log(newEntry)
      }
      closeHealthCheckModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  const submitNewOccupationalHealthcareFields = async (
    values: OccupationalHealthcareFormValues
  ) => {
    try {
      if (id) {
        const { data: newEntry } = await axios.post<Diagnosis>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        )
        console.log(newEntry)
      }
      closeOccupationalHealthcareModal()
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
        setError('Unknown error')
      }
    }
  }

  return (
    <>
      {patient && (
        <Container>
          <Typography variant="h4" align="center">
            Patient Info
          </Typography>
          <Typography variant="h5">Name: {patient.name}</Typography>
          <Divider />
          <Typography variant="h5">DOB: {patient.dateOfBirth}</Typography>
          <Divider />
          <Typography variant="h5">Occupation: {patient.occupation}</Typography>
          <Divider />
          <Typography variant="h5">
            Gender: {patient.gender} {isMale}
          </Typography>
          <Divider />
          <Typography variant="h5">SSN: {patient.ssn}</Typography>
          <Divider />
          <Typography variant="h5">Entries:</Typography>
          <br />
          <Typography variant="h5">
            {patient &&
              patient?.entries?.map((entry) => (
                <div key={entry.date}>
                  <EntryDisplay entry={entry} descriptions={descriptions} />
                </div>
              ))}
          </Typography>
          <Divider />
          <AddHospitalFieldsModal
            modalOpen={hospitalFieldModalOpen}
            onClose={closeHospitalFieldModal}
            onSubmit={submitNewHospitalFields}
            error={error}
          />
          <Button variant="contained" onClick={() => openHospitalFieldModal()}>
            New Hospital Field
          </Button>
          <AddHealthCheckFieldsModal
            modalOpen={healthCheckModalOpen}
            onClose={closeHealthCheckModal}
            onSubmit={submitNewHealthCheckFields}
            error={error}
          />
          <Button variant="contained" onClick={() => openHealthCheckModal()}>
            New Health Check Field
          </Button>
          <AddOccupationalHealthcareFieldsModal
            modalOpen={occupationalHealthcareModalOpen}
            onClose={closeOccupationalHealthcareModal}
            onSubmit={submitNewOccupationalHealthcareFields}
            error={error}
          />
          <Button
            variant="contained"
            onClick={() => openOccupationalHealthcareModal()}
          >
            New Occupational Healthcare Field
          </Button>
        </Container>
      )}
    </>
  )
}

export default PatientDisplayPage
