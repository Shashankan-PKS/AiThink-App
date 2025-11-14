import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar } from "@mui/material"
import MuiAlert from "@mui/material/Alert";
import './Signup.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from '../../assets/Aithink_logo.png';
import axios from 'axios'


function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("")
    const [showPass, setShowPass] = useState(false);
    const [cshowPass, setCShowPass] = useState(false)
    const [open, setOpen] = useState(false); // Snackbar open state
    const [message, setMessage] = useState(""); // Snackbar message
    const [severity, setSeverity] = useState("success"); // success | error | warning | info

    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;          
    const re = /^[A-Za-z\s]*$/;

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("https://ai-think-app.vercel.app/api/registration", { name, email, password, cpassword });
            setMessage("Registered successfully!");
            setSeverity("success");
            setOpen(true);
            setName("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            if(err.response?.data?.msg){
                const errorMsg =  err.response?.data?.msg;
                setMessage(errorMsg );
                setSeverity("error");
                setOpen(true);
            }else{
                const errorMsg =  "Network Error";
                setMessage(errorMsg );
                setSeverity("error");
                setOpen(true);
            }
        }
        
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    return(
        <>
            <div className="sucontent">
                <Box sx={{display : "flex",alignItems: "center",justifyContent: "center" , height:"90vh" }}>
                    <Box sx={{ flex: 1, display: "flex",flexDirection : "column",textAlign: "center",alignItems: "center",justifyContent: "space-between",height: "90vh",
                        "@media (max-width:950px)": {
                            display: "none", 
                        },
                        }}>
                        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img src={logo} alt="Logo" style={{width : "800px",  maxWidth: "90%" }}/>
                        </Box>
                        <Box  sx={{ paddingBottom: "10px" }}>
                            <Typography sx={{color : "#4B0082",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Techbrain Networks </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="suContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",
                        "@media (max-width:420px)": {
                            width : "300px",
                            justifyContent : "normal"
                        },"@media (max-width:320px)": {
                            width : "100%"
                        },}}>
                        <Box sx={{ textAlign : "center", padding : "80px 20px 20px 20px"}}>
                            <Typography variant="h3" component="p" sx={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman","@media (max-width:550px)": {
                            fontSize : "25px"
                        },
                        "@media (max-width:400px)": {
                            fontSize : "20px"
                        },}}> Sign up</Typography>
                        </Box>
                        <Box sx={{ width : "70%", "@media (max-width:550px)": {
                            width : "85%"
                        },"@media (max-width:420px)": {
                            width : "90%"
                        },}}>
                            <TextField sx={{marginBottom : "20px", fontFamily: "Epilogue"}} value={name} InputProps={{
                                sx: {
                                    borderRadius: "25px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:450px)": {
                                        fontSize : "14px",
                                    },
                                }
                            }} fullWidth placeholder="Enter your Full Name" onChange={(e) => setName(e.target.value)} />
                            <TextField sx={{marginBottom : "20px",  fontFamily: "Epilogue"}} value={email} InputProps={{
                                sx: {
                                    borderRadius: "25px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:450px)": {
                                        fontSize : "14px",
                                    },
                                }
                            }} fullWidth placeholder="Enter your email Id" onChange={(e) => setEmail(e.target.value)}/>
                            <TextField sx={{marginBottom : "20px",  fontFamily: "Epilogue"}} value={password} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "25px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:450px)": {
                                        fontSize : "14px",
                                    },
                                }
                            }} fullWidth placeholder="Create Password" type={ showPass ? "text" : "password"} 
                            onChange={(e) => setPassword(e.target.value)}/>
                            <TextField sx={{marginBottom : "20px", fontFamily: "Epilogue"}} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setCShowPass(!cshowPass)} edge="end">
                                        {cshowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "25px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:450px)": {
                                        fontSize : "14px",
                                    },
                                }
                            }} fullWidth placeholder="Confirm Password" type={ cshowPass ? "text" : "password"}
                            onChange={(e) => setCPassword(e.target.value)}/>
                            <Box sx={{textAlign: "center",justifyItems : "center"}}>
                                <Button onClick={handleSignUp} sx={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "#0D1B4C", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px","@media (max-width:400px)": {
                                    fontSize : "14px",
                                    width : "100px",
                                    height : "30px"
                                },}}>Sign Up</Button>
                            </Box>
                            <Box sx={{textAlign: "center",justifyItems : "center", padding : "20px","@media (max-width:450px)": {
                                    fontSize : "12px",
                                },}}>
                                <Typography sx={{color : "rgba(227, 235, 255, 1)"}}> or Signup with</Typography>
                                <Box  sx={{display: "flex", textAlign: "center", gap:"1px", padding : "10px"}}>
                                    <Button disableRipple disableElevation sx={{backgroundColor : "#4B0082", color : "rgba(227, 235, 255, 1)",}}><GoogleIcon  /></Button>
                                    <Button disableRipple disableElevation sx={{backgroundColor : "#4B0082", color : "rgba(227, 235, 255, 1)",}}><FacebookRoundedIcon /></Button>
                                    <Button disableRipple disableElevation sx={{backgroundColor : "#4B0082", color : "rgba(227, 235, 255, 1)",}}><AppleIcon /></Button>
                                </Box>
                            </Box>
                            <Box sx={{textAlign: "center",justifyItems : "center", padding : "20px","@media (max-width:450px)": {
                                    fontSize : "14px",
                                    padding: "10px"
                                },}}>
                                <Typography sx={{color : "rgba(227, 235, 255, 1)"}}> Already have an account? <Link style={{ color : "rgba(227, 235, 255, 1)", textDecoration: "none", cursor:"pointer",}} to="/login">Sign in</Link></Typography>
                            </Box>
                            
                        </Box>
                    </Box>
                </Box>
                
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        onClose={handleClose}
                        severity={severity}
                        sx={{ width: "100%" }}
                    >
                        {message}
                    </MuiAlert>
                </Snackbar>
                
            </div>
        </>
    )
}

export default Signup