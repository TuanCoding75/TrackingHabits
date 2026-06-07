// Imports ...
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useState } from 'react';


export default function Formular() {
    
    const [title, setTitle] = useState(""); 
    const [price, setPrice] = useState(0); 

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({title, price}); 
        setPrice(0);
        setTitle("");
    };

    
    return (
        <>
            Formulaire :
                <form onSubmit={handleSubmit}>
                    <TextField label="title" value={title} onChange={(e)=>{setTitle(e.target.value)}  }/>
                    <TextField type='number' label="price" value={price} onChange={(e)=>{setPrice(Number(e.target.value))}}/>
                </form>
                {/* <Button variant='contained' onClick={onSubmit}>Valider</Button> */}
            {"Titre tapé : "+ title}
        </>
    )
}

