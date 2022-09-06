const mongoose = require('mongoose')
const acountSchema = new mongoose.Schema(
    {
        username:{type:String},
        balance:{type:Number}
    },{timestamps:true}
);
module.exports = mongoose.model("Acount",acountSchema)