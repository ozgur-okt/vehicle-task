import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TableSortLabel, TablePagination } from '@material-ui/core';

const CustomTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setPage(0);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={column} style={{ width: index === 0 ? '800px' : '100px', border: index === 0 ? '1px solid red' : '1px solid blue' }}>
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
          {sortedData.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{item[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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