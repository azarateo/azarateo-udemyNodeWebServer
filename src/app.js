const express = require('express')
const path = require('path')
const app = express()

//Defining paths for the public folder and the templates folder
const sourcePath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates')

//Setting express' view engine and view path.
app.set('view engine','hbs')
app.set('views',viewsPath)
//
app.use(express.static(sourcePath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        author: 'Edwin Alejandro Zarate Orjuela'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        author: 'Edwin Alejandro Zarate Orjuela'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    res.send(
        {
            forecast:'It will rain',
            location:'Bogota, Colombia'
        }
    )
})

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})
