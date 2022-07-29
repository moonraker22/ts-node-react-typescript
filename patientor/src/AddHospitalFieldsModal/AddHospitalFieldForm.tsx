import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { TextField, DiagnosisSelection } from './FormField'
import { Patient, HospitalEntry } from '../types'
import { useStateValue } from '../state'

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>
export type HospitalFieldFormValues = Omit<HospitalEntry, 'id'>

interface Props {
  onSubmit: (values: HospitalFieldFormValues) => void
  onCancel: () => void
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        date: '',
        type: 'Hospital',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError
        }
        if (!values.discharge.date) {
          errors.dischargeDate = requiredError
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError
        }
        console.log(errors)
        return errors
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        console.log(values)

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Discharge Date"
              placeholder="Discharge Date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddHospitalEntryForm
