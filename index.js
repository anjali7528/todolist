const { Console } = require('console');
const express = require('express');
const { request } = require('http');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const todolist = require('./models/todolist');

const app = express();

var moment = require('moment');
const req = require('express/lib/request');

//app.use('/', require('./routers'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views' ));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/', function(req,res){

    todolist.find({}, function(err, dolist){
        if(err){
            console.log('error in finding in db');
            return;
        }

    return res.render('home',{
        title:'TODO list',
        todo_list: dolist
    });

});


});

app.post('/create-things', function(req,res){

    todolist.create({
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    }, 
    
    function(err, newthings){
         if(err){
             Console.log('error in creating a list');
             return;
         }

           console.log('******',newthings)
    return res.redirect('back');

    });
});

app.get("/delete-list", function(req,res){
   
    let id = req.query.id;

    todolist.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting object from db');
            return;
        }
    return res.redirect('back');
 });

});

app.listen(port, function(err){
    if(err)
    {
        console.log('error in running the server ');
    }

    console.log("server is up.");
});