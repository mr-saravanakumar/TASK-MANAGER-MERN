import React from 'react'
import { useState ,useEffect,useRef} from 'react'
import Axios from 'axios'
const Doto = () => {
   const inputTasks =useRef(null);
    const[tasks,setTasks] = useState("");
    const[listtask,setListtask] = useState([]);
    const[status,setStatus] = useState("");

    const handle=()=>{
      if(tasks==""){
         setStatus("cannot be empty");
      }
      else{
      Axios.post('http://localhost:3001/taskinsert',{
        tasks:tasks,
      })
      .then(()=>{
        setListtask([...listtask,{tasks:tasks}]);
        setStatus("Task Added");
        inputTasks.current.value="";
        setTasks(tasks);
      })
      .catch(()=>{
        alert("task not added");
      });  
    };
  }

   useEffect(()=>{
    Axios.get('http://localhost:3001/taskread',{
      tasks:tasks,
    })
    .then((response)=>{
      if(response.data.length<0)
      {
        tasks("Tasks is empty");
      }
      else{
        setListtask(response.data);
        console.log(response);
      }
      
    })
    .catch((err)=>{
      setListtask("list is empty");
      console.log(err)
    });  
   },[])

   const updatetask=(id)=>{
    const upTask=prompt("update the task");
     Axios.put('http://localhost:3001/taskupdate',{
      upTask:upTask,
      id:id,
     }).then(() =>{
      console.log("task updated");
    }
     );
   };

   const deletetask=(id)=>{
    const con=window.confirm("Are you sure you want to delete this task?");
    if(con==true){
    Axios.delete(`http://localhost:3001/taskdelete/${id}`)
    .then(()=>{
      setListtask(
      listtask.filter((val)=>{
        return val._id!=id
      })
      );
    });
  }
   }

  return (
    <div className="header-container">
    <div className="header">
      <h2>TASK MANAGER</h2>
      <input type="text" class="input" onChange={(e)=>{setTasks(e.target.value)}}/><br/>
      <span>{status}</span><br/>
      <button onClick={handle} className="btn" ref={inputTasks}>ADD TASK</button>
      </div>
      <div className="flow">
      {listtask.map((val)=>{
      return<>
      <div className="added-task">
      <div>
      <p>{val.tasks}</p>
      </div>
      <div className="custom">
      <button className="btn-edit" onClick={()=>{updatetask(val._id)}}>EDIT</button>
      <button className="btn-delete" onClick={()=>{deletetask(val._id)}}>DELETE</button>
      </div>
      </div>
      </>
      })}
      </div>
    </div>
  )
}

export default Doto
