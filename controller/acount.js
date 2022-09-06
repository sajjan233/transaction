const Acount = require('../modul/acount')

const userAccount = async (req,res) => {
    try {
        let {username} = req.body;
        const acount = await Acount.findOne({username:username})
        if(acount){
            return res.status(404).json({message: `${username} already exists `})
        }
        else{
            await Acount.create({username:username})
            return res.json({message:"acount create "})
            
        }
    } catch (err) {
        console.log(err);
        return res.status(409).json({message:"request could not be processed because of conflict in the request"})
    }
}

module.exports = {userAccount}