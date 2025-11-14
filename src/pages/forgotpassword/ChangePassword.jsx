import { Box, Button, TextField, Typography, IconButton, InputAdornment,Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import './ForgotPassword.css'
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/Aithink_logo.png';
import { useContext } from "react";
import { useAppResetContext } from "../../context/ResetPasswordContext.jsx";
import axios from "axios";

function ChangePassword(){

    const {vemail, setVEmail, npass, setNPass, cpass, setCPass, changePassword} = useAppResetContext();

    const [nshowPass, setNShowPass] = useState(false);
    const [cshowPass, setCShowPass] = useState(false);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");


    useEffect(() => {
        const fetchEmail = async () => {
            try {
            const res = await axios.get("http://localhost:5000/api/getEmailFromToken", { withCredentials: true });
            setVEmail(res.data.email);
            } catch (err) {
            console.log(err); 
            }
        };

        fetchEmail();
        setNPass("");
        setCPass("")
    }, []);
    


    const navigate = useNavigate()

    const handlechangePassword = async() => {
        try{
            const res = await changePassword(npass,cpass)
            setSeverity("success");
            setMessage(res.msg );
            setOpen(true);
            setTimeout(() => navigate("/login"), 2500);
        }catch(err){
            const errorMsg = err.response?.data?.msg ;
            setMessage(errorMsg );
            setSeverity("error");
            setOpen(true);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    


    return(
        <>
            <div className="fpcontent">
                <Box sx={{display : "flex",alignItems: "center",justifyContent: "center" , maxHeight:"90vh" }}>
                    <Box sx={{ flex: 1, display: "flex",flexDirection : "column",textAlign: "center",alignItems: "center",justifyContent: "space-between",height: "90vh",
                        "@media (max-width:950px)": {
                            display: "none", 
                        },
                        }}>
                        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <img src={logo} alt="Logo" style={{width : "800px",  maxWidth: "90%" }}/>
                        </Box>
                        <Box  sx={{ paddingBottom: "10px" }}>
                            <Typography sx={{color : "#0D1B4C",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Shashankan </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="fpContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center",
                        "@media (max-width:550px)": {
                            width : "400px"
                        },"@media (max-width:420px)": {
                            width : "300px"
                        },"@media (max-width:320px)": {
                            width : "280px"
                        },"@media (max-width:300px)": {
                            width : "100%"
                        }
                    }}>
                        <Box sx={{ textAlign : "center", padding : "40px 20px 20px 20px"}}>
                            <Typography variant="h4" component="p" sx={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman","@media (max-width:550px)": {
                            fontSize : "25px"
                        },}}> Create New Password </Typography>
                        </Box>
                        <Box sx={{ width : "70%", "@media (max-width:550px)": {
                            width : "80%"
                        },"@media (max-width:420px)": {
                            width : "95%"
                        },}}>
                            <TextField sx={{marginBottom : "20px", }} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setNShowPass(!nshowPass)} edge="end">
                                        {nshowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "30px", 
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    
                                    "@media (max-width:550px)": {fontSize : "13px"}
                                }
                            }} fullWidth placeholder="New password" value={npass} onChange={(e) => setNPass(e.target.value)} type={ nshowPass ? "text" : "password"}/>

                            
                            <TextField sx={{marginBottom : "20px" }} InputProps={{endAdornment: (
                                <InputAdornment position="end"> 
                                    <IconButton onClick={() => setCShowPass(!cshowPass)} edge="end">
                                        {cshowPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>),
                                sx: {
                                    borderRadius: "30px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:550px)": {fontSize : "13px"}
                                }
                            }} 
                            fullWidth placeholder="Re-enter Password" value={cpass} onChange={(e) => setCPass(e.target.value)} type={ cshowPass ? "text" : "password"}/>
                        </Box>
                        <Box sx={{textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Button onClick={handlechangePassword} sx={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "#0D1B4C", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px"}}>Save</Button>
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

export default ChangePassword