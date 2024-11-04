import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

function CardTask({ task, deleteTask, updateTask }) { 
    const { id, title, deadline, taskListTopic, description, completed } = task;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDeadline, setEditDeadline] = useState(deadline);
    const [editDescription, setEditDescription] = useState(description);
    const [isCompleted, setCompleted] = useState(completed);

    const handleCheckboxChange = () => {
        if (isEditing) {
            setCompleted(!isCompleted);
        }
    };

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title: editTitle,
            deadline: editDeadline,
            description: editDescription,
            completed: isCompleted
        };
        updateTask(id, updatedTask); 
        setIsEditing(false); 
    };

    return (
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    {isEditing ? (
                        <input
                            className="form-control"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    ) : (
                        <h5 className="card-title">{title}</h5>
                    )}
                    <div>
                        <button 
                            className="btn btn-link text-success" 
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                            title={isEditing ? "Enregistrer les modifications" : "Modifier la tâche"}
                            style={{ cursor: 'pointer' }}
                        >
                            <FontAwesomeIcon icon={isEditing ? faSave : faEdit} />
                        </button>
                        <button 
                            className="btn btn-link text-danger" 
                            onClick={() => deleteTask(id)} 
                            title="Supprimer la tâche"
                            style={{ cursor: 'pointer' }}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                {isEditing ? (
                    <>
                        <textarea
                            className="form-control mt-2"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <input
                            type="date"
                            className="form-control mt-2"
                            value={editDeadline}
                            onChange={(e) => setEditDeadline(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h6 className="card-subtitle mb-2 text-muted">Topic: {taskListTopic}</h6>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}
                        </p>
                    </>
                )}
                <div className="d-flex align-items-center">
                    <label className="mr-2"><strong>Status:</strong></label>
                    <input 
                        type="checkbox" 
                        checked={isCompleted} 
                        onChange={handleCheckboxChange} 
                        disabled={!isEditing} // Désactiver si non en mode édition
                        style={{
                            cursor: isEditing ? 'pointer' : 'not-allowed',
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
