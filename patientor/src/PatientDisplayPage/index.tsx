/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";

// import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
// import AddPatientModal from "../AddPatientModal";
// import { Patient } from "../types";
import { apiBaseUrl } from '../constants'
// import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from '../state'
import { setDisplayPatient } from '../state/actions'
import { Patient } from '../types'
import { Typography, Divider, Container } from '@material-ui/core'
import ManIcon from '@mui/icons-material/Man'
import WomanIcon from '@mui/icons-material/Woman'

// import { TableCell } from "@material-ui/core";
// import { TableRow } from "@material-ui/core";
// import { TableBody } from "@material-ui/core";

const PatientListPage = () => {
  const [{ patients, patientDisplay }, dispatch] = useStateValue()
  const { id } = useParams<{ id: string }>()
  {
    console.log(patients, id)
  }
  React.useEffect(() => {
    if (patient?.id !== id) {
      const fetchPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id || 'missing-id'}`
          )
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
        </Container>
      )}
    </>
  )
}

export default PatientListPage
