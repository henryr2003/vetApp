import { useEffect, useState } from 'react';
import {useAuth} from "../hooks/useAuth"
import {useData} from "../hooks/useData"
import {Link} from "react-router-dom"
import amvcLogo from "../img/amvcLogo.webp"
import AccountLogo from "../img/accountLogo.svg?react"
import CatIcon from "../img/cat.svg?react"
import DogIcon from "../img/dog.svg?react"
import OtherIcon from "../img/otherIcon.svg?react"
import "../styles/Home.css"
import AddPetForm from './AddPetForm';
import EditPetForm from './EditPetForm';
import CheckPet from "./CheckPet";



function Home() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', breed: '' });
  const [isTabOpen, setTab] = useState(false);
  const [isAddPetOpen, setAdd] = useState(false);
  const {user, logout } = useAuth();
    // const user = true;
  const {getData, addData, editData, deleteData} = useData();

  const [editForm, setEditForm] = useState({name: "", type: "", breed: "", status: "", estimateMinutes: "00", estimateHours: "00"})
  const [isEditOpen, setEditOpen] = useState(false);

  const [isCheckOpen, setCheck] = useState(false);
  const [currentSelectedPet, setCurrentSelectedPet] = useState({});

  const getAndSetPets = async () => {
    const { data, error } = await getData();
    if (error) {
      console.error("Failed to fetch data after add:", error);
      return;
    }
    setPets(data);
  };

  useEffect( () => {
      const getPets = async () => {
        const {data, error} = await getData() 
        if(error){
          console.error("Failed to fetch data", error)
        }
        else{
          console.log(`getting data: ${data}`);
          console.log(data);
          setPets(data);
        }
      }
      getPets();


      const interval = setInterval(() => {
    getPets(); // refetch updated pet list
  }, 30000); // 30 seconds
      return () => clearInterval(interval); // cleanup


  }, []) 
  
  console.log("using auth");

  // Load pets from backend
const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('adding pet');

    if(form.name && form.type){
      const {data, error} = await addData(form.name, form.type, form.breed, );
    if(error){
      console.error(error)
      return
    }
    if(data) {
      setPets(prev => [...prev,data]);
      console.log('data from adding: ', data);
    }

    
    

    setForm({ name: '', type: '', breed: '' });
    toggleAddPet();

    }
    else{
      alert("Fill out all forms please")
    }
}

const handleEdit = async (e, id) => {

  e.preventDefault();
  console.log("edit", editForm.id);

  console.log(editForm);
  const combinedEstimate = editForm.estimateHours + ":" + editForm.estimateMinutes;
  const newForm = {...editForm, estimate: combinedEstimate}
  delete newForm.estimateHours;
  delete newForm.estimateMinutes;

  const {data, error} = await editData(editForm.id, newForm)

  if(error){
    console.error(error);
    return
  }

  await getAndSetPets();

  toggleEdit();




}

const handleDelete = async (id) => {

  console.log("pets: ", pets)
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
    

     try {
    await logout();
  } catch (error) {
    alert("Unable to logout: " + error.message);
  }
  }

function toggleTab() {
  setTab(prev => !prev);
  console.log("changing tab");
  
}

function toggleAddPet() {
  
  setAdd(prev => !prev);
  
  console.log("adding pet maybe");
}


function toggleEdit(id){
    setEditOpen(prev => !prev)

    if(id == -1) return;
  
    console.log("selected ID: ", id)
    const currentPet = pets.find(pet => pet.id === id);
   

    if (!currentPet) {
    console.warn("No pet found with ID:", id);
    return;
    }

    if(currentPet.estimate){
      
      const [hours, minutes] = currentPet.estimate.split(":");
      console.log("hours: ", hours)
      console.log("minutes: ", minutes);
      setEditForm({...currentPet, estimateHours: hours, estimateMinutes: minutes})
    }
    else{
      console.log("NO TIME");
      setEditForm({...currentPet, estimateMinutes: "00", estimateHours: "01", amPM: "AM"})
    }

    
    

    
    
    

    
}

function toggleCheck(id){

    const currentPet = pets.filter(pet => pet.id === id)[0];

    console.log("currentPet: ", currentPet);
    console.log("isCheckOpen: ", isCheckOpen)
    setCheck(prev => !prev);

    setCurrentSelectedPet(currentPet);



}

function clearForm(){
  setForm({ name: '', type: '', breed: '' })
}

  return (
    <>

    <div className={`account-tab ${isTabOpen ?  "open" : ""}`} > 
          <div className='closeTab' onClick={toggleTab}>
            X
          </div>
          {!user && <Link className="login" to="/login"> Login </Link> }

          {user && <div className="login" onClick={() => {handleLogOut(); toggleTab()}}> Log Out </div>}
          
    </div>
    
    <div className="mainContainer" onClick={isTabOpen ? toggleTab : undefined} >

      <div className='header'> 

        <div className='navBar'>


        </div>

        <img className="headerLogo" src= {amvcLogo} />

        <AccountLogo className="account" onClick={toggleTab}/>

        
      </div>

      <h1>Waitlist</h1>

      
      {/*  Only show add Pet for those logged in */ }

      {user && 
      
      <>
      
    {!isAddPetOpen ? <div className='addPet' onClick={toggleAddPet}> + Add Pet</div> : undefined }
    
    <AddPetForm 
      form={form}
      setForm={setForm}
      isAddPetOpen={isAddPetOpen}
      toggleAddPet={toggleAddPet}
      clearForm={clearForm}
      handleSubmit={handleSubmit}
    />

    <EditPetForm
      editForm = {editForm}
      setEditForm = {setEditForm}
      isEditOpen = {isEditOpen}
      toggleEdit = {toggleEdit}
      handleEdit={handleEdit}

    />
    
   
      </>
    }

     <CheckPet 

      toggleCheck = {toggleCheck}
      currentSelectedPet = {currentSelectedPet}
      isCheckOpen = {isCheckOpen}

    />
      
      <ul className='petContainer'>
        {pets.map((pet, index) => (
          
          <>
          
         
          {index == 0 ?
            <h2 key={pet.id + 1}> Currently Attending</h2>

            : index == 1 ? <h2 key={pet.id + 1}> Waiting . . .</h2> : undefined
          }
          <li onClick={() => toggleCheck(pet.id)} key={pet.id} className={`petCard ${!user ? "petCardNoUser" : ""} ${index != 0 ? "normalCard" : ""}`}>
            

              <div className="topRowMainCard"> 
                <h3>{pet.name[0].toUpperCase() + pet.name.slice(1)} </h3> 

                {pet.type == "Dog" ? <DogIcon className="dogIcon"/> : pet.type == "Cat" ? <CatIcon className="dogIcon" /> : <OtherIcon className="otherIcon" />}
              </div>
              {pet.breed && <div className='middleRowMainCard'> {pet.breed[0].toUpperCase() + pet.breed.slice(1)}</div>
}
              {user && <div className='buttonContainer'>
              
              <button onClick={(e) => { 
                e.stopPropagation();
                toggleEdit(pet.id)}} className="editButton"> Edit</button>

              <button className='deleteButton'  onClick={(e) => { 
                e.stopPropagation();
                handleDelete(pet.id)}}> Delete </button>
              
              
              </div>
              }
                
           
          
          </li>

           </>
          
          
          
        ))}
      </ul>
      
    </div>

    </>
  );
}

export default Home;
