const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicGV0ZXItd2Fsa2VyIiwiYSI6ImNsMnlvYmhvYzBpaWMzYnNic2F3bG9iYWsifQ.nbiR6AfeXA3jl3PHnEWh4Q&limit=1';
    // response.body is destructured into { body }
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to get the location, Please try with different search", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode
