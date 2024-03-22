import React, { useEffect, useState } from "react";
import axios from "axios";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/DataTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";
import config from "../../config.js";
import BrandModal from "./BrandModal.js";
import "./Brand.css";
import CustomTable from "./CustomTable.js";

const BrandMain = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(undefined);
  const [removeSelected, setRemoveSelected] = useState(false);

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

  const cells = [
    { id: "nickname", numeric: false, disablePadding: true, label: "Nickname", dataType: "text" },
    { id: "brand", numeric: false, disablePadding: false, label: "Brand", dataType: "text" },
    { id: "model", numeric: false, disablePadding: false, label: "Model", dataType: "text" },
    { id: "plate", numeric: false, disablePadding: false, label: "Plate", dataType: "text" },
    { id: "modelYear", numeric: false, disablePadding: false, label: "Model Year", dataType: "number" },
    { id: "color", numeric: false, disablePadding: false, label: "Color", dataType: "text" },
    { id: "isActive", numeric: false, disablePadding: false, label: "Is Active", dataType: "boolean" },
  ];

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            {/* <p>
              Click to add a <Button onClick={newBrand}>New Vehicle</Button>
            </p> */}
          </CardHeader>
          <CardBody>
            {vehicleData && (
              <CustomTable data={vehicleData} columns={Object.keys(vehicleData[0] || {})} />
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