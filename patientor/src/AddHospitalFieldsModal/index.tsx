import React from 'react'
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddHospitalFieldForm, {
  HospitalFieldFormValues,
} from './AddHospitalFieldForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: HospitalFieldFormValues) => void
  error?: string
}

const AddHospitalEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new hospital entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHospitalFieldForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

export default AddHospitalEntryModal
