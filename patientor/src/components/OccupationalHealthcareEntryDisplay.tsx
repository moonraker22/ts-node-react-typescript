import { Card, CardContent, Divider, Typography } from '@material-ui/core'
import { OccupationalHealthcareEntry } from '../types'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import HealingIcon from '@mui/icons-material/Healing'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DescriptionIcon from '@mui/icons-material/Description'
import QrCode2Icon from '@mui/icons-material/QrCode2'

type Descriptions = string[] | undefined

const HospitalEntryDisplay: React.FC<{
  entry: OccupationalHealthcareEntry
  descriptions: Descriptions
}> = ({
  entry,
  descriptions,
}: {
  entry: OccupationalHealthcareEntry
  descriptions: Descriptions
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  console.log(entry)
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">{entry.type}</Typography>
          <Divider />
          <Typography variant="h5">
            <CalendarMonthIcon />
            Date: {entry.date}
          </Typography>
          <Divider />

          <Typography variant="h5">
            <LocalHospitalIcon />
            Specialist: {entry.specialist}
          </Typography>
          <Divider />
          <Typography variant="h5">
            <DescriptionIcon />
            {entry.description}
          </Typography>
          <Divider />
          <Typography variant="h5">
            {entry.diagnosisCodes?.map((code: string, index: number) => (
              <div key={code}>
                <Typography variant="h5">
                  <QrCode2Icon />
                  {code}: {descriptions?.[index]}
                </Typography>
              </div>
            ))}
          </Typography>
          <Divider />
          <Typography variant="h5">
            <HealingIcon />
            Sick Leave: {entry.sickLeave?.startDate} to{' '}
            {entry.sickLeave?.endDate}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default HospitalEntryDisplay
