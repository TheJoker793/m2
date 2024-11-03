import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AddTask() {
    const [taskLists, setTaskList] = useState([]);
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(''); // Utilisez useState pour initialiser correctement deadline
    const [taskListId, setTaskListId] = useState('');
    const [description, setDescription] = useState(''); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/taskList')
            .then(res => setTaskList(res.data))
            .catch(err => {
                console.log(err);
            });
    }, []); 
    const resetForm=()=>{
        setTitle('');
        setDeadline('');
        setDescription('');
        setTaskListId('')
    }
    const saveTask = (e) => {
        e.preventDefault();
        const formTask={
            title:title,
            deadline:deadline,
            completed:false,
            description:description,
            task_list_id :taskListId
        } 
        axios.post('http://localhost:8000/api/tasks',formTask)
            .then(
                (res)=>{
                    resetForm();
                    console.log(res.data)
                }
                
            )
            .catch()
    };

    return (
        <div className='container'>
            <h1 className='text-center'>Ajouter task</h1>
            <form className='form-group' onSubmit={saveTask}>
                <div className='row'>
                    <div className='col col-md-4'>
                        <label htmlFor='title'>Title</label>
                        <input
                            className='form-control'
                            placeholder='add title here...'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className='col col-md-4'>
                        <label>Deadline</label>
                        <input
                            type='date'
                            className='form-control'
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <div className='col col-md-4'>
                        <label>Topic</label>
                        <select
                            className="form-select"
                            value={taskListId}
                            onChange={(e) => setTaskListId(e.target.value)}
                        >
                            <option value="">Selectionner le topic</option>
                            {taskLists.map((taskList) => (
                                <option key={taskList.id} value={taskList.id}>
                                    {taskList.topic}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <label htmlFor='description'>Description</label>
                    <textarea
                        className='form-control'
                        placeholder='add description here...'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <br />
                <button className='btn btn-primary' type='submit'>Ajouter</button>
            </form>
        </div>
    );
}

export default AddTask;
