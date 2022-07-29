import { EntryWithoutId, HealthCheckRating } from '../types'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseDate = (date: unknown) => {
  if (!date || !isString(date)) {
    throw new Error(`Incorrect or missing date: ${date}`)
  }
  return date
}

const parseDescription = (description: unknown) => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`)
  }
  return description
}

const parseSpecialist = (specialist: unknown) => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`)
  }
  return specialist
}

const parseDiagnosisCodes = (diagnosisCodes: string) => {
  //   const tmp: string[] = []
  //   diagnosisCodes = diagnosisCodes.slice(1, diagnosisCodes.length - 1)
  //   diagnosisCodes.split(',').forEach((i) => {
  //     tmp.push(i.split("'")[1])
  //   })
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}`)
  }
  return diagnosisCodes
}

const parseDischarge = (discharge: unknown) => {
  if (!discharge || !isString(discharge)) {
    throw new Error(`Incorrect or missing discharge: ${discharge}`)
  }
  return discharge
}

const parseEmployerName = (employerName: unknown) => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName: ${employerName}`)
  }
  return employerName
}

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (healthCheckRating === 'undefined') {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${healthCheckRating}`
    )
  }
  return healthCheckRating as HealthCheckRating
}

const parseType = (type: unknown) => {
  if (!type || !isString(type)) {
    throw new Error(`Incorrect or missing type: ${type}`)
  }
  return type
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): EntryWithoutId => {
  const requiredFields = ['description', 'date', 'specialist']
  const missingField = requiredFields.find(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, no-prototype-builtins
    (field) => !object.hasOwnProperty(field)
  )
  if (missingField) {
    throw new Error(
      `Incorrect or missing ${missingField}: ${object[missingField]}`
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { description, date, specialist, diagnosisCodes, type } = object
  const parsedDate = parseDate(date)
  const parsedDescription = parseDescription(description)
  const parsedSpecialist = parseSpecialist(specialist)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const parsedDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes)
  const parsedType = parseType(type)
  switch (parsedType) {
    case 'Hospital':
      return {
        description: parsedDescription,
        date: parsedDate,
        specialist: parsedSpecialist,
        diagnosisCodes: parsedDiagnosisCodes,
        type: parsedType,
        discharge: {
          date: parseDischarge(object.discharge.date),
          criteria: parseDischarge(object.discharge.criteria),
        },
      }
    case 'OccupationalHealthcare':
      return {
        description: parsedDescription,
        date: parsedDate,
        specialist: parsedSpecialist,
        diagnosisCodes: parsedDiagnosisCodes,
        type: parsedType,
        employerName: parseEmployerName(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      }
    case 'HealthCheck':
      return {
        description: parsedDescription,
        date: parsedDate,
        specialist: parsedSpecialist,
        diagnosisCodes: parsedDiagnosisCodes,
        type: parsedType,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }
    default:
      throw new Error(`Incorrect or missing type: ${type}`)
  }
}

export default toNewEntry
