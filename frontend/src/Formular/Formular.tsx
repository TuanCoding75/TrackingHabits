// Imports ...
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';

interface Task {
    id : number;
    title: string;
    done: boolean;
}

interface FormularProps {
    listTask : Task[];
    onAdd : (newTask : Task) => void ;
}

export default function Formular({listTask, onAdd} : FormularProps) {
    
    
    const [title, setTitle] = useState(""); 
    const [done, setDone] = useState(false); 


    const handleSubmit = () => {
        fetch("http://localhost:8080/api/tasks", 
            {
                method:"POST",
                headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({
                            "title": title,
                            "done": done
                        })
            })
        .then((response) => response.json())
        .then((newTask) => onAdd(newTask))
        
            setDone(false);
        setTitle("");

    };
console.log(done);
    return (
        <>
            <h2>Formulaire :</h2>

                    <TextField label="title" value={title} onChange={(e)=>{setTitle(e.target.value)}  }/>
                        Done :<Checkbox checked={done} onChange={(e)=> setDone(e.target.checked)} />
                    <Button variant='contained' onClick={handleSubmit}>Valider</Button>
        </>
    )
}

