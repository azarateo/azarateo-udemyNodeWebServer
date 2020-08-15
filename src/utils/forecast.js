const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const latlng = latitude + ',' + longitude
    const urlbase = 'http://api.weatherstack.com/current?'
    const access_key = 'access_key=55739ade495c57d1838c21d35fa4eb58'
    //const query = '&query=&units=m'
    const query = '&query=' + latlng + '&units=m'
    const url = urlbase + access_key + query

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Something went wrong with the Weather service', undefined)
        } else if (response.body.error) {
            callback('There was an error trying to get that location: ' + response.body.error.info, undefined)
        } else {
            const data = response.body
            callback(undefined, data.current.weather_descriptions[0] + '. ' + 'In ' + data.location.name + ' the temperature is ' + data.current.temperature + ' centigrades and it feels like ' + data.current.feelslike)
        }
    })
}

module.exports = { forecast }