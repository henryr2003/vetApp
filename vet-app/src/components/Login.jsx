


import {useAuth} from "../hooks/useAuth"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useAuth()
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return alert('Both fields are required');

        const { error } = await login(email, password);
        if (error) {
            alert(error.message || 'Sign Up Failed');
            return;
        }

        navigate('/');
    }

    return (
        <>
            <h1> Login </h1> 

            <form onSubmit={handleSubmit}> 

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit"> Submit </button>
            </form>    

            <h1> No account? Click <Link to="/signup"> here</Link> to sign up </h1>

            
        </>
    )
}

export default Login