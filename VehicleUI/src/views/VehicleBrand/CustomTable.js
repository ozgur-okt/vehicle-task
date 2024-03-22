import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel, TablePagination } from '@material-ui/core';

const CustomTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(0);
  }, [data]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const [page, setPage] = useState(0);

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                <TableSortLabel
                  active={sortConfig?.key === column}
                  direction={sortConfig?.direction}
                  onClick={() => requestSort(column)}
                >
                  {column}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button variant="contained" color="primary" onClick={() => setCurrentPage((page) => Math.max(page - 1, 0))}>Previous Page</Button>
        <Button variant="contained" color="primary" onClick={() => setCurrentPage((page) => Math.min(page + 1, Math.ceil(data.length / itemsPerPage) - 1))}>Next Page</Button>
      </div>
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