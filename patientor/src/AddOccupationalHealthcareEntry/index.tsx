import React from 'react'
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddOccupationalHealthcareForm, {
  OccupationalHealthcareFormValues,
} from './AddOccupationHealthcareForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: OccupationalHealthcareFormValues) => void
  error?: string
}

const AddOccupationalHealthcareEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new occupational healthcare entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

export default AddOccupationalHealthcareEntryModal
