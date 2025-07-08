import {useState, useEffect} from 'react';
import List from './components/List';
import Icon from './components/Icon';
import { v4 as uuidv4 } from 'uuid';

function Main(){

    const [tasks,setTasks] = useState(()=>{
        const storedTodos = localStorage.getItem('tasks');
        if(!storedTodos){
            return []
        } else {
            return JSON.parse(storedTodos);
        }
    });
    const [tasksTitle, setTasksTitle] = useState('');

    useEffect(()=>{
        localStorage.setItem('tasks',JSON.stringify(tasks));
    },[tasks])

    const addTask = (event) => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));

        if (tasksTitle.trim() === '') return;

        const newTask = {
            id: uuidv4(),
            title: tasksTitle,
            status: false
        };

        const updatedTasks = [...storedTodos, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasksTitle('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    };

    const date = new Date();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return (
        <div className='container'>
            <h1>Note your tasks</h1>
            <span>{month + ' ' + day + ', ' + year}</span>
            <div className='input-filed'>
                <input type='text' 
                value={tasksTitle}
                onChange={event => setTasksTitle(event.target.value)}
                onKeyDown={handleKeyDown}
                /> 
                <button onClick={addTask} className='icon-button'>
                    <Icon type="add"/>
                </button>
                <label>Task name</label>
            </div>
            <List tasks={tasks} />
        </div>
    );
}

export default Main;