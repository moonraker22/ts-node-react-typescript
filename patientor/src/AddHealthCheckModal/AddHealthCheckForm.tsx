import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { TextField, DiagnosisSelection, NumberField } from './FormField'
import { Patient, HealthCheckEntry } from '../types'
import { useStateValue } from '../state'

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>
export type HealthCheckFormValues = Omit<HealthCheckEntry, 'id'>

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void
  onCancel: () => void
}

export const AddHealthCheckForm = ({ onSubmit, onCancel }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        date: '',
        type: 'HealthCheck',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
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
              label="healthCheckRating"
              placeholder="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
              step={1}
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

export default AddHealthCheckForm
