const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const vehicles = require('./data');

app.get('/api/vehicles', (req, res) => {
    res.json(vehicles);
});

app.get('/api/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.plate === req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');
    res.json(vehicle);
});

app.post('/api/vehicles', (req, res) => {
    const vehicle = {
        nickname: req.body.nickname,
        brand: req.body.brand,
        model: req.body.model,
        plate: req.body.plate,
        modelYear: req.body.modelYear,
        color: req.body.color,
        isActive: req.body.isActive
    };
    vehicles.push(vehicle);
    res.status(201).json(vehicle);
});

app.put('/api/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.plate === req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');

    vehicle.nickname = req.body.nickname;
    vehicle.brand = req.body.brand;
    vehicle.model = req.body.model;
    vehicle.plate = req.body.plate;
    vehicle.modelYear = req.body.modelYear;
    vehicle.color = req.body.color;
    vehicle.isActive = req.body.isActive;

    res.json(vehicle);
});

app.delete('/api/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.plate === req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');

    const index = vehicles.indexOf(vehicle);
    vehicles.splice(index, 1);

    res.json(vehicle);
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));