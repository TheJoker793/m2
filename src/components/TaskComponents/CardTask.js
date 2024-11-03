import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function CardTask({ task, deleteTask }) { // Recevez deleteTask en tant que prop
    const { title, deadline, taskListTopic, description, completed } = task;
    const [isCompleted, setCompleted] = useState(completed);

    const handleCheckboxChange = () => {
        setCompleted(!isCompleted);
    };

    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{title}</h5>
                    <button 
                        className="btn btn-link text-danger" 
                        onClick={() => deleteTask(task.id)} // Appel correct avec l'ID
                        title="Supprimer la tâche"
                        style={{ cursor: 'pointer' }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
                <h6 className="card-subtitle mb-2 text-muted">Topic: {taskListTopic}</h6>
                <p className="card-text">{description}</p>
                <p className="card-text">
                    <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
                </p>
                <div className="d-flex align-items-center">
                    <label className="mr-2"><strong>Status:</strong></label>
                    <input 
                        type="checkbox" 
                        checked={isCompleted} 
                        onChange={handleCheckboxChange} 
                        style={{
                            cursor: 'pointer',
                            accentColor: isCompleted ? 'green' : 'red',
                            width: '20px', 
                            height: '20px'
                        }}
                    />
                    <span className="ml-2" style={{ color: isCompleted ? 'green' : 'red' }}>
                        {isCompleted ? "Completed" : "In Progress"}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CardTask;
