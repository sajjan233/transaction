const Acount = require('../modul/acount')
const Transaction = require('../modul/transaction')


const balanceCredit = async (fromusername,tousername,amount,message) => {

    try {
        const acount = await Acount.findOneAndUpdate({username:fromusername},{$inc:{balance:amount}});
        if(acount){
           let result = await Transaction.create({
                fromusername:fromusername,
                tousername:tousername,
                balanceAfter:acount.balance - amount,
                balanceBefore:acount.balance,
                message:`${message}, ${fromusername} acount credit on ${amount}$`
            });
            return result;
        }

    } catch (err) {
        return {message:"transaction error",error:err}
    }
}
const balanceDebit = async (fromusername,tousername,amount,message) => {
    console.log(fromusername,tousername,amount,message,"fromusername,tousername,amount,message");
    try {
        const acount =await Acount.findOneAndUpdate({username:tousername},{$inc:{balance:-amount}});
        console.log(acount);

        if(acount){
            let result =  await Transaction.create({
                fromusername:fromusername,
                tousername:tousername,
                balanceAfter:acount.balance - amount,
                balanceBefore:acount.balance,
                message:`${message}, ${tousername} acount debit on ${amount}$`
            })
            return result;
        };
    } catch (err) {
        return {message:"transaction error",error:err}
    }
}
module.exports = {balanceCredit,balanceDebit}