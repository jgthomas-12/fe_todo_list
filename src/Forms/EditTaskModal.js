import React from "react";
import { useState } from "react";

function EditTaskModal({ selectedTask, updateTask, closeModal }) {
  if (!selectedTask) return null;

  const [taskName, setTaskName] = useState(selectedTask.attributes.name);
  const [taskDescription, setTaskDescription] = useState(selectedTask.attributes.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUbmit button clicked");
    const updatedTask = {
      id: selectedTask.id,
      name: taskName,
      description: taskDescription,
    }
    console.log("Update Task", updatedTask);

    updateTask(updatedTask);
    closeModal();
  };

return (
  <div className="modal">
    <h2>Edit Edit Edit</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => {
          console.log(e.target.value)
          setTaskName(e.target.value)}}
        />
      <textarea
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
      <button type="submit">Update Task</button>
    </form>
    <button onClick={closeModal}>Close</button>
  </div>
);
}

export default EditTaskModal;