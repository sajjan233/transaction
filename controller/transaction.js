const Transaction = require('../modul/transaction');
const {balanceInfo} = require('../healper/transaction')
const mongoose = require('mongoose');


const userTransaction  = async (req,res) => {
    const session = await mongoose.startSession();
     session.startTransaction()
    try {
        if(Object.keys(req.body) < 1){
            return res.status(409).json({message:"request could not be processed because of conflict in the request"});
        }
        let {
        fromusername,
        tousername,
        amount,
        message
    } = req.body

    const userTransactions = await balanceInfo(fromusername, tousername, amount, message);   

    if(userTransactions.Cr && userTransactions.Dr){
        await session.commitTransaction();
        session.endSession();
       return res.status(201).json({message:"transaction successfully"})
    }
    else{
        await session.abortTransaction();
        session.endSession();

    }

    } catch (err) {
        console.log(err);
    return  res.status(501).json({message:"the server does not support the functionality required to fulfill the request",
      error:err})  
    }
};
const list  = async (req,res) => {
    try {
        let {name,type,skip,limit} = req.query;
        let query = {};
        if(name)  query.tousername = name;
        if(type)  query.transactioType = type;
        if(!limit) limit = 10;
        if(!skip) skip = 1 + limit

        const list = await Transaction.find(query,{},{limit:limit})
        if(list){
           return res.json({list});
        }
        return res.status(401).json({message:"server does not support your required"})
    } catch (err) {
        return  res.status(501).json({message:"the server does not support the functionality required to fulfill the request",
        error:err})  
    }
}
module.exports = {userTransaction,list}