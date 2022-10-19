/*!
 * Wallids-Cybersecurity
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */

var axios = require('axios');

/**
 * Wallids Security Settings
 *
 * @param {object} options
 * {
 *   secretKey: "", // Secret KEY
 *   useMonitoring: true,// IDS
 *   useAllRequest: true,// aLL Request
 * }
 * @private
 */

function wallids(options) {

    var useMonitoring = options.useMonitoring || true;
    var logRequestModel = {
        secretKey: options.secretKey,
        info: {
            isMonitoring: useMonitoring,
            url: "",
            requestType: "",
            request: "",
            ip: "",
            headers: null,
            formDatas: null,
            responseData: "",
            statusCode: 0,
            errorMessage: "",
        }
    };

    return async function _wallids(request, response, next) {

        if (options.secretKey == "" || options.secretKey == undefined) {
            console.dir("Wallids Secret Key Required");
            return next();
        }

        var virtualPost = false;

        logRequestModel.info.url = request.protocol + "://" + request.get('Host') + request.originalUrl
        logRequestModel.info.requestType = request.method;
        logRequestModel.info.ip = request.ip;
        logRequestModel.info.headers = request.headers;

        if (request.method == "POST" || request.method == "PUT") {
            logRequestModel.info.formDatas = request.body;
            logRequestModel.info.request = request.body;
        }
        else {
            if (request.query != {}) {
                virtualPost = true;
                logRequestModel.info.requestType = "POST"
                logRequestModel.info.formDatas = request.query;
                logRequestModel.info.request = request.query;
            }
            else {
                logRequestModel.info.request = request.protocol + "://" + request.get('Host') + request.originalUrl;
            }
        }

        if (useMonitoring) {
            sendLog(logRequestModel);
        } else {
            var result = await sendLog(logRequestModel);
            if (result.attack != 0) {
                if (virtualPost) {
                    response.redirect(request.protocol + "://" + request.get('Host') + request.path + "?" + objectToQueryString(result.body));
                }else{
                    if (request.method == "POST" || request.method == "PUT") {
                        request.body = result.body;
                    }else {
                        response.redirect(request.body);
                    }
                }
            }
        }
        next();
    }
}

async function sendLog(requestModel) {
    const response = await axios.post("https://api.wallids.com/tracing/client", JSON.stringify(requestModel),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return response.data;
}

function objectToQueryString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

module.exports = wallids
