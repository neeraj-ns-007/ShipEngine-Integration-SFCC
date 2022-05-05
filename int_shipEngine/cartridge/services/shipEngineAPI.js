var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var apiKey = require("dw/system/Site").getCurrent().getCustomPreferenceValue('shipEngine_API_Key');

var shipmentsAPIService = LocalServiceRegistry.createService("int_shipEngine.shipments", {

    createRequest: function (svc, body) {
        var URL = svc.getURL();
        svc.setURL(URL);
        svc.setRequestMethod("POST");
        svc.addHeader('API-Key', apiKey);
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Accept', 'application/json')

        return body;
    },

    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (error) {
            result = httpClient.text;
        }

        return result;
    }
});

var ratesAPIService = LocalServiceRegistry.createService("int_shipEngine.rates", {

    createRequest: function (svc, body) {
        var URL = svc.getURL();
        svc.setURL(URL);
        svc.setRequestMethod("POST");
        svc.addHeader('API-Key', apiKey);
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Accept', 'application/json')

        return body;
    },

    parseResponse: function (svc, httpClient) {
        var result;
        try {
            result = JSON.parse(httpClient.text);
        } catch (error) {
            result = httpClient.text;
        }

        return result;
    }
});

module.exports = {
    shipmentsAPIService: shipmentsAPIService,
    ratesAPIService: ratesAPIService
}