const mongoose = require("mongoose")
const schema = mongoose.Schema(
    {
        "uname":{type:String,required:true},
        "pass":{type:String,required:true},
        "name":{type:String,required:true},
        "email":{type:String,required:true},
        "phoneno":{type:String,required:true},
        "gender":{type:String,required:true}
    }
)

const ksrtcmodel=mongoose.model("users",schema)
module.exports={ksrtcmodel}