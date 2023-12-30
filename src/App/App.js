import './App.css';
import Tasks from "../Tasks/Task";
import { useEffect, useState } from "react";
import Form from "../Forms/NewTask"
import EditTaskModal from '../Forms/EditTaskModal';

function App() {
  // const fakeTasks = [
  //   { id: 1, title: "Play music", description: "Drink and fight" },
  //   { id: 2, title: "Finish App", description: "Copy from projects that work" },
  //   { id: 3, title: "Go climbing", description: "If it gets warm enough out" },
  //   { id: 4, title: "Hang with Rama", description: "Show him stuff" },
  // ]

  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [file, setFile] = useState();

  // function handleChange (e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  function handleChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(URL.createObjectURL(e.target.files[0]));
      addPhoto(selectedFile);
    }
  }

  function handleEdit(task) {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  function closeModal() {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  }

  function addPhoto(file) {
    const formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:3002/api/v1/upload", {
      method: "POST",
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }
      return response.json();
    })
    .then(data => {
      console.log("Photo uploaded successfully", data);
    })
    .catch(error => {
      console.log("Error uploading the photo:", error.message);
    });
  }

  function addTask (newTask) {
    fetch("http://localhost:3002/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // setTasks([...tasks, data.data])
      getTasks()
    })
    .catch(error => console.log(error.message))
  }

  function getTasks () {
    fetch("http://localhost:3002/api/v1/tasks")
    .then(response => {return response.json()})
    .then(data => setTasks(data.data))
    .catch(error => console.log(error.message))
  }

  useEffect(() => {
    getTasks();
  }, [])

  // function deleteTask(id) {
  //   console.log(id);
  //   const filteredTasks = tasks.filter(task => task.id !== id)
  //   setTasks(filteredTasks)
  // }

  function deleteTask(id) {
    fetch(`http://localhost:3002/api/v1/tasks/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if(!response.ok) {
        throw new Error("Failed to delete the task");
      }
      const filteredTasks = tasks.filter(task => task.id !== id);
      setTasks(filteredTasks)
    })
    .catch(error => console.log(error.message));
  }

  function updateTask(taskToUpdate) {
    fetch(`http://localhost:3002/api/v1/tasks/${taskToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskToUpdate)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      getTasks();
    })
    .catch(error => console.log(error.message));
  }

  return (
    <>
      <main className="App">
        <h1>TODO List</h1>
        <h3>Enter new task, you lil' snozzberry</h3>
        <Form addTask={addTask}/>
        <Tasks tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} handleEdit={handleEdit}/>
        {isEditModalOpen && <EditTaskModal selectedTask={selectedTask} closeModal={closeModal} updateTask={updateTask} />}
      </main>

      <div>
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        {file && <img src={file} alt="Ooops, maybe this isn't an image?" />}
      </div>
    </>
  );
}

export default App;
