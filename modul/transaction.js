const mongoose = require('mongoose')
const transferSchema =  new mongoose.Schema(
    {
        transactioType:{type:String},
        fromusername:{type:String},
        tousername:{type:String},
        balanceAfter:{type:Number},
        balanceBefore:{type:Number},
        message:{type:String}
    },{timestamps:true}
);

module.exports = mongoose.model("Transaction",transferSchema)