const mySql = require('../../database/mysql').getInstance();

class ParkingModel {

    /**
    * getParkingSettings - function to get the vehicle settings
    * 
    * @param {*} id 
    * @returns 
    * @author Kasarla Mahesh<kasarlamahesh4@gmail.com>
    */
    getParkingSettings(id) {
        let query = ``;
        let params = [];
        query += `SELECT id, vehicle_type, capacity, ratecard FROM parking_settings `;
        if (id) {
            query += ` WHERE id=?`;
            params.push(id);
        }
        return mySql.query(query, params);
    }

    /**
    * enterVehicle - function to update the vehicle details
    * 
    * @param {*} vehicleNumber 
    * @param {*} type
    * @returns 
    * @author Kasarla Mahesh<kasarlamahesh4@gmail.com>
    */
    enterVehicle(vehicleNumber, type, vehicle_model) {
        let query = `INSERT INTO parkings (vehicle_number, vehicle_type, vehicle_model, from_time) VALUES (?, ?, ?, ?)`;
        return mySql.query(query, [vehicleNumber, type, vehicle_model, new Date()]);
    }

    /**
    * getParkings - function to get the vehicle parking
    * 
    * @param {*} vehicleNumber 
    * @returns 
    * @author Kasarla Mahesh<kasarlamahesh4@gmail.com>
    */
    getParkings(vehicleNumber) {
        let query = `SELECT p.id, p.vehicle_number, vt.type as vehicle_type, ct.type as vehicle_model,
                     ps.capacity, ps.ratecard, p.from_time FROM parkings p
                     INNER JOIN parking_settings ps ON ps.id=p.vehicle_type 
                     INNER JOIN car_types ct ON ct.id=p.vehicle_model
                     INNER JOIN vehicle_types vt ON vt.id=p.vehicle_type
                      WHERE p.vehicle_number=?`;
        return mySql.query(query, [vehicleNumber]);
    }

    getParkingsByType(type) {
        let query = `SELECT id FROM parkings WHERE vehicle_type=?`;
        return mySql.query(query, [type]);
    }
}

module.exports = new ParkingModel;