const Transaction = require('../modul/transaction');
const {balanceCredit,balanceDebit} = require('../healper/transaction')
const mongoose = require('mongoose');


const userTransaction  = async (req,res) => {
    try {
        if(Object.keys(req.body) < 1){
            const sessios = mongoose.startSession();
            (await sessios).startTransaction()
            return res.status(409).json({message:"request could not be processed because of conflict in the request"});
        }
        let {
        fromusername,
        tousername,
        amount,
        message
    } = req.body

    const userTransactions = await Promise.all(
        [
            balanceCredit(fromusername,tousername,amount,message),
            balanceDebit(fromusername,tousername,amount,message)
        ]
    ); 
    if(userTransactions.length === 2){
        await session.commitTransaction();
        session.endSession();
    }
    else{
        await session.abortTransaction();
        session.endSession();

    }
     return res.json(userTransactions)

    } catch (err) {
      res.status(501).json({message:"the server does not support the functionality required to fulfill the request",
      error:err})  
    }
};

module.exports = {userTransaction}