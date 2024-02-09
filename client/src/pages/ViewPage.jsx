import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function ViewPage() {
    const {user, ready} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [textReady, setTextReady] = useState(false);
    
    useEffect(() => {
        if ( ready && user) {
            axios.get(`/messages/${user.username}`).then(({data}) => {
                setMessages(data);
                setTextReady(true);
            })
        }
    }, [ready, user])

    if (!ready) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
         <div>
            <h1 className="py-3 text-3xl font-bold text-gray-500 hover:text-white">MY MESSAGES</h1>
            {!textReady && <div>Loading...</div>}
            {messages.map((message) => (
            <div key={message._id} className=" border border-green-600 rounded-md p-5 mb-2">
                <h1 className=" text-sm">message:</h1>
                <div className="text-xl mb-2">{message.text}</div>
                <h1 className=" text-sm">-Anonymous [{new Date(message?.createdAt).toLocaleString()}]</h1>
            </div>
        ))}
        </div>
        
        </>
       
    )
}