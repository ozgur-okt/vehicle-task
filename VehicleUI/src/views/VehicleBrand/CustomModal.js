import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, FormControlLabel, Checkbox, Box, Button } from '@material-ui/core';


const CustomModal = ({ open, handleClose, newVehicle, handleNewVehicleChange, handleNewVehicleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add New Vehicle</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label="Nickname" name="nickname" value={newVehicle.nickname} onChange={handleNewVehicleChange} required variant="outlined" />
          <TextField label="Brand" name="brand" value={newVehicle.brand} onChange={handleNewVehicleChange} required variant="outlined" />
          <TextField label="Model" name="model" value={newVehicle.model} onChange={handleNewVehicleChange} required variant="outlined" />
          <TextField label="Plate" name="plate" value={newVehicle.plate} onChange={handleNewVehicleChange} required variant="outlined" />
          <TextField label="Model Year" name="modelYear" value={newVehicle.modelYear} onChange={handleNewVehicleChange} required variant="outlined" />
          <TextField label="Color" name="color" value={newVehicle.color} onChange={handleNewVehicleChange} required variant="outlined" />
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
          <Button onClick={handleNewVehicleSubmit} variant='contained'>Save</Button>
          <Button onClick={handleClose} variant='outlined'>Cancel</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;