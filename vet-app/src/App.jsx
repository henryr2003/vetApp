import { useEffect, useState } from 'react';

function App() {
  const [pets, setPets] = useState([]);
  const [form, setForm] = useState({ name: '', type: '', age: '' });
  const API = import.meta.env.VITE_API_URL;
  // Load pets from backend

  useEffect(() => {
  fetch(`${API}/pets`)
    .then(res => res.json())
    .then(setPets);
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/pets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(newPet => {
        setPets([...pets, newPet]);
        setForm({ name: '', type: '', age: '' });
      });
  };

  return (
    <div>
      <h1>Vet App</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
        <input placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        <button type="submit">Add Pet</button>
      </form>
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>{pet.name} ({pet.type}) - Age: {pet.age}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
