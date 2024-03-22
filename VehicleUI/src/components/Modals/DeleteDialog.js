// DeleteDialog.js

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import Button from 'react-bootstrap/Button';

const DeleteDialog = ({ open, onClose, onDelete }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Are you sure?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action will permanently delete this vehicle.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outline-primary">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="danger">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;