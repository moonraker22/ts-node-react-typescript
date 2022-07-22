import { CoursePart } from '../App'

const Part = ({ parts }: { parts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
  return (
    <div>
      {parts.map((part) => {
        switch (part.type) {
          case 'normal':
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>{part.description}</p>
                <p>Number of exercises: {part.exerciseCount}</p>
                <br />
              </div>
            )
          case 'groupProject':
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>Number of exercises: {part.exerciseCount}</p>
                <p>Number of group projects: {part.groupProjectCount}</p>
                <br />
              </div>
            )
          case 'submission':
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>{part.description}</p>
                <p>Number of exercises: {part.exerciseCount}</p>
                <p>{part.exerciseSubmissionLink}</p>
                <br />
              </div>
            )
          case 'special':
            return (
              <div key={part.name}>
                <h3>{part.name}</h3>
                <p>{part.description}</p>
                <p>Number of exercises: {part.exerciseCount}</p>
                <p>Requirements: {part.requirements.join(', ')}</p>
                <br />
              </div>
            )
          default:
            return assertNever(part)
        }
      })}
    </div>
  )
}

export default Part
