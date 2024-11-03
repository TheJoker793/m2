import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskList() {
  const [taskLists, setTaskList] = useState([]);
  const [topic, setTopic] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const saveTaskList = (e) => {
    e.preventDefault(); 
    const listTaskForm = {
      topic: topic
    };

    if (editingId) {
      // Si editingId est défini, cela signifie que nous mettons à jour une tâche existante
      axios.put(`http://localhost:8000/api/taskList/${editingId}`, listTaskForm)
        .then(res => {
          // Mettre à jour la liste des tâches avec la tâche mise à jour
          setTaskList(taskLists.map(taskList => (taskList.id === editingId ? { ...taskList, topic } : taskList)));
          resetForm(); // Réinitialise le formulaire après la mise à jour
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // Sinon, créer une nouvelle tâche
      axios.post('http://localhost:8000/api/taskList', listTaskForm)
        .then(res => {
          setTaskList([...taskLists, { topic, id: res.data.id }]); // Ajoute la nouvelle task list à l'état
          resetForm(); // Réinitialise le formulaire après l'ajout
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const deleteTaskList = (id) => {
    axios.delete(`http://localhost:8000/api/taskList/${id}`)
      .then(() => {
        // Met à jour l'état pour retirer la tâche supprimée
        setTaskList(taskLists.filter(taskList => taskList.id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editTaskList = (taskList) => {
    setEditingId(taskList.id); // Définit l'ID de la tâche à mettre à jour
    setTopic(taskList.topic); // Remplit le champ avec le sujet de la tâche
  };

  const resetForm = () => {
    setTopic('');
    setEditingId(null); // Réinitialise l'ID d'édition
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/taskList')
      .then(res => {
        setTaskList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className='container'>
      <h2 className="text-center">Liste des "TaskList"</h2> {/* En-tête pour la liste */}
      <form className='form-group' onSubmit={saveTaskList}>
        <div className='row'>
          <div className='md-12'>
            <label htmlFor='topic'>Topic:</label>
            <input
              className='form-control'
              placeholder='ajouter topic ici...'
              onChange={(e) => setTopic(e.target.value)} // Met à jour le topic
              value={topic}
            />
          </div>
        </div>
        <br />
        <div className='mt-10'>
          <button type='submit' className='btn btn-primary '>
            {editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>
      </form>
      <br />
      <ul className="list-group list-group-numbered">
        {
          taskLists.map((taskList) => (
            <li key={taskList.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => editTaskList(taskList)} // Mettre à jour le sujet en cliquant
              >
                {taskList.topic}
              </span>
              <span
                className="pointer"
                onClick={() => deleteTaskList(taskList.id)}>
                <FontAwesomeIcon icon={faTrash} /> 
              </span>

            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default TaskList;
