import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


const AppContext = createContext()

export const AppContextProvider = ({children}) =>{


    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [DrawerOpen , setDrawerOpen] = useState(true);
    const [MbDrawerOpen, setMbDrawerOpen] = useState(false)
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));

    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/login", { email, password }, { withCredentials: true });
        return res.data;
    };

    const fetchUser = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/home", { withCredentials: true });
            setUser(res.data.details);
            console.log(res.data.details);
        }catch(err){
            console.log(err.msg);
        }
        
    }

    const createNewChat = async () => {
        try{
            await axios.get("http://localhost:5000/api/createChat", { withCredentials: true } );
            await fetchUsersChats();
            setMbDrawerOpen(false);
        }catch(err){
            console.log(err.msg);
        }
    }

    const fetchUsersChats = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/getChat",{ withCredentials: true });
            setChats(res.data.chats);
            if(res.data.chats.length === 0){
                await createNewChat();
                return fetchUsersChats();
            }
            else{
                setSelectedChat(res.data.chats[0]);
            }
        }catch(err){
            console.log(err.msg);
        }
    }

    const chatPost = async (chatid, message) => {
        try{
            const res = await axios.post("http://localhost:5000/api/aichat", {chatid, message}, { withCredentials: true })
            return res.data;
        }catch(err){
            console.log(err)
        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.log("Logout failed:", err);
        }
    }

    useEffect(() => {
        if(user){
            fetchUsersChats();
        }else{
            setChats([]);
            setSelectedChat(null)
        }
    },[user])


    useEffect(() => {
        fetchUser()
    }, [])
    

    const value = {
        navigate,
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        DrawerOpen,
        setDrawerOpen,
        login,
        createNewChat,
        fetchUsersChats,
        chatPost,
        isXs,
        MbDrawerOpen,
        setMbDrawerOpen,
        logout
    }

    return(
        <AppContext.Provider value={value} >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)