// Init
var lib = {};
// Set
lib.paypal = {};

/**
 * Verify successfull paypal donation
 */
lib.paypal.isSuccess = function () {
    window.location.href;

    // Parse the URL by using URI.js
    var uri = new URI(window.location.href);
    // Get the Query Parameters
    var paramsURL = URI.parseQuery(uri.search());
    return paramsURL['paypal'] == 'success';
}