

import "../styles/Home.css"


function AddPetForm({isAddPetOpen, toggleAddPet, clearForm, form, setForm, handleSubmit}){



    console.log("form: ", form);

    return (

        <>

        { isAddPetOpen && 



        
        <form className= {`addPetForm ${isAddPetOpen ? "open" : ""}`} onSubmit={handleSubmit}>
      <div className='closeForm' onClick={() => {toggleAddPet(); clearForm()}}> X </div>

        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />



        <div className="petTypeSelector">

          <label className={`option ${form.type == "Dog" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Dog"
              checked={form.type === "Dog"}
              onChange={() => setForm({...form, type: "Dog"})}

            />

            Dog
          </label>

          <label className={`option ${form.type == "Cat" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Cat"
              checked={form.type === "Cat"}
              onChange={() => setForm({...form, type: "Cat"})}

            />

            Cat
          </label>


          <label className={`option ${form.type == "Other" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Other"
              checked={form.type === "Other"}
              onChange={() => setForm({...form, type: "Other"})}

            />

            Other
          </label>


        </div>



        <input placeholder="Breed (Optional)" value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })} />
        <button type="submit" >Check In</button>

    </form>
    
        
}
        </>
    )
}



export default AddPetForm;