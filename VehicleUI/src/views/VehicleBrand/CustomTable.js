import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import config from "../../config.js";
import EditModal from './EditModal.js';

const CustomTable = ({ data, columns, setVehicleData }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const filteredColumns = columns.filter(column => column !== 'id');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  useEffect(() => {
    setPage(0);
  }, [data]);

  const sortedData = React.useMemo(() => {
    if (sortConfig !== null) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    await axios.delete(`${config.DefaultApiUrl}/vehicles/${deleteId}`);
    setVehicleData(data.filter(item => item.id !== deleteId));
    handleCloseDialog();
  };

  const handleOpenEditModal = (vehicle) => {
    setEditVehicle(vehicle);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleUpdate = async (updatedVehicle) => {
    await axios.put(`${config.DefaultApiUrl}/vehicles/${updatedVehicle.id}`, updatedVehicle);
    setVehicleData(data.map(item => item.id === updatedVehicle.id ? updatedVehicle : item));
    handleCloseEditModal();
  };

  const columnMapping = {
    nickname: 'Nickname',
    brand: 'Brand',
    model: 'Model',
    modelYear: 'Year',
    plate: 'Plate',
    color: 'Color',
    isActive: 'Active'
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {filteredColumns.map((column, index) => (
              <TableCell key={column} align='center' style={{ width: index === 0 ? '300px' : '100px', border: index === 0 ? '1px solid orange' : '1px solid blue' }}>
                <TableSortLabel
                  active={sortConfig?.key === column}
                  direction={sortConfig?.direction}
                  onClick={() => requestSort(column)}
                >
                  {columnMapping[column]}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align='center' style={{ border: '1px solid blue' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item, index) => (
            <TableRow key={index}>
              {filteredColumns.map((column) => (
                <TableCell key={column} align='center'>
                  {column === 'isActive'
                    ? item[column]
                      ? <CheckCircleOutlineIcon style={{ color: 'green' }} />
                      : <HighlightOffIcon style={{ color: 'tomato' }} />
                    : item[column]
                  }
                </TableCell>
              ))}
              <TableCell style={{ cursor:"pointer", display:"flex"}} align='center'>
                <DeleteIcon onClick={() => handleOpenDialog(item.id)} />
                <EditIcon onClick={() => handleOpenEditModal(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will permanently delete this vehicle.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <EditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        vehicle={editVehicle}
        onUpdate={handleUpdate}
      />
      <TablePagination
        rowsPerPageOptions={[itemsPerPage]}
        component="div"
        count={data.length}
        rowsPerPage={itemsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </TableContainer>
  );
};

export default CustomTable;