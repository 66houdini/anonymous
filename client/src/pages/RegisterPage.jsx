import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"



export default function RegisterPage(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function registerUser(event){
        event.preventDefault();
        try {
            await axios.post("/users/register", {username, email, password});
            alert("User registered");
        } catch (err) {
            alert("registration failed")
        }   
    }
    return (
        <>
        <h1 className=" text-2xl font-semibold text-gray-500 hover:text-white">Register</h1>
        <form className="grid text-2xl font-medium" onSubmit={registerUser}>
            <label className="" htmlFor="username">Username</label>
            <input
            className=" mb-2"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
            className=" mb-2 text-black"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
            className=" text-black"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className=" italic" type="submit">Register</button>
            <div className=" text-gray-500 ">
              Already a member?
            <Link className="hover:text-white" to="/login">Login</Link>   
            </div>
           
        </form>
        </>
    )
}