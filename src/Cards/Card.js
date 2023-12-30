import "./Card.css"
import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";

function Card ({ title, description, id, deleteTask, handleEdit }) {

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => deleteTask(id)}> X </button>
      <button onClick={() => handleEdit(id)}> EDIT EDIT EDIT </button>
    </div>
  )
}

export default Card;