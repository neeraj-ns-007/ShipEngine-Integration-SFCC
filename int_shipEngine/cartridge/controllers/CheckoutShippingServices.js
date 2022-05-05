'use strict';

var server = require('server');
var shipEngineHelper = require("~/cartridge/scripts/shipEngineHelper.js")

server.extend(module.superModule);

server.append('SelectShippingMethod', server.middleware.https, function (req, res, next) {
    var data = {};
    data.firstName = req.querystring.fname;
    data.lastName = req.querystring.lname;
    data.phone = req.querystring.phone;
    data.address1 = req.querystring.address1;
    data.address2 = req.querystring.address2;
    data.city = req.querystring.city;
    data.stateCode = req.querystring.state;
    data.countryCode = req.querystring.country;
    data.postalCode = req.querystring.zip;
    
    var result = shipEngineHelper.getShipments(data);

    res.json({
        shippingRate: result
    });
    next();
});

module.exports = server.exports();