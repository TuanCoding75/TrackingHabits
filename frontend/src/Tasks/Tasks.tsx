import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TaskList from '../TaskList/TaskList';
import Formular from '../Formular/Formular';

interface Task {
    id : number;
    title: string;
    done: boolean;
}



export default function Tasks () {
    
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
            fetch("http://localhost:8080/api/tasks")
            .then((response)=>response.json())
            .then((data) => setTasks(data))
            .catch((error)=> console.error(error));
    }, []);
        
    const handleSubmit = (id : number) => {
        // indiquer que c'est un PATCH 
        fetch("http://localhost:8080/api/tasks/"+id+"/done", {method:"PATCH"})
        .then(() => setTasks(tasks.map((task) => task.id === id ? {...task, done : !task.done} : task)))
        .catch((error)=>console.error(error))
    };

    const handleDelete = (id : number) => {
        // indiquer que c'est un PATCH 
        fetch("http://localhost:8080/api/tasks/"+id, {method:"DELETE"})
        .then(() => setTasks(tasks.filter((task) => task.id !== id )))
        .catch((error)=>console.error(error))
    };

    const handleAdd = (newTask: Task) => {
        setTasks([...tasks, newTask])
    }
    
    console.log(tasks);
    
    return (
        <>
            <div>
                <Formular listTask={tasks} onAdd={handleAdd}/>
                <TaskList listTask={tasks} onToogle={handleSubmit} onDelete={handleDelete}/>
            </div>
        </>

       
    );


}