import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext} from "react";

export default function IndexPage() {
  const { user, setUser, ready } = useContext(UserContext);
  // useEffect(() => {
  //   const loggedAnonUser = window.localStorage.getItem("loggedAnonUser");
  //   if (loggedAnonUser) {
  //     const user = JSON.parse(loggedAnonUser);
  //     setUser(user);
      
  //   }
  // }, []);

  if (!ready) {
    return "Loading ...."
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  
  if (!user) {
    return (
      <div className=" text-2xl font-medium">
        <div>Send secret anonymous messages online</div>
        <div className=" flex items-center justify-center mt-4">
          <Link to={"/register"} className="px-4 py-1 m-2 bg-purple-700 rounded-md">Sign Up</Link>
        <Link to={"/login"} className="px-4 py-1 bg-pink-600 rounded-md">Log In</Link>
        </div>
        
      </div>
    );
  }
  async function logout() {
    window.localStorage.clear();
    setUser(null);
  }
  return (
    <>
    <div>
        <div>Welcome {user.username}</div>
      <button onClick={logout}>Logout</button>
    </div>
    <div>
        <Link to={"/messages"}>MESSAGES</Link>
        
    </div>
      
    </>
  );
}
