"use strict";

var Site = require("dw/system/Site");
var UUIDUtils = require("dw/util/UUIDUtils");
var StoreMgr = require("dw/catalog/StoreMgr");
var shipEngineService = require("../services/shipEngineAPI.js");

function getShipments(data) {
    var store = StoreMgr.getStore("custom_store");
    var service_code =
        Site.getCurrent().getCustomPreferenceValue("service_code");
    var shipmentsAPIBody = {
        shipments: [
            {
                validate_address: "no_validation",
                service_code: service_code,
                external_shipment_id: UUIDUtils.createUUID(),
                ship_to: {
                    name: data.firstName + " " + data.lastName,
                    phone:
                        data.phone.slice(0, 3) +
                        "-" +
                        data.phone.slice(3, 6) +
                        "-" +
                        data.phone.slice(6),
                    address_line1: data.address1,
                    address_line2: data.address2,
                    city_locality: data.city,
                    state_province: data.stateCode,
                    postal_code: data.postalCode,
                    country_code: data.countryCode,
                    address_residential_indicator: "yes",
                },
                ship_from: {
                    company_name: store.name,
                    name: "John Doe",
                    phone: "111-111-1111",
                    address_line1: store.address1,
                    address_line2: store.address2,
                    city_locality: store.city,
                    state_province: store.stateCode,
                    postal_code: store.postalCode,
                    country_code: store.countryCode.value,
                    address_residential_indicator: "no",
                },
                confirmation: "none",
                advanced_options: {},
                insurance_provider: "none",
                tags: [],
                packages: [
                    {
                        weight: {
                            value: 1.0,
                            unit: "ounce",
                        },
                    },
                ],
            },
        ],
    };

    var result = shipEngineService.shipmentsAPIService.call(
        JSON.stringify(shipmentsAPIBody)
    );

    var ratesArray = getRates(result.object.shipments[0].shipment_id, result.object.shipments[0].carrier_id)

    for(var i = 0; i < ratesArray.length; i++){

        if(ratesArray[i].service_code == service_code && ratesArray[i].package_type == result.object.shipments[0].packages[0].package_code)
            return ratesArray[i].shipping_amount.amount
    }
    return '--';
}

function getRates(shipment_id, carrier_id) {
    var ratesAPIBody = {
        shipment_id: shipment_id,
        rate_options: {
            carrier_ids: [carrier_id],
        }
    };
    
    var result = shipEngineService.ratesAPIService.call(JSON.stringify(ratesAPIBody));

    return result.object.rate_response.rates;
}

module.exports = {
    getShipments: getShipments,
};
