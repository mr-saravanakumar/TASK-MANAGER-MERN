const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    tasks:{
        type: 'string',
        required: true,
    }
});

const TaskModel=mongoose.model('tasks',TaskSchema);

module.exports=TaskModel;