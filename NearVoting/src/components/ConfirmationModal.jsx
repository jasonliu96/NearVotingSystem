import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Input, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ConfirmationModal({
  onSubmit,
  open,
  closeModal,
  selectedCandidate,
  textField,
  setTextField,
}) {
  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <p>
          Are you sure you want to delete{' '}
          <span style={{ color: 'red' }}>{selectedCandidate}</span>? If so type
          the the user oid into the box below.
        </p>
        <Input
          onChange={(e) => setTextField(e.target.value)}
          value={textField}
        />
        <Button onClick={onSubmit} value={textField}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  textField: PropTypes.string.isRequired,
  setTextField: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedCandidate: PropTypes.string.isRequired,
};

export default ConfirmationModal;
