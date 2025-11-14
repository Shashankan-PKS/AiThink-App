import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/Appcontext.jsx'
import Message from './Message.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import PanoramaIcon from '@mui/icons-material/Panorama';
import LanguageIcon from '@mui/icons-material/Language';
import axios from "axios";
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/Aithink_lg.png'

const ChatBox = () => {

    const {selectedChat, user, fetchUsersChats, DrawerOpen, setDrawerOpen,logout,navigate,MbDrawerOpen, setMbDrawerOpen,} = useAppContext();
    const [messages,setMessages] = useState([]);
    const [loading,setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [ openNav, setOpenNav ] = useState();
    const opennavbar = Boolean(openNav);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('md'));
    const [lastIsSm, setLastIsSm] = useState(isXs);
    const isXsmb = useMediaQuery(theme.breakpoints.only('xs'));
    const [ opensmTextBtn, setOpensmTextBtn ] = useState();
    const opensmtextbtn = Boolean(opensmTextBtn);
    const [ openxsTextBtn, setOpenxsTextBtn ] = useState();
    const openxstextbtn = Boolean(openxsTextBtn);
    const containerRef = useRef(null)

    const handlesmBtnOpen = () => {
        setOpensmTextBtn(true)
    }
    const handlesmBtnClose = () => {
        setOpensmTextBtn(false)
    }
    const handlexsBtnOpen = () => {
        setOpenxsTextBtn(true)
    }
    const handlexsBtnClose = () => {
        setOpenxsTextBtn(false)
    }
    const handleListOpen = () =>{
        setOpenNav(true)
    }
    const handleListClose = () => {
        setOpenNav(false)
    }
    const handleSend = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        const chatId = selectedChat?._id;
        setMessages((prev) => [...prev,
            { role: "user", content : prompt, timestamp: Date.now(), isImage: false},
        ]);
        try {
            const res = await axios.post("https://ai-think-app.vercel.app/api/aichat", {chatId, prompt}, { withCredentials: true })
            setLoading(false);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: res.data.reply.content},
            ]);
            setPrompt("");
            await fetchUsersChats()
        } catch (err) {
        console.log(err);
        }
    };


    useEffect(() => {
        if(selectedChat){
            setMessages(selectedChat.messages);
        }
    },[selectedChat])

    useEffect(() => {
        if(user === null){
            navigate("/login")
        }
    })

    useEffect(() =>{
        if(containerRef.current){
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior : 'smooth',
            })
        }
    },[messages])

    const firstLetter = user?.user_name?.charAt(0)?.toUpperCase();

    return (
        <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
            <div>
                <AppBar component="nav" sx={{ bgcolor : "whitesmoke",boxShadow : "none", flex : 1,display: "flex", width: isXs ? "100%" : DrawerOpen
                ? "calc(100% - 300px)" : "calc(100% - 80px)", transition: "width 0.3s ease-in-out"}} >
                    <Box sx={{ display : "flex", justifyContent : "space-between", width : "100%", alignItems : "center"}}>
                        <Box sx={{display : "flex", gap: 1, alignItems : "center",ml : "20px" ,"@media (max-width:380px)": {
                                ml : "10px"
                            },}}>
                            <Box>
                                {isXs && 
                                    <IconButton
                                        disableRipple
                                        onClick={() => setMbDrawerOpen(true)}
                                        >
                                            <MenuIcon sx={{ color: 'rgba(25, 42, 86, 1)', fontSize : "25px", fontWeight : '500',"@media (max-width: 380px)": {
                                                width: 20,
                                                height: 20,
                                                
                                            },}} />
                                    </IconButton>
                                }
                            </Box>
                            <Box sx={{ display : "flex", flexDirection : "row",gap: 1, alignItems : "center"}}>
                                <img src={logo} alt="" style={{ width : "60px", height : "50px"}}/>
                                <Typography sx={{ fontFamily: "Exo 2",fontSize: {xs: "35px", sm:"48px"} ,fontWeight: 700,color: "#4B0082", letterSpacing: "4px","@media (max-width:380px)": {
                                    fontSize : "25px"
                                },}}>
                                    aiThink
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ paddingRight : "20px"}}>
                            <IconButton size="small"
                            onClick={handleListOpen}
                            sx={{ ml: 2 }}
                            aria-controls={opennavbar ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={opennavbar ? 'true' : undefined}>
                                <Avatar sx={{ bgcolor : "#4B0082", color : "rgba(227, 235, 255, 1)",fontFamily: "Epilogue", fontWeight : "600","@media (max-width: 600px)": {
                                width: 28,
                                height: 28,
                                fontSize: "0.8rem",
                                }, }}>{firstLetter}</Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={openNav}
                                id="account-menu"
                                open={opennavbar}
                                onClose={handleListOpen}
                                onClick={handleListClose}
                                slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 7,
                                    backgroundColor : "rgba(234, 239, 255, 1)",
                                    color : "rgb(43, 73, 149)", 
                                    "@media (max-width:580px)": {
                                        mt: 5,
                                    },
                                    "@media (max-width:350px)": {
                                        mt: 4,
                                    },
                                    
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: 3,
                                        mr: 10,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 25,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'rgba(234, 239, 255, 1)',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                        "@media (max-width:580px)": {
                                            right: 20,
                                        },
                                        
                                    },
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            >
                                <MenuItem sx={{fontFamily : "Epilogue",fontWeight : "500",padding : "15px","@media (max-width:350px)": {
                                fontSize : "14px",
                                padding : "10px"
                            },}} onClick={() => navigate("/profile")}>
                                    <PersonIcon sx={{mr : 1,"@media (max-width:350px)": {
                                        fontSize : "17px",
                                        
                                    },}} /> My account
                                </MenuItem>
                                <MenuItem onClick={logout} sx={{fontFamily : "Epilogue",fontWeight : "500",padding : "15px","@media (max-width:350px)": {
                                    fontSize : "14px",
                                    padding : "10px"
                                },}}>
                                    <Logout sx={{mr : 1,"@media (max-width:350px)": {
                                        fontSize : "17px"
                                    },}} /> Logout
                                </MenuItem>   
                            </Menu>
                        </Box>
                    </Box>
                </AppBar>
            </div>
            <div ref={containerRef} className='flex-1 mt-5 mb-5 overflow-y-scroll'>
                {messages.length === 0 && (
                <div className='h-full flex flex-col items-center justify-center'>
                    <p>Hello {user.user_name}👋, How can I help you today !</p>
                </div>
                )}

                {messages.map((message,index) => <Message key={index} message={message} />)}

                {
                loading && <div className='loader flex items-center gap-1.5'>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce'></div>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce'></div>
                    <div className='w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce'></div>
                </div>
                }

            </div>

            <div>
                <Box sx={{width:"100%", padding: "10px"}}>
                    <Box>
                        <Box sx={{ width : "90%", border : "3px solid #4B0082", padding : "10px",
                            borderRadius : "30px", transition: "width 0.3s ease-in-out"
                        }}>
                            <TextField variant="standard" multiline fullWidth maxRows={5} placeholder={isXsmb ? "Ask Attral" : "Ask Aattral anything about Aerospace Industry"}
                            value={prompt} onChange={(e) => setPrompt(e.target.value)}  InputProps={{disableUnderline : true,
                                sx: {
                                    "& textarea": {
                                        fontFamily : "Epilogue",
                                        color : "#4B0082",
                                        fontWeight : "500",
                                        resize: "none",
                                        overflowY: "auto",              
                                        pl: "10px",
                                        pr: "10px",
                                        pb: "10px",
                                        "&::-webkit-scrollbar": {
                                            width : "5px",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            backgroundColor: "rgb(199, 213, 255)",
                                            borderRadius: "10px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "rgba(227, 235, 255, 1)",
                                            borderRadius: "10px",
                                        },
                                        "&::-webkit-scrollbar-thumb:hover": {
                                            backgroundColor: "rgba(192, 208, 254, 1)",
                                        },
                                    }
                                }
                            }}/>
                            <Box sx={{ display : "flex", alignItems : "center"}}>
                                <Box sx={{ flexGrow : 1, display : "flex", alignItems : "center"}}>
                                    <Box>
                                        <IconButton disableRipple>
                                            <AddCircleIcon sx={{ color : "#4B0082", fontSize : "30px"}}/>
                                        </IconButton>
                                    </Box>
                                    <Box sx={{ display : { xs: "none", sm : "none" ,md : "flex"}, gap : 1}}>
                                        <Button variant="outlined" startIcon={<SearchIcon />} sx={{color : "#4B0082", textTransform : "capitalize", border : "2px solid #4B0082", borderRadius : "50px"}}>
                                            <Typography sx={{fontFamily : "Poppins", "@media (max-width:1050px) and (min-width:900px)": {
                                                fontSize: "12px", 
                                                fontWeight: 600,
                                            }, }}>
                                                Deep Research
                                            </Typography>
                                        </Button>
                                        <Button variant="outlined" startIcon={<PanoramaIcon />} sx={{color : "#0D1B4C", textTransform : "capitalize", fontFamily : "Poppins", border : "2px solid #4B0082", borderRadius : "50px"}}>
                                            <Typography sx={{fontFamily : "Poppins", "@media (max-width:1050px) and (min-width:900px)": {
                                                fontSize: "12px",
                                                fontWeight: 600, 
                                            }, }}>
                                                Create Image
                                            </Typography>
                                        </Button>
                                        <Button variant="outlined" startIcon={<LanguageIcon />} sx={{color : "#4B0082", textTransform : "capitalize", fontFamily : "Poppins", border : "2px solid #4B0082", borderRadius : "50px"}}>
                                            <Typography sx={{fontFamily : "Poppins", "@media (max-width:1050px) and (min-width:900px)": {
                                                fontSize: "12px",
                                                fontWeight: 600, 
                                            }, }}>
                                                Web Search
                                            </Typography>
                                        </Button>
                                    </Box>
                                    <Box sx={{ display : { xs: "none", sm : "flex" ,md : "none"}, gap : 1}}>
                                        <Button variant="outlined" startIcon={<SearchIcon />} sx={{color : "#4B0082", textTransform : "capitalize", fontFamily : "Poppins", border : "2px solid #4B0082", borderRadius : "50px"}}>Deep Research</Button>
                                        <Box>
                                            <IconButton  disableRipple sx={{ backgroundColor : "#4B0082",  ml: 2}}
                                                onClick={handlesmBtnOpen}
                                                aria-controls={opensmtextbtn ? 'text-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={opensmtextbtn ? 'true' : undefined}
                                            >
                                                <MoreVertIcon sx={{ color : "rgb(227, 235, 255)" , fontSize : "20px"}}/>
                                            </IconButton>
                                            <Menu
                                                anchorEl={opensmTextBtn}
                                                id="text-menu"
                                                open={opensmtextbtn}
                                                onClose={handlesmBtnOpen}
                                                onClick={handlesmBtnClose}
                                                slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: -15,
                                                    ml : 10,
                                                    color : "rgba(234, 239, 255, 1)",
                                                    backgroundColor : "#4B0082", 
                                                    
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                    },
                                                    },
                                                },
                                                }}
                                                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                                            >
                                                <MenuItem sx={{fontFamily : "Poppins",fontWeight : "500",padding : "15px",}} onClick={handlesmBtnClose}>
                                                    <PanoramaIcon sx={{mr : 1}} /> Create Image
                                                </MenuItem>
                                                <MenuItem onClick={handlesmBtnClose} sx={{fontFamily : "Poppins",fontWeight : "500",padding : "15px"}}>
                                                    <LanguageIcon sx={{mr : 1}} /> Web Search
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display : { xs: "flex", sm : "none" ,md : "none"}}}>
                                        <Box>
                                            <IconButton  disableRipple sx={{ backgroundColor : "rgb(25, 42, 86)",  ml: 2}}
                                                onClick={handlexsBtnOpen}
                                                aria-controls={openxstextbtn ? 'text-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openxstextbtn ? 'true' : undefined}
                                            >
                                                <MoreVertIcon sx={{ color : "rgb(227, 235, 255)" , fontSize : "20px"}}/>
                                            </IconButton>
                                            <Menu
                                                anchorEl={openxsTextBtn}
                                                id="text-menu"
                                                open={openxstextbtn}
                                                onClose={handlexsBtnOpen}
                                                onClick={handlexsBtnClose}
                                                slotProps={{
                                                paper: {
                                                    elevation: 0,
                                                    sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: -15,
                                                    ml : -10,
                                                    color : "rgba(234, 239, 255, 1)",
                                                    backgroundColor : "#4B0082", 
                                                    
                                                    '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                    },
                                                    },
                                                },
                                                }}
                                                transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                                            >
                                                <MenuItem sx={{fontFamily : "Poppins",fontWeight : "500",padding : "15px",}} onClick={handlexsBtnClose}>
                                                    <SearchIcon sx={{mr : 1}} /> Deep Research
                                                </MenuItem>
                                                <MenuItem sx={{fontFamily : "Poppins",fontWeight : "500",padding : "15px",}} onClick={handlexsBtnClose}>
                                                    <PanoramaIcon sx={{mr : 1}} /> Create Image
                                                </MenuItem>
                                                <MenuItem onClick={handlexsBtnClose} sx={{fontFamily : "Poppins",fontWeight : "500",padding : "15px"}}>
                                                    <LanguageIcon sx={{mr : 1}} /> Web Search
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{padding: "10px"}}>
                                    <IconButton disableRipple onClick={handleSend} sx={{ backgroundColor : "#4B0082", }}>
                                        <SendIcon sx={{ color : "rgb(227, 235, 255)" , fontSize : "18px"}}/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>

        </div>
    )
}

export default ChatBox
