const revisionModel = require("../model/Revision");
const validator = require("../services/validator");

module.exports = {
    // Create a new user at registration
    fetchAll: async (request, response, next) => {

        await revisionModel.findOne({minor: false}, function (err, result) { 
            if (err) { 
                response.json({ status: "error", message: "Could not retrieve results", data: null });

                next(); 
            } else { 
                response.json({ status: "success", message: "Fetched results", data: result });

                next(); 
            }
        });
    }
};