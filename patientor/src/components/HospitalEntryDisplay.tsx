import { Card, CardContent, Divider, Typography } from '@material-ui/core'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import HealingIcon from '@mui/icons-material/Healing'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DescriptionIcon from '@mui/icons-material/Description'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { HospitalEntry } from '../types'

type Descriptions = string[] | undefined

const HospitalEntryDisplay: React.FC<{
  entry: HospitalEntry
  descriptions: Descriptions
}> = ({
  entry,
  descriptions,
}: {
  entry: HospitalEntry
  descriptions: Descriptions
}) => {
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
            {entry?.diagnosisCodes?.map((code: string, index: number) => (
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
            Discharge: {entry.discharge?.date} {entry.discharge?.criteria}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default HospitalEntryDisplay
