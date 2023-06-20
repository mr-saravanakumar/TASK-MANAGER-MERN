const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors=require('cors');
const TaskModel = require('./models/tasks.js');
 
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/DoTo",
);

app.post("/taskinsert",async(req, res) => {
  const tasks=req.body.tasks;
  const task= new TaskModel({tasks:tasks});
  await task.save();
  res.send("tasks added");
});

app.get("/taskread",async(req,res) => {
  TaskModel.find({},(err,result) => {
    if(err){
      res.send(err)
    }
    else{
      res.send(result);
    }
  })
})

app.put("/taskupdate",async(req, res) => {
  const upTask =  req.body.upTask;
  const id = req.body.id;
   console.log(upTask,id);
  try{
    await TaskModel.findById(id, (error,updateTask) => {
      updateTask.tasks=upTask;
      updateTask.save();
    });
  }
  catch(err){
      console.log(err);
    }  
    res.send('updated');
  });

  app.delete("/taskdelete/:id",async(req,res) => {
  const id=req.params.id;
  await TaskModel.findByIdAndRemove(id).exec();
  console.log(id);
  res.send("item deleted");
  })


app.listen(3001,() => {
 console.log("connected");
});