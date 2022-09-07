const Acount = require('../modul/acount')
const Transaction = require('../modul/transaction')


       
const balanceInfo = async (fromUsername, toUsername, amount, message) => {
    const fromAcount = await Acount.findOneAndUpdate({ username: fromUsername }, { $inc: { balance: -amount } });
    if (fromAcount) {
        const toAcount = await Acount.findOneAndUpdate({ username: toUsername }, { $inc: { balance: amount } });
        let result = {};
        if (toAcount) {
            result.Cr = await Transaction.create({
                transactioType: "Cr",
                fromUsername: fromUsername,
                toUsername: toUsername,
                balanceAfter: toAcount.balance ,
                balanceBefore: toAcount.balance - amount,
                message: `${message}, ${fromUsername} acount credit on ${amount}$`
            });
        }
        if (toAcount) {
            result.Dr = await Transaction.create({
                transactioType: "Dr",
                fromUsername: fromUsername,
                toUsername: toUsername,
                balanceAfter: fromAcount.balance ,
                balanceBefore: fromAcount.balance + amount,
                message: `${message}, ${toUsername} acount Debit on ${amount}$`
            });
            
            return result;
        }
        if (!toAcount) {
            return { message: "user acount not found", statuscode: 401 }
        }
    }
    return { message: "user acount not found", statuscode: 401 }
}

module.exports = { balanceInfo }
   