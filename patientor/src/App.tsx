import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container } from '@material-ui/core'

import { apiBaseUrl } from './constants'
import { useStateValue } from './state'
import { Patient, Diagnosis } from './types'
import { setPatientList, setDiagnosisList } from './state/actions'

import PatientListPage from './PatientListPage'
import PatientDisplayPage from './PatientDisplayPage'
import { Typography } from '@material-ui/core'

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [, dispatch] = useStateValue()
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(setPatientList(patientListFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    void fetchPatientList()
  }, [dispatch])
  React.useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(setDiagnosisList(diagnosisListFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    void fetchDiagnosisList()
  }, [dispatch])

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/:id" element={<PatientDisplayPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
