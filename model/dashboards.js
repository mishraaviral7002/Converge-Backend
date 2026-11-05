const mongoose = require('mongoose');
const router = require("../routes/routes");

const dashboard = new mongoose.Schema({

        email:{
            type:String,
            required:true,

        },
        dashBoardname:{
            type:String,
            required:true,
        },
        aboutDashboard:{
            type:String,
            required:true,
        }

    } ,
    {timestamps: true}
);

const Dashboard = mongoose.model('dashboard', dashboard);

module.exports = Dashboard;

