import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import MessagePage from "./pages/MessagePage";
import ViewPage from "./pages/ViewPage";


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/:username" element={<MessagePage/>} />
            <Route path="/messages" element={<ViewPage/>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
