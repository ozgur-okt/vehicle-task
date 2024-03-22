import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, Box, DialogActions } from '@material-ui/core';
import Button from 'react-bootstrap/Button';

const AddModal = ({ open, handleClose, newVehicle, handleNewVehicleChange, handleNewVehicleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          label="Nickname"
          name="nickname"
          value={newVehicle.nickname}
          onChange={handleNewVehicleChange}
          margin='dense'
          type='text'
          fullWidth />
        <TextField
          label="Brand"
          name="brand"
          value={newVehicle.brand}
          onChange={handleNewVehicleChange}
          margin='dense'
          type='text'
          fullWidth />
        <TextField
          label="Model"
          name="model"
          value={newVehicle.model}
          onChange={handleNewVehicleChange}
          margin='dense'
          type='text'
          fullWidth />
        <TextField
          label="Plate"
          name="plate" value={newVehicle.plate}
          onChange={handleNewVehicleChange}
          margin='dense' type='text'
          fullWidth />
        <TextField
          label="Model Year"
          name="modelYear" 
          value={newVehicle.modelYear}
          onChange={handleNewVehicleChange}
          margin='dense' type='text' 
          fullWidth />
        <TextField
          label="Color"
          name="color"
          value={newVehicle.color}
          onChange={handleNewVehicleChange}
          margin='dense'
          type='text'
          fullWidth />
        <FormControlLabel
          control={
            <Checkbox
              checked={newVehicle.isActive}
              onChange={handleNewVehicleChange}
              name="isActive"
              color="primary"
            />
          }
          label="Active"
        />

      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleNewVehicleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;