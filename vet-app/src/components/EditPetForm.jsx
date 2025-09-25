import "../styles/editPetForm.css"

import "../styles/Home.css"

const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

function EditPetForm({editForm, setEditForm, toggleEdit, handleEdit, isEditOpen}){


    const hours = range(1, 12);
    const minutes = range(0, 59);

    let estimateHours = editForm.estimateHours;
    let estimateMinutes = editForm.estimateMinutes;


    console.log("estimateHours: ", estimateHours);
    console.log("estimateMinutes: ", estimateMinutes);
    
    console.log("editForm on Open: ", editForm);
    return (

        <>

        {isEditOpen && 

      <div className="mainEditContainer">


      
      <form className= {`addPetForm ${isEditOpen ? "open" : ""}`} onSubmit={(e) => handleEdit(e, editForm.id)}>
      <div className='closeForm' onClick={() => toggleEdit(-1)}> X </div>

        <input placeholder="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />



        <div className="petTypeSelector">

          <label className={`option ${editForm.type == "Dog" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Dog"
              checked={editForm.type === "Dog"}
              onChange={() => {
                setEditForm({...editForm, type: "Dog"}); 
                console.log("currentEditForm: ", editForm);}}

            />

            Dog
          </label>

          <label className={`option ${editForm.type == "Cat" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Cat"
              checked={editForm.type === "Cat"}
              onChange={() => setEditForm({...editForm, type: "Cat"})}

            />

            Cat
          </label>


          <label className={`option ${editForm.type == "Other" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Other"
              checked={editForm.type === "Other"}
              onChange={() => setEditForm({...editForm, type: "Other"})}

            />

            Other
          </label>


        </div>



        <input placeholder="Breed (Optional)" value={editForm.breed} onChange={e => setEditForm({ ...editForm, breed: e.target.value })} />


        <div className="petTypeSelector">

          <label className={`option ${editForm.status == null || editForm.status == "Checked In" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="status"
              value="Checked In"
              checked={editForm.status === "Checked In"}
              onChange={() => setEditForm({...editForm, status: "Checked In"})}

            />

            Checked In
          </label>

          <label className={`option ${editForm.status == "In Surgery" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Cat"
              checked={editForm.status === "In Surgery"}
              onChange={() => setEditForm({...editForm, status: "In Surgery"})}

            />

            In Surgery
          </label>


          <label className={`option ${editForm.status == "Ready" ? "selected" : ""}`}>


            <input 

              type="radio" 
              name="petType"
              value="Other"
              checked={editForm.status === "Ready"}
              onChange={() => setEditForm({...editForm, status: "Ready"})}

            />

            Ready
          </label>


        </div>
        
        
        <div className="timeTitle"> Estimated Finish Time</div>
        
        <div className="time-picker">
            <select
                value={parseInt(editForm.estimateHours)}
                onChange={(e) => setEditForm({...editForm, estimateHours: e.target.value})}
            >
                {hours.map((h) => (
                <option key={h} value={h}>
                    {h}
                </option>
                ))}
            </select>

            <span>:</span>
            
            
            <select
              value={parseInt(editForm.estimateMinutes)}
              onChange={(e) => setEditForm({...editForm, estimateMinutes: e.target.value})}
            > 
                {minutes.map((m) => (
                <option key={m} value={m}>
                    {m.toString().padStart(2, '0')}
                </option>
                ))}
            </select>

            <select
                value={editForm.amPM}
                onChange={(e) => setEditForm({ ...editForm, amPM: e.target.value })}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
          </div>

        <button type="submit" >Save Changes</button>

    </form>

    </div>
}
        
        </>
    )
}

export default EditPetForm;