import React from 'react'
import PropTypes from 'prop-types';
import { Modal, Box, Input, Button } from '@mui/material'

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

function ConfirmationModal({ onSubmit, open, closeModal, selectedCandidate }) {
    const [txtField, setTxtField] = React.useState("")
    const checkText = () => {
        return txtField === "Delete"
    }
    return (
    <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <p>
                Are you sure you want to delete <span style={{color:"red"}}>{selectedCandidate}</span>? If so type <span style={{color:"red"}}>Delete </span>
                into the box below.
            </p>
            <Input onChange={(e)=>setTxtField(e.target.value)} value={txtField} />
            <Button onClick={onSubmit} value={txtField}>Submit</Button>
        </Box>
      </Modal>
    )
  }

  ConfirmationModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    selectedCandidate: PropTypes.string.isRequired
  };

  export default ConfirmationModal;