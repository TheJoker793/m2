import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTask from '../../components/TaskComponents/AddTask';
import CardTask from '../../components/TaskComponents/CardTask';

function Task() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    
    axios.get('http://localhost:8000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, [tasks]); // Enlever `tasks` de la dépendance pour éviter les appels infinis

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}`)
      .then(() => {
        // Met à jour l'état pour retirer la tâche supprimée
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <AddTask />
      <div className='row'>
        <h3 className='text-center'>List des tasks</h3>
        {tasks.map((task, index) => (
          <div className='col col-md-4' key={index}>
            <CardTask task={task}  deleteTaskList={deleteTask(task.id)}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
