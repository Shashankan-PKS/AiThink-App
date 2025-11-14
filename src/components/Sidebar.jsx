import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/Appcontext.jsx'
import { Button, Drawer, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import PanoramaIcon from '@mui/icons-material/Panorama';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { assets } from '../assets/assets.js';
import actionSidebar from '../assets/Vector.png';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";


const Sidebar = () => {

    const {chats,selectedChat, setSelectedChat, user, DrawerOpen, setDrawerOpen,navigate,createNewChat, fetchUsersChats, isXs, MbDrawerOpen, setMbDrawerOpen,} = useAppContext()
    const [search, setSearch] = useState("");

    const handleDrawerClose = () => {
        setDrawerOpen(false)
    }

    const handleDrawerMobileClose = () => {
        setMbDrawerOpen(false)
    }

    const deleteChat = async () => {
        const chatId = selectedChat?._id;
        try {
            const res = await axios.post("http://localhost:5000/api/deleteChat", {chatId}, { withCredentials: true });
            await fetchUsersChats();
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <>
            <Drawer variant= {isXs ? "temporary" : "permanent"}  
                onClose = {isXs ? handleDrawerMobileClose : handleDrawerClose}
                anchor="left" 
                open = {isXs ? MbDrawerOpen : DrawerOpen} 
                sx={{
                    position: isXs ? "absolute" : "relative",
                    width : DrawerOpen ? 300 : 80,
                    flexShrink : 0,
                    "& .MuiDrawer-paper": {
                        width : DrawerOpen ? 300 : 80,
                        backgroundColor: "rgba(235, 237, 241, 1)",
                        color : "rgba(25, 42, 86, 1)",
                        borderBottomRightRadius : "30px",
                        borderTopRightRadius : "30px",
                        overflow : "hidden", 
                        boxShadow: "rgba(36, 36, 36, 0.15) 0px 22px 20px 1px",
                        transition: 'width 0.3s ease-in-out',
                    }
                }}
                >
                <div className='flex flex-col justify-between h-screen min-w-60 p-5 transition-all duration-500 left-0  rounded-r-4xl bg-[#e3ebffff]'>
                    <div>
                    <div className='flex justify-between'>
                        {isXs ? (
                            <>
                                <IconButton disableRipple onClick={() => setMbDrawerOpen(false)}>
                                    <img src={actionSidebar} alt="" style={{ width: "24px", height: "18px" }} />
                                </IconButton>
                                <IconButton disableRipple>
                                    <SearchIcon sx={{color:'#4B0082'}} />
                                </IconButton>
                            </>
                        ) : DrawerOpen ? (
                        <>
                            <IconButton disableRipple onClick={() => setDrawerOpen(false)}>
                                <img src={actionSidebar} style={{ width : "20px"}} alt="" />
                            </IconButton>
                            <IconButton disableRipple>
                                <SearchIcon sx={{color:'#4B0082'}} />
                            </IconButton>
                        </>
                        ) : (
                        <IconButton disableRipple onClick={() => setDrawerOpen(true)}>
                            <img src={actionSidebar} style={{ width : "20px"}} alt="" />
                        </IconButton>
                        )}
                        
                    </div>

                    {isXs ? (
                        <div className='flex flex-col'>
                        <Button onClick={createNewChat} disableElevation disableRipple startIcon={<AddBoxOutlinedIcon />} sx={{ fontFamily : "Epilogue", textTransform : "capitalize", mt: "10px", borderRadius : "30px", color : "#4B0082",backgroundColor : "#e3ebffff"}}> 
                            New Chat
                        </Button>
                        <Button disableElevation disableRipple startIcon={<PanoramaIcon />} sx={{fontFamily : "Epilogue", textTransform : "capitalize",mt : "10px", borderRadius : "30px", color : "#4B0082",backgroundColor : "#e3ebffff"}}>
                            Media
                        </Button>
                        </div>
                    ) : DrawerOpen ? (
                        <div className='flex flex-col'>
                        <Button onClick={createNewChat} disableElevation disableRipple startIcon={<AddBoxOutlinedIcon />} sx={{ fontFamily : "Epilogue", textTransform : "capitalize", mt: "10px", borderRadius : "30px", color : "#4B0082",backgroundColor : "#e3ebffff"}}> 
                            New Chat
                        </Button>
                        <Button disableElevation disableRipple startIcon={<PanoramaIcon />} sx={{fontFamily : "Epilogue", textTransform : "capitalize",mt : "10px", borderRadius : "30px", color : "#4B0082",backgroundColor : "#e3ebffff"}}>
                            Media
                        </Button>
                        </div>
                    ): (
                        <div className='flex flex-col mt-4'>
                        <Tooltip title="New Chat" placement='right'>
                            <IconButton disableRipple sx={{ width : "50px"}}>
                                <AddBoxOutlinedIcon sx={{color:'#4B0082'}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Media" placement='right'>
                            <IconButton disableRipple sx={{ mt: "5px", width : "50px"}}>
                                <PanoramaIcon sx={{color:'#4B0082'}} />
                            </IconButton>
                        </Tooltip>
                        </div>
                    )}
                    {isXs ? (
                        <>
                        {chats.length > 0 && <p className='mt-4 font-[600] text-[20px] text-[#4B0082]'>Recent Chats</p>}
                        <div className="mt-2 overflow-y-auto max-h-[65vh] pr-1">
                            {
                            chats.filter((chat) => {
                                const content = chat?.messages?.[0]?.content || "";
                                const name = chat?.chatName || "";
                                return (
                                content.toLowerCase().includes(search.toLowerCase()) ||
                                name.toLowerCase().includes(search.toLowerCase())
                                );
                            }).map((chat) => (
                            <div onClick={() => {
                                navigate("/home");
                                setSelectedChat(chat);
                                setMbDrawerOpen(false);
                            }} key={chat._id} className='p-2 px-4 mt-1 rounded-md cursor-pointer flex justify-between group'>
                                <div>
                                <p className='truncate w-full text-[#4B0082]'> {chat.messages?.length > 0 ? chat.messages[0]?.content.slice(0,24) : chat.chatName}</p>
                                </div>
                                <span className='hidden group-hover:block w-4 cursor-pointer not-dark:invert'>
                                <IconButton onClick={deleteChat} disableRipple  sx={{ width : "20px", height : "20px"}}>
                                    <DeleteIcon fontSize="small" color="error"/>
                                </IconButton>
                                </span>
                            </div>
                            ))
                            }
                        </div>
                        </>
                        ) : DrawerOpen && 
                        <>
                        {chats.length > 0 && <p className='mt-4 font-[600] text-[20px] text-[#4B0082]'>Recent Chats</p>}
                        <div className="mt-2 overflow-y-auto max-h-[65vh] pr-1">
                            {
                            chats.filter((chat) => {
                                const content = chat?.messages?.[0]?.content || "";
                                const name = chat?.chatName || "";
                                return (
                                content.toLowerCase().includes(search.toLowerCase()) ||
                                name.toLowerCase().includes(search.toLowerCase())
                                );
                            }).map((chat) => (
                            <div onClick={() => {
                                navigate("/home");
                                setSelectedChat(chat);
                            }} key={chat._id} className='p-2 px-4 mt-1 rounded-md cursor-pointer flex justify-between group'>
                                <div>
                                <p className='truncate w-full text-[#4B0082]'> {chat.messages?.length > 0 ? chat.messages[0]?.content.slice(0,24) : chat.chatName}</p>
                                </div>
                                <span className='hidden group-hover:block w-4 cursor-pointer not-dark:invert'>
                                <IconButton onClick={deleteChat} disableRipple  sx={{ width : "20px", height : "20px"}}>
                                    <DeleteIcon fontSize="small" color="error"/>
                                </IconButton>
                                </span>
                            </div>
                            ))
                            }
                        </div>
                        </>
                    }
                    </div>
                    <div className='pb-1'>
                    {isXs ? (
                        <Button disableElevation disableRipple variant="contained" onClick={() => navigate("/settings")} startIcon={<SettingsIcon />} sx={{ 
                        textTransform : "capitalize",
                        width : "100%",
                        fontFamily : "Epilogue",
                        borderRadius : "30px",
                        backgroundColor : "rgba(25, 42, 86, 1)"
                        }}>
                        Settings & Help
                        </Button>
                    ) : DrawerOpen ? (
                        <Button disableElevation disableRipple variant="contained" onClick={() => navigate("/settings")} startIcon={<SettingsIcon />} sx={{ 
                        textTransform : "capitalize",
                        width : "100%",
                        fontFamily : "Epilogue",
                        borderRadius : "30px",
                        backgroundColor : "#4B0082"
                        }}>
                        Settings & Help
                        </Button>
                    ) : (
                        <Tooltip title="Settings & Help" placement='right'>
                        <IconButton disableRipple onClick={() => navigate("/settings")} sx={{ 
                            borderRadius : "30px",
                            backgroundColor : "#4B0082"
                        }}>
                            <SettingsIcon fontSize='small' sx={{color:'whitesmoke'}}/>
                        </IconButton>
                        </Tooltip>
                    )}
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default Sidebar
