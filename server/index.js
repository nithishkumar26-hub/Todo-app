const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const TodoModel=require('./Models/Todo');

const app= express()
app.use(cors({
    origin: "http://localhost:5173",  // Exact frontend URL
    // methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],  // Allowed methods
    credentials: true  // Allow credentials (cookies/headers)
}));

app.use(express.json())



mongoose.connect('mongodb://localhost:27017/test')



app.post('/add',(req,res) =>{
    const name=req.body.name
    const id=req.body.id
    var ip=req.body.ipAddress
    console.log(ip)
    TodoModel.create({
        name:name,
        _id:id,
        ipAddress:ip
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

// app.post('/sort',(req,res) =>{
//     const todo=req.body.todo
//     console.log(todo)
    
//     const updatePromises=todo.map((todo)=>
//         TodoModel.updateOne({ _id: todo.id }, { $set: { name: todo.name } })
//     );
//     TodoModel.updat

//     Promise.all(updatePromises)
//     .then(result => res.json(result))
//     .catch(err => {
//         // Handle error during the update process
//         console.error(err);
//         res.status(500).json({ error: 'Failed to update todos' });
//     });
    
// })

app.get('/sort',(req,res)=>{
    TodoModel.find()
    .sort({name:-1})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/sortas',(req,res)=>{
    TodoModel.find()
    .sort({name: 1})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.set('trust proxy', true);
app.get('/get',(req,res)=>{
    
    TodoModel.find()
    .sort({name: 1})
    .then(result => res.json(result))   
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    const isCompleted=req.body.isCompleted
   
    TodoModel.findByIdAndUpdate({_id:id},{isCompleted: !isCompleted})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/favoadd/:id',(req,res)=>{
    
    const {id}=req.params
    const isFavourite=req.body.isFavourite
    TodoModel.findByIdAndUpdate({_id:id},{isFavourite: !isFavourite})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.patch('/update/:id',(req,res)=>{
    const name=req.body.name
    const {id}=req.params
    
    TodoModel.findOneAndUpdate({_id:id},{name:name})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    TodoModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})
