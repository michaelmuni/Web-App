const revisionModel = require("../model/Revision");
const validator = require("../services/validator");

module.exports = {
    // fetch a count of all records
    countAll: async (request, response, next) => {

        await revisionModel.count({}, function (err, result) { 
            //log error to json response if one occurs
            if (err) { 
                response.json({ status: "error", message: "Could not retrieve results", data: null });

                next(); 
            //log results to json response if successful
            } else { 
                response.json({ status: "success", message: "Fetched count", data: result });

                next(); 
            }
        });
    }, 

    //fetch a count of records which match the given title
    countTitle: async (request, response, next) => {
        reqTitle = request.query.title; 

        await revisionModel.count({title: reqTitle}, function (err, result) { 
            //log error to json response if one occurs
            if (err) { 
                response.json({ status: "error", message: "Could not retrieve results", data: null });

                next(); 
            //log results to json response if successful
            } else { 
                response.json({ status: "success", message: "Fetched count", data: result });

                next(); 
            }
        });
        
    },

    getUniqueTitles: async (request, response, next) => { 
        await revisionModel.distinct('title', function (err, result) { 
            //log error to json response if one occurs
            if (err) { 
                response.json({ status: "error", message: "Could not retrieve titles", data: null });

                next(); 
            //log results to json response if successful
            } else { 
                response.json({ status: "success", message: "Fetched list of titles", data: result });

                next(); 
            }
        });

    }
};