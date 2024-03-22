import React, { useEffect, useState } from "react";
import axios from "axios";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";
import config from "../../config.js";
import BrandModal from "./BrandModal.js";
import "./Brand.css";
import CustomTable from "./CustomTable.js";
import { Select, MenuItem, TextField } from "@material-ui/core";

const BrandMain = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(undefined);
  const [removeSelected, setRemoveSelected] = useState(false);
  const [filterBrand, setFilterBrand] = useState('');
  const [filterYear, setFilterYear] = useState('');

  const getVehicleListAction = () => {
    axios({
      method: "get",
      url: `${config.DefaultApiUrl}/vehicles`,
    })
    .then((response) => {
      console.log(response.data);
      setVehicleData(response.data);
      setRemoveSelected(false);
    });
  };

  useEffect(() => {
    getVehicleListAction();
  }, []);

  const filteredData = vehicleData.filter(vehicle => {
    return (filterBrand ? vehicle.brand === filterBrand : true) && 
           (filterYear ? vehicle.modelYear.includes(filterYear) : true);
  });

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <Select value={filterBrand} onChange={e => setFilterBrand(e.target.value)} style={{backgroundColor:"white", width:"300px", marginRight:"30px"}}>
              <MenuItem value=""><em>None</em></MenuItem>
              {Array.from(new Set(vehicleData.map(item => item.brand))).map(brand => (
                <MenuItem value={brand}>{brand}</MenuItem>
              ))}
            </Select>
            <TextField value={filterYear} onChange={e => setFilterYear(e.target.value)} placeholder="Year" style={{backgroundColor:"white", width:"300px"}} />
          </CardHeader>
          <CardBody>
            {filteredData && (
              <CustomTable data={filteredData} columns={Object.keys(vehicleData[0] || {})} />
            )}
          </CardBody>
        </Card>
      </GridItem>
      {showModal && (
        <BrandModal
          open={showModal}
          detail={editedVehicle}
          handleClose={() => setShowModal(false)}
          //addOrUpdateBrand={(data) => addOrUpdateBrandActions(data)}
        />
      )}
    </GridContainer>
  );
};

export default BrandMain;