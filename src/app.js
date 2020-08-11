const express = require('express')
const path = require('path')
const app = express()
const sourcePath = path.join(__dirname,'../public')

app.use(express.static(sourcePath))
app.set('view engine','hbs')

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
