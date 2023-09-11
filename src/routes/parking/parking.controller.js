const ParkingModel = require('./parking.model');

class ParkingController {

    /**
    * Get Parking
    *
    * @function getParkings
    * @memberof  ParkingController
    * @param {*} req
    * @param {*} res
    * @returns {object} Requested list or error
    */
    async getParkingSettings(req, res) {
        try {
            const parkingSettings = await ParkingModel.getParkingSettings(req.query.id, req.query.type);
            if (!parkingSettings) res.json({ code: 400, message: "Not able to fetch vehicle Settings.", error: null, data: null });
            return res.json({ code: 200, message: "Parking Settings Fetched Successfully.", error: null, data: parkingSettings });
        } catch (err) {
            return res.json({ code: 400, message: "Failed to fetch Parking Settings details.", error: err, data: null });
        }
    }

    /**
    * Enter Parking
    *
    * @function enterVehicle
    * @memberof  ParkingController
    * @param {*} req
    * @param {*} res
    * @returns {object} Updated list or error
    */
    async enterVehicle(req, res) {
        try {
            const { vehicleNumber, type } = req.body;
            const vehicleSettings = await ParkingModel.getParkingSettings(type);
            if (!vehicleSettings) res.json({ code: 400, message: "There are no settings for the Parking lot.", error: null, data: null });
            
            const vehicleType = await ParkingModel.getParkingsByType(type)
            if(vehicleSettings[0].capacity <= vehicleType.length) return res.json({ code: 400, message: "No space for this type of vehicle.", error: null, data: null });
            
            const vehicle = await ParkingModel.enterVehicle(vehicleNumber, type);
            if (!vehicle) res.json({ code: 400, message: "Not able to enter.", error: null, data: null });
            res.json({ code: 200, message: "Vehicle Successfully Entered.", error: null, data: null });
        } catch (err) {
            return res.json({ code: 400, message: "Failed to enter.", error: err, data: null });
        }
    }

    /**
    * Enter Parking
    *
    * @function exitVehicle
    * @memberof  ParkingController
    * @param {*} req
    * @param {*} res
    * @returns {object} Requested list or error
    */
    async exitVehicle(req, res) {
        try {
            let vehicle = await ParkingModel.getParkings(req.query.number);
            if (!vehicle) res.json({ code: 400, message: "Vehicle Not found.", error: null, data: null });
            
            vehicle = vehicle.map(x => {
                let diff = new Date() - x.from_time;
                diff /= 1000;
                x.amount = Math.ceil(Math.round(diff) / 3600) * x.ratecard;
                const { vehicle_number, vehicle_type, amount } = x;
                return x;
            });
            return res.json({ code: 200, message: "Vehicle details Fetched Successfully.", error: null, data: vehicle });
        } catch (err) {
            return res.json({ code: 400, message: "Failed to fetch vehicle details.", error: err, data: null });
        }
    }

}

module.exports = new ParkingController;