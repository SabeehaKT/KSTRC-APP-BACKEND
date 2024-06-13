const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {ksrtcmodel} = require("./models/ksrtc")
const bcryptjs = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sabeeha02:sabeehamongodb@cluster0.05m7a.mongodb.net/ksrtcdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password)=>{
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(password,salt)
}


app.post("/register", async (req,res)=>{
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.pass)
    console.log(hashedPassword)
    input.pass = hashedPassword
    let register = new ksrtcmodel(input)
    register.save()
    res.json({"status":"success"})
})


app.post("/login",(req,res)=>{
    let input = req.body
    ksrtcmodel.find({"uname":req.body.uname}).then(
        (response)=>{
            if (response.length > 0) {
                let dbPassword = response[0].pass
                console.log(dbPassword)
                bcryptjs.compare(input.pass,dbPassword,(error,isMatch)=>{
                    if (isMatch) {
                        res.json({"status":"success","userId":response[0]._id})
                    } else {
                        res.json({"status":"Incorrect"})
                    }
                })
            } else {
                res.json({"status":"user not found"})
            }
        }
    ).catch()
})


app.listen(8080,()=>{
    console.log("server started")
})