const request = require ('request');


const forecast = (latitude, longitude, callback) => {
    url ='http://api.weatherstack.com/current?access_key=aa6febd14f97b86cb6780248c5e30d72&query='+latitude+','+longitude+'&units=f';
    // response.body is destructured into { body }
    request({url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (response.error) {
            callback("Unable to get the location information", undefined);
        } else {
            result = ""+ response.body.current.weather_descriptions[0] +". It is currently " +response.body.current.temperature+ " degrees out. But feels like " +response.body.current.feelslike+ " out";
            callback(undefined, result);
        }
    });
};

module.exports = forecast
