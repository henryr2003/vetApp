import { useEffect, useState } from 'react';
import {useAuth} from "../hooks/useAuth"
import {useData} from "../hooks/useData"
import {Link} from "react-router-dom"
import amvcLogo from "../img/amvcLogo.webp"
// import {ReactComponent as MyIcon} from "../img/accountLogo.svg"

import "../styles/Home.css"

function Home() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', age: '' });
  const [isTabOpen, setTab] = useState(false);
  
  const {user, logout } = useAuth();
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
    console.log('adding pet');
    const {data, error, status} = await addData(form.name, form.type, form.age);
    if(error){
      console.error(error)
      return
    }
    if(data) console.log('data from adding: ', data);
    
    setPets( (prevPets) => [...prevPets, {name: form.name, type: form.type, age: form.age}]);
    setForm({ name: '', type: '', age: '' });
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

const handleLogOut = async () => {

    console.log("logout");
    

    const {error} = await logout();

    if(error){
      alert("Unable to logout: ", error);
    }
  }

function toggleTab() {
  setTab(prev => !prev);
  console.log("changing tab");
  
}
  return (
    <>

    <div className={`account-tab ${isTabOpen ?  "open" : ""}`} > 
          <div className='closeTab' onClick={toggleTab}>
            X
          </div>
          {!user && <Link className="login" to="/login"> Login </Link> }

          {user && <button onClick={() => {handleLogOut(); toggleTab()}}> Log Out </button>}
          
        </div>
    
    <div className="mainContainer" onClick={isTabOpen ? toggleTab : undefined} >

      <div className='header'> 

        <div className='navBar'>


        </div>

        <img className="headerLogo" src= {amvcLogo} />


        <svg onClick={toggleTab} className="account" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2094A1"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>

        
      </div>

      <h1>Waitlist</h1>

      
      
      {user && <>
      
        

    <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        <button type="submit">Add Pet</button>
      </form>
      </>
    
    
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

    </>
  );
}

export default Home;
