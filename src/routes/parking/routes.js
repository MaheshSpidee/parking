const router = require('express').Router();

const ParkingController = require('./parking.controller');

class ParkingRoutes {
    constructor() {
        this.myRoutes = router;
        this.core();
    }

    core() {

        //Parking Settings
        this.myRoutes.get('/get-parking-settings', ParkingController.getParkingSettings);
        this.myRoutes.post('/enter-vehicle', ParkingController.enterVehicle);
        this.myRoutes.get('/exit-vehicle', ParkingController.exitVehicle);

    }

    getRouters() {
        return this.myRoutes;
    }
}

module.exports = ParkingRoutes;