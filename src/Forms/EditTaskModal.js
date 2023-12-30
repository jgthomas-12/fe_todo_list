import React from "react";

function EditTaskModal({ selectedTask, updateTask, closeModal }) {
  if (!selectedTask) return null;

  const [taskName, setTaskName] = React.useState(selectedTask.attributes.name);
  const [taskDescription, setTaskDescription] = React.useState(selectedTask.attributes.description);

  const handleSubmit = (edit) => {
    edit.preventDefault();
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
        onChange={(edit) => setTaskName(edit.target.value)}
        />
      <textarea
        value={taskDescription}
        onChange={(edit) => setTaskDescription(edit.target.value)}
        ></textarea>
      <button type="submit">Update Task</button>
    </form>
    <button onClick={closeModal}>Close</button>
  </div>
);
}

export default EditTaskModal;