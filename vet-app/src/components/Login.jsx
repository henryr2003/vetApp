

import {Link} from "react-router-dom" 

const handleSubmit = () => {
    console.log()
}
const Login = () => {
    

    return (
        <>
            <h1> Login </h1> 

            <form onSubmit={handleSubmit}> 

                <input placeholder="Username" /> 
                <input placeholder="Password" />
            </form>    

            <h1> If you don't have an account you can sign up <Link to="/signup"> here</Link> </h1>   
        </>
    )
}

export default Login