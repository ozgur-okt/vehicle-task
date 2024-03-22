import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { Check } from '@material-ui/icons';

const EditModal = ({ open, onClose, vehicle, onUpdate }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);

  useEffect(() => {
    setUpdatedVehicle(vehicle);
  }, [vehicle]);

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setUpdatedVehicle({ ...updatedVehicle, [event.target.name]: value });
  };

  const handleUpdate = () => {
    onUpdate(updatedVehicle);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Vehicle</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please edit the vehicle information.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="nickname"
          label="Nickname"
          type="text"
          value={updatedVehicle?.nickname}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          type="text"
          value={updatedVehicle?.brand}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="model"
          label="Model"
          type="text"
          value={updatedVehicle?.model}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="plate"
          label="Plate"
          type="text"
          value={updatedVehicle?.plate}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="modelYear"
          label="Model Year"
          type="text"
          value={updatedVehicle?.modelYear}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          type="text"
          value={updatedVehicle?.color}
          onChange={handleChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={updatedVehicle?.isActive}
              onChange={handleChange}
              name="isActive"
              color="primary"
            />
          }
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;