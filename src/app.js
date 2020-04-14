const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set('view engine', 'hbs')//should be this
app.set('views', viewsPath) //Changing the default views directory
hbs.registerPartials(partialsPath) // Set up the path for partials

//set up static directory to serve
app.use(express.static(publicDirectoryPath)) // For static, select the path of public

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Arup Paul"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: "About",
        name: "Arup Paul"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Help",
        help_msg: "This is the help message.",
        name: "Arup Paul"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, address} = {}) => {
        if(error){
            return res.send({
            error: error
            })
        }
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastResponse,
                location: address,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404 Error",
        name: "Arup Paul",
        error_msg: "Help article not found."
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404 Error",
        name: "Arup Paul",
        error_msg: "Page not found."
    })
})

app.listen(3000,()=>{
    console.log("Server is up and running")
})