const mongoose = require('mongoose');

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
        },
    myRoomCode:{
            type:String,
        required:true,
    },
    acessto:{
            type:String,
    },
    canvas:{
            type:Object,
        default :{}
    }

    } ,
    {timestamps: true}
);

const Dashboard = mongoose.model('dashboard', dashboard);

module.exports = Dashboard;

