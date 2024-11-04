import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardTask from '../../components/TaskComponents/CardTask';
import AddTask from '../../components/TaskComponents/AddTask';

function Task() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get('http://localhost:8000/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTasks(); // Chargement initial des tâches
  }, []);

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(err => console.log(err));
  };

  const updateTask = (id, updatedTask) => {
    axios.put(`http://localhost:8000/api/tasks/${id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <AddTask refreshTasks={fetchTasks} />
      <div className='row'>
        <h3 className='text-center'>Liste des tâches</h3>
        {tasks.map((task) => (
          <div className='col col-md-4' key={task.id}>
            <CardTask 
              task={task} 
              deleteTask={deleteTask} 
              updateTask={updateTask} // Passez la fonction de mise à jour
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
