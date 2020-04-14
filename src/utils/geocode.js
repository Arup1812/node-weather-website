const request = require('request')

const geocode = (address,callback) =>{
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoicGF1bGFydXAxODEyIiwiYSI6ImNrOHY5aHk5aDAzNGIzZ213MHNhbXcyeXoifQ.HqKps0bXJ-Asd5iRqPSYOA&limit=1"

    request({url: geocodeUrl, json:true},(error,{ body }={})=>{
        if(error){
            callback("Unable to connect to location services!", undefined)
        } else if(body.features.length === 0){
            callback("Location is not found! Please enter the correct location.", undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                address: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode