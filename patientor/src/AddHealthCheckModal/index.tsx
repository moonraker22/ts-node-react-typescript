import React from 'react'
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import AddHealthCheckForm, { HealthCheckFormValues } from './AddHealthCheckForm'

interface Props {
  modalOpen: boolean
  onClose: () => void
  onSubmit: (values: HealthCheckFormValues) => void
  error?: string
}

const AddHealthCheckEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new health check entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
)

export default AddHealthCheckEntryModal
