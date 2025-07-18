import { useEffect, useState } from 'react';
import {useAuth} from "../hooks/useAuth"
import {Link} from "react-router-dom"
function Home() {
  const [pets, setPets] = useState([{name: "Chichi", type: "Chinchilla", age: "4"}]);
  const [form, setForm] = useState({ name: '', type: '', age: '' });
  const API = import.meta.env.VITE_API_URL;
  
  const {user} = useAuth();
    // const user = true;

    console.log("nigga");
  // Load pets from backend

//   useEffect(() => {
//   fetch(`${API}/pets`)
//   .then(res => {
//     const contentType = res.headers.get("content-type");
//     if (!res.ok || !contentType.includes("application/json")) {
//       throw new Error("Invalid JSON response");
//     }
//     return res.json();
//   })
//   .then(setPets)
//   .catch(err => {
//     console.error("Error fetching pets:", err);
//   });

// }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch(`${API}/pets`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })
//       .then(res => res.json())
//       .then(newPet => {
//         setPets([...pets, newPet]);
//         setForm({ name: '', type: '', age: '' });
//       });
//   };

//   const handleDelete = (id) => {
//     fetch(`${API}/pets/${id}`, {
//       method: 'DELETE',
//     })

//     .then(res => {
//       if(!res.ok) throw new Error ("Could not delete");

//       setPets(pets.filter(pet => pet._id !== id));

//     })

//     .catch(err => {
//       console.log(err);
//       alert("could not delete pet");

//     })
//   }


const handleSubmit = (e) => {
    
    console.log("hello you");
}
  return (

    <div>
      <h1>Vet App</h1>
      <Link to="/login"> Login </Link>
      {user &&
    
    <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        <button type="submit">Add Pet</button>
      </form>
    
    }
      
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            {pet.name} ({pet.type}) - Age: {pet.age}
            {user && <button className='deleteButton'  onClick={() => handleDelete(pet._id)}> Delete </button>}
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
