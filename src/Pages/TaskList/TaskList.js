import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

function TaskList() {
  const [taskLists, setTaskList] = useState([]);
  const [topic, setTopic] = useState('');
  const [editingId, setEditingId] = useState(null); 

  const saveTaskList = (e) => {
    e.preventDefault(); 
    const listTaskForm = { topic };

    if (editingId) {
      // Mise à jour d'une tâche existante
      axios.put(`http://localhost:8000/api/taskList/${editingId}`, listTaskForm)
        .then(res => {
          setTaskList(taskLists.map(taskList => (taskList.id === editingId ? { ...taskList, topic } : taskList)));
          resetForm();
        })
        .catch(err => console.log(err));
    } else {
      // Création d'une nouvelle tâche
      axios.post('http://localhost:8000/api/taskList', listTaskForm)
        .then(res => {
          setTaskList([...taskLists, { topic, id: res.data.id }]);
          resetForm();
        })
        .catch(err => console.log(err));
    }
  };

  const deleteTaskList = (id) => {
    axios.delete(`http://localhost:8000/api/taskList/${id}`)
      .then(() => {
        setTaskList(taskLists.filter(taskList => taskList.id !== id));
      })
      .catch(err => console.log(err));
  };

  const editTaskList = (taskList) => {
    setEditingId(taskList.id);
    setTopic(taskList.topic);
  };

  const resetForm = () => {
    setTopic('');
    setEditingId(null);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/taskList')
      .then(res => setTaskList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container'>
      <h2 className="text-center">Liste des "TaskList"</h2>
      <form className='form-group' onSubmit={saveTaskList}>
        <div className='row'>
          <div className='md-12'>
            <label htmlFor='topic'>Topic:</label>
            <input
              className='form-control'
              placeholder='ajouter topic ici...'
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
            />
          </div>
        </div>
        <br />
        <div className='mt-10'>
          <button type='submit' className='btn btn-primary'>
            {editingId ? (
              <FontAwesomeIcon icon={faEdit} title="Mettre à jour" />
            ) : (
              <FontAwesomeIcon icon={faPlus} title="Ajouter" />
            )}
          </button>
        </div>
      </form>
      <br />
      <ul className="list-group list-group-numbered">
        {taskLists.map((taskList) => (
          <li key={taskList.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => editTaskList(taskList)}
            >
              {taskList.topic}
            </span>
            <span
              className="pointer text-danger"
              onClick={() => deleteTaskList(taskList.id)}
            >
              <FontAwesomeIcon icon={faTrash} title="Supprimer" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
