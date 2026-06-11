
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

interface Task {
    id : number;
    title: string;
    done: boolean;
}

interface TaskListProps {
    listTask : Task[];
    onToogle: (id : number) => void;
    onDelete: (id : number) => void;
}

export default function TaskList ({ listTask, onToogle, onDelete } : TaskListProps) {
    
    return (
        <>
            <div>
                <h2>Mes tâches : </h2>
                {listTask.map( (task)=> (
                    <p key={task.id}>
                        {task.title}
                        <Button variant='contained' onClick={()=> onToogle(task.id)} >{task.done ? "Undone": "Done" }</Button>
                        <Button variant='contained' onClick={()=> onDelete(task.id)} >DELETE</Button>
                    </p>
                ))}
            </div>
        </>
    );
}

