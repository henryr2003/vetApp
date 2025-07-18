import {Link} from "react-router-dom"
const Error = () => {
    return (
        <>
            <h1> Oops! You are not logged in! </h1>

            <h2> Press <Link to="/login"> Here </Link> to login</h2> 
        </>
    )
}

export default Error;