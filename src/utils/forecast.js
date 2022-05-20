const request = require ('request');


const forecast = (latitude, longitude, callback) => {
    url ='http://api.weatherstack.com/current?access_key=aa6febd14f97b86cb6780248c5e30d72&query='+latitude+','+longitude+'&units=f';
    // response.body is destructured into { body }
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service");
        } else if (body.error) {
            callback("Unable to get the location information", undefined);
        } else {
            result = ""+ body.current.weather_descriptions[0] +". It is currently " +body.current.temperature+ " degrees out. But feels like " +body.current.feelslike+ " degrees out. The Humidity is "+body.current.humidity;
            callback(undefined, result);
        }
    });
};

module.exports = forecast
