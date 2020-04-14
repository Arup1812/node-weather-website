const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=e5a1dc9a67b9f20b6b4e69ebd39450ec&query="+encodeURIComponent(lat)+","+encodeURIComponent(long)

    request({url, json:true}, (error,{ body } = {})=>{
        if(error){
            callback("Unable to connect forecast service", undefined)
        } else if(body.error){
            callback("Location not found. Please serach with different location", undefined)
        } else{
            const weather_descriptions = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity
            callback(undefined,weather_descriptions+". It is "+temperature+" degree out and it feels like "+feelslike+" degree out. The humidity is "+humidity+"%.")
        }
    })

}

module.exports = forecast
