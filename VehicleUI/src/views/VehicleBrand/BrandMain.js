import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.js";
import "./Brand.css";
import CustomTable from "./CustomTable.js";
import { Select, MenuItem, TextField, Box } from "@material-ui/core";
import AddModal from "./AddModal.js";
import Button from 'react-bootstrap/Button';

const BrandMain = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const [newVehicle, setNewVehicle] = useState({
    nickname: '',
    brand: '',
    modelYear: '',
    model: '',
    plate: '',
    color: '',
    isActive: false,
  });

  const getVehicleListAction = () => {
    axios({
      method: "get",
      url: `${config.DefaultApiUrl}/vehicles`,
    })
      .then((response) => {
        console.log(response.data);
        setVehicleData(response.data);
      });
  };

  const handleNewVehicleSubmit = () => {
    axios.post(`${config.DefaultApiUrl}/vehicles`, newVehicle)
      .then(() => {
        getVehicleListAction();
        setShowModal(false);
      });
  };

  useEffect(() => {
    getVehicleListAction();
  }, []);

  const filteredData = vehicleData.filter(vehicle => {
    return (filterBrand ? vehicle.brand === filterBrand : true) &&
      (filterYear ? vehicle.modelYear.includes(filterYear) : true);
  });


  const handleNewVehicleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(e.target.name, value);
    setNewVehicle({
      ...newVehicle,
      [e.target.name]: value,
    });
  };

  return (
    <Box>
      <Box 
      display="flex" 
      justifyContent="space-between" 
      marginBottom="40px"
      backgroundColor="white"
      >
        <Select placeholder="Brand" value={filterBrand} onChange={e => setFilterBrand(e.target.value)} style={{ width: "300px"}}>
          <MenuItem value=""><em>None</em></MenuItem>
          {Array.from(new Set(vehicleData.map(item => item.brand))).map((brand, i) => (
            <MenuItem key={i} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
        <Box >
          <TextField label="Year" value={filterYear} variant="outlined" onChange={e => setFilterYear(e.target.value)}  />
        </Box>
        <Button onClick={() => setShowModal(true)} variant="success">Add New Vehicle</Button>
       
      </Box>
      {filteredData && (
          <CustomTable data={filteredData} columns={Object.keys(vehicleData[0] || {})} setVehicleData={setVehicleData} />
        )}
      {showModal && (
        <AddModal
          open={showModal}
          handleClose={() => setShowModal(false)}
          newVehicle={newVehicle}
          handleNewVehicleChange={handleNewVehicleChange}
          handleNewVehicleSubmit={handleNewVehicleSubmit}
        />
      )}
    </Box>
  );
};

export default BrandMain;