const mongoose=require('mongoose')

const TodoSchema= new mongoose.Schema({
    name: String,
    isCompleted:{
        type:Boolean,
        default:false
    },
    _id: Number,
    ipAddress: String,
    isFavourite:{
        type:Boolean,
        default:false
    },
    username: String,
    password: String
    
})


const TodoModel = mongoose.model("todos",TodoSchema)
module.exports=TodoModel