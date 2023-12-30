import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
import Card from "../Cards/Card"
import "./Task.css"

function Tasks ({ tasks, deleteTask, handleEdit }) {
  // const [task, settask] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/v1/tasks`);
  //       // console.log(response.data)
  //       let data = response.data.data
  //       settask(data);
  //     } catch (error) {
  //       console.error("Error fetching task:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const deleteTask = async () => {
  //   const response = await axios.delete(`http://localhost:3000/api/v1/tasks/`)
  // };

  // const cardData = () => {
  //   return task.map (item => {
  //     return (<Card item={item}/>)
  //   })
  // }

  const taskCards = tasks.map(task => {
    return(
      <Card
        title={task.attributes.name}
        description={task.attributes.description}
        id={task.id}
        key={task.id}
        deleteTask={deleteTask}
        // updateTask={updateTask}
        handleEdit={() => handleEdit(task)}
      />
    )
  })

  return (
    <div className="tasks-container">
      {taskCards}
    </div>


    // <>
    //   <h4>
    //     Item {task.length && cardData()}
    //   <button>Delete</button>
    //   </h4>
    // </>
  )
}

export default Tasks;