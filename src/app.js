const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

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
    if(!req.query.address){
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query)
    res.send(
        {
            address: req.query.address
        }
    )

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

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})
