import { Entry } from '../types'
import HealthCheckEntryDisplay from './HealthCheckEntryDisplay'
import HospitalEntryDisplay from './HospitalEntryDisplay'
import OccupationalHealthcareEntryDisplay from './OccupationalHealthcareEntryDisplay'

type Descriptions = string[] | undefined

const EntryDisplay: React.FC<{
  entry: Entry
  descriptions: Descriptions
}> = ({
  entry,
  descriptions,
}: {
  entry: Entry
  descriptions: Descriptions
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDisplay entry={entry} descriptions={descriptions} />
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryDisplay
          entry={entry}
          descriptions={descriptions}
        />
      )
    case 'HealthCheck':
      return (
        <HealthCheckEntryDisplay entry={entry} descriptions={descriptions} />
      )
    default:
      return <div>Unknown entry type</div>
  }
}

export default EntryDisplay
