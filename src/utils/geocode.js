const request = require('postman-request')

const geocode = (location, callback) => {

    const baseurl2 = 'https://api.mapbox.com'
    const endpoint = 'mapbox.places'
    const forwardGeocoding = '/geocoding/v5/'+endpoint+'/'+encodeURI(location)+'.json'
    const access_token = '?access_token=pk.eyJ1IjoiYXphcmF0ZW8iLCJhIjoiY2o4cmd4dTFuMHZ4cTJxbXBvM29wYW0zeCJ9.KzONZERt0JHUwnZvILynjw'
    const options = '&limit=1'
    const url= baseurl2+forwardGeocoding+access_token+options
    
    request({ url, json: true},(error,{ body:data })=>{
        if(error){
            callback('Something went wrong with accessing the Geocoding service',undefined)
        }else if(data.features.length === 0){
            callback('Location not found',undefined)
        }
        else{
            const latitude = data.features[0].center[1]
            const longitude = data.features[0].center[0]
            const location = data.features[0].place_name
            callback(undefined,{
                latitude,longitude,location
            })
        }
        
    })

}

module.exports = { geocode }


