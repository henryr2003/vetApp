import { useEffect, useState } from 'react';
import {useAuth} from "../hooks/useAuth"
import {useData} from "../hooks/useData"

import {Link} from "react-router-dom"
function Home() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', age: '' });
  
  
  const {user} = useAuth();
    // const user = true;
  const {getData, addData, deleteData} = useData();

      
  useEffect( () => {
      const getPets = async () => {
        const {data, error} = await getData();
        console.log(data);
        if(error){
          console.error("Failed to fetch data", error)
        }
        else{
          console.log(`getting data: ${data}`);
          setPets(data);
        }
      }
      getPets();
  }, [])

  
  
  console.log("using auth");
  // Load pets from backend



const handleSubmit = async (e) => {
    e.preventDefault()
    const {data, error, status} = await addData(form.name, form.type, form.age);
    if(error){
      console.log(error)
    }
    if(data) console.log(data);
    if (status) {
      console.log(status)
      setPets( (prevPets) => [...prevPets, {name: form.name, type: form.type, age: form.age}]);
    }
}

const handleDelete = async (id) => {

  
  console.log("delete key: ", id)

  const {data, error} = await deleteData(id);
  if(error){
    console.error("Error deleting data: ", error)

  }
  else{
    console.log("deleted data response: ", data)
    setPets( prevPets => prevPets.filter(pet => pet.id != id))          
  }

  
}
  return (

    <div>
      <h1>Vet App</h1>

      {!user && <Link to="/login"> Login </Link> }
      
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
          <div>
              <li key={pet.id}>
              {pet.name} ({pet.type}) - Age: {pet.age}
              {user && <button className='deleteButton'  onClick={() => handleDelete(pet.id)}> Delete </button>}
            
          </li>
          
          </div>
          
          
          
        ))}
      </ul>
      
    </div>
  );
}

export default Home;
