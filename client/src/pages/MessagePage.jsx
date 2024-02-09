/* eslint-disable react/prop-types */
import axios from "axios";
import {  useState } from "react";
import { useParams } from "react-router-dom";

const Notification = ({state}) => {
    if (state) {
        return (
        <div className="text-green-600 p-2">Message sent</div>
        )
}
    
}

export default function MessagePage() {
    const { username } = useParams();
    const [message, setMessage] = useState("");
    const [notification, setNotification] = useState(false);
    
    async function sendMessage(event) {
        event.preventDefault();
        try {
            await axios.post(`/${username}`, {text:message});

            setMessage("");
            setNotification(true);
            setTimeout(() => {
                setNotification(false)
            }, 3000)
        } catch (err) {
            alert("Message failed to send");
        }
    }
    
    


    return (
        <div >
        <h1 className=" text-gray-500 my-3 text-xs">write an anonymous message for {username}</h1>
        <Notification state={notification}/>
        <form onSubmit={sendMessage}>
            <div className="grid">
                <textarea
            className="p-2 rounded-md mb-2 text-black w-96"
                type="text"
                id="message"
                placeholder="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button className=" bg-green-600" type="submit">Send</button>
            </div>
            
        </form>
        </div>
    );
}