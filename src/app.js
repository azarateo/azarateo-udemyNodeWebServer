const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs')

//import utils to get weather data and geocode

const { geocode } = require('./utils/geocode.js')
const { forecast } = require('./utils/forecast.js')

//Defining paths for the public folder and the templates folder
const sourcePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//configure hbs
hbs.registerPartials(partialsPath)

//Setting express' view engine and view path.
app.set('view engine','hbs')
app.set('views',viewsPath)
//
app.use(express.static(sourcePath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Edwin Alejandro Zarate Orjuela'
    })
})

app.get('/about',(req,res)=>{
    res.render('About',{
        title: 'About',
        name: 'Edwin Alejandro Zarate Orjuela'
    })
})

app.get('/help',(req,res)=>{
    res.render('Help',{
        title: 'Help',
        name: 'Edwin Alejandro Zarate Orjuela'
    })
})

app.get('/weather',(req,res)=>{
    var address = req.query.address
    if(!address){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    geocode(address,(error, {latitude, longitude, location} = {})=>{
        if(error){
            res.send({
                error
            })
        }else{
            forecast(latitude,longitude,(error,data)=>{
                if (error) {
                    res.send({
                        error
                    })
                }else{
                    res.send({
                        location: location,
                        data: data,
                        address:address
                    })
                }
            })  
        }
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query)
    res.send(
        {
            products: []
        }
    )

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Error',
        name: 'Edwin Alejandro Zarate Orjuela',
        error: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Error',
        name: 'Edwin Alejandro Zarate Orjuela',
        error: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Listening on port '+port)
})
