/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   useEffect(() => {
//     if (!user) {
//       const {data} = axios.get("/profile").then(({data}) => {
//         setUser(data);
//         setReady(true);
//       });
      
//     }
//   }, []);
  
//   return (
//     <UserContext.Provider value={{ user, setUser, ready}}>
//       {children}
//     </UserContext.Provider>
//   );
// }


import  { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem("loggedAnonUser");
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON);
    //   setUser(user);
    //   setReady(true);
    // }
    if (!user){
      axios.get("/profile").then(({data}) => {
        setUser(data);
        setReady(true);
      });
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, ready, setUser}}>
      {children}
    </UserContext.Provider>
  );
}


