const mongoose = require('mongoose')
const transferSchema =  new mongoose.Schema(
    {
        fromusername:{type:String},
        tousername:{type:String},
        balanceAfter:{type:Number},
        balanceBefore:{type:Number},
        message:{type:String}
    },{timestamps:true}
);

module.exports = mongoose.model("Transaction",transferSchema)