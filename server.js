const express = require('express');
const path=require('path');
const morgan = require('morgan');
const bodyparser=require('body-parser')
const session=require('express-session');
const{v4:uuid4}=require("uuid");

const router=require('./router');

const app =express();

const port=process.env.PORT||8080;

app.use(morgan('tiny'));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router);

//render home route
app.get('/',(req,res)=>{
    res.render('base',{title:"login system"});
})

app.listen(port,()=>{console.log("listening http://localhost:8080")})