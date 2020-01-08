const validUrl = require('valid-url');

module.exports = {
    isValidUrl
};

function isValidUrl(urlString) {
    return typeof urlString === 'string' && !!validUrl.isUri(urlString);
}