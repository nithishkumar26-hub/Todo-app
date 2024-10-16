const mongoose=require('mongoose')

const TodoSchema= new mongoose.Schema({
    name: String,
    isCompleted:{
        type:Boolean,
        default:false
    },
    _id: Number,
    isFavourite:{
        type:Boolean,
        default:false
    }
})

const TodoModel = mongoose.model("todos",TodoSchema)
module.exports=TodoModel