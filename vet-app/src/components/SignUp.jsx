

import {useAuth} from "../hooks/useAuth"
import {useState} from "react"
import {useNavigate} from "react-router-dom"



const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signup} = useAuth();
    const navigate = useNavigate();


    console.log(email);
    console.log(password)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert('Both fields are required');

        const { error } = await signup(email, password);
        if (error) {
            alert(error.message || 'Sign Up Failed');
            return;
        }

        navigate('/');

}

    return (
        <>
            <h1> Sign up! </h1> 

            <form onSubmit={handleSubmit}> 

                <input type="email" value={email} placeholder="Email" onChange = {(e) => setEmail(e.target.value)}/> 
                <input type="password" value={password} placeholder="Password" onChange = {(e) => setPassword(e.target.value)}/>
                <button type="submit"> Submit</button>
            </form>        
        </>
    )
}

export default Signup