import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, Chip, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { useAppContext } from '../context/Appcontext.jsx';
import actionSidebar from '../assets/Vector.png';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ImageIcon from "@mui/icons-material/Image";
import SettingsIcon from "@mui/icons-material/Settings";
import PanoramaIcon from '@mui/icons-material/Panorama';
import DeleteIcon from '@mui/icons-material/Delete';

const Settings = () => {

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
      }catch (error) {
        console.log(error)
      }
    }

    const menuItems = [
        { text: "New Chat", icon: <AddBoxOutlinedIcon sx={{ fontSize : "30px"}} /> },
        { text: "Media", icon: <ImageIcon sx={{ fontSize : "30px"}}/> },
    ];

    const chatListItems = [
        {id : 1, text : "Autonomous Skies"},
        {id : 2, text : "Zero-Downtime Aircrafts"},
        {id : 3, text : "Simulating Space Missions"},
        {id : 4, text : "Textile Quality Control"},
        {id : 5, text : "Game Plan"},
        {id : 6, text : "Color Psychology"},
        {id : 7, text : "Wearable AI"},
        {id : 8, text : "Predictions Tourist Hotspots"},
        {id : 9, text : "Fashion Forecasting"},
        {id : 10, text : "Lost in Translation"},
        {id : 11, text : "Textile Quality Control"},
        {id : 12, text : "Game Plan"},
        {id : 13, text : "Autonomous Skies"},
        {id : 14, text : "Zero-Downtime Aircrafts"},
    ]

  return (
    <>
      <h6>Settings</h6>
    </>
  )
}

export default Settings
