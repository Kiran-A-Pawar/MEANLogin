



const express = require ('express');
const  Mongoose = require('mongoose');

const Contact1Schema = new Mongoose.Schema({

       name:{
           type : String
           
       },
    
        gender:{
            type : String
        },

        paygrade : {
            type  : String
        },

        pay :{
            type : Number
        }
})

const Empdata = new Mongoose.model("Empdata", Contact1Schema )
module.exports =  Empdata;