import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { TextField, DiagnosisSelection } from './FormField'
import { OccupationalHealthcareEntry } from '../types'
import { useStateValue } from '../state'

export type OccupationalHealthcareFormValues = Omit<
  OccupationalHealthcareEntry,
  'id'
>

interface Props {
  onSubmit: (values: OccupationalHealthcareFormValues) => void
  onCancel: () => void
}

export const AddOccupationalHealthcareForm = ({
  onSubmit,
  onCancel,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [{ diagnoses }] = useStateValue()
  return (
    <Formik
      initialValues={{
        date: '',
        type: 'OccupationalHealthcare',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
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
        if (!values.employerName) {
          errors.employerName = requiredError
        }
        if (!values.sickLeave?.startDate) {
          errors.sickLeave = requiredError
        }
        if (!values.sickLeave?.endDate) {
          errors.sickLeave = requiredError
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
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="Sick Leave Start Date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="Sick Leave End Date"
              name="sickLeave.endDate"
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

export default AddOccupationalHealthcareForm
