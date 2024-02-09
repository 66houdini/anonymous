import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function LoginPage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    async function loginUser(event){
        event.preventDefault();
        try {
            const {data} = await axios.post("/login", {username, password});
            window.localStorage.setItem("loggedAnonUser", JSON.stringify(data))
            console.log(data)
            setUser(data);            
            setRedirect(true);
        } catch (err) {
            alert("login failed")
        }   
    }
    if (redirect) {
        return <Navigate to="/" />
    }
    return (
        <>
        <h1 className="text-sm font-semibold text-gray-500 hover:text-white">let the fun begin</h1>
        <form className="grid text-2xl font-medium" onSubmit={loginUser}>
            
            <input
            className=" m-2 p-1 rounded-md text-black "
                type="text"
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className="m-2 p-1 rounded-md text-black"
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <div className="flex text-gray-500">
                <div className="mr-2">Not a member?</div>
                
            <Link className=" hover:text-white" to="/register">Register</Link>
            </div>
            
        </form>
        </>
    )
}