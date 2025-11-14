import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from "@mui/material/Alert";
import './ForgotPassword.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/Aithink_logo.png';
import { useAppResetContext } from "../../context/ResetPasswordContext.jsx";


function ForgotPassword(){

    const { vemail, setVEmail, verifyEmail } = useAppResetContext();

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");

    const navigate = useNavigate()

    useEffect(() => {
        setVEmail("");
    }, []);


    const handleSubmit = async () => {
        try{
            const res = await verifyEmail(vemail);
            setSeverity("success");
            setMessage(res.msg );
            setOpen(true);
            setTimeout(() => navigate("/verify-otp"), 2500);
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
                            <Typography sx={{color : "#0D1B4C",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}>  Shashankan </span></Typography>
                        </Box>    
                        
                    </Box>
                    <Box className="fpContainer" sx={{ flex: 1,display: "flex",flexDirection: "column",alignItems: "center",justifyContent: "center", width : "500px",
                        "@media (max-width:550px)": {
                            width : "400px"
                        },"@media (max-width:420px)": {
                            width : "300px",
                            justifyContent : "normal"
                        },"@media (max-width:320px)": {
                            width : "100%"
                        },
                    }}>
                        <Box sx={{ textAlign : "center", padding : "80px 20px 20px 20px"}}>
                            <Typography variant="h4" component="p" sx={{ color: "rgba(227, 235, 255, 1)", fontSize : "40px" , fontWeight : "700" ,fontFamily : "Times new roman","@media (max-width:550px)": {
                            fontSize : "25px"
                        },
                        "@media (max-width:400px)": {
                            fontSize : "18px"
                        },}} > Password Assistance </Typography>
                        </Box>
                        <Box sx={{ width : "70%", "@media (max-width:550px)": {
                            width : "90%"
                        },"@media (max-width:420px)": {
                            width : "95%"
                        },}}>
                            <TextField sx={{marginBottom : "20px"}} value={vemail} onChange={(e) => setVEmail(e.target.value)} InputProps={{
                                sx: {
                                    borderRadius: "30px",
                                    backgroundColor: "#E3E8FF",
                                    "& fieldset": { border: "none" },
                                    color : "rgba(25, 42, 86, 0.8)",
                                    fontFamily: "Epilogue",
                                    "@media (max-width:400px)": {
                                        fontSize : "15px",
                                    },
                                }
                            }} fullWidth placeholder="Enter your Email Id" />

                        </Box>
                        <Box sx={{ display : "flex" ,flexDirection : "column" ,gap : "10px" , textAlign: "center",justifyItems : "center", padding : "20px"}}>
                            <Button onClick={handleSubmit} sx={{ textTransform : "capitalize", fontFamily : "Epilogue" , backgroundColor : "rgba(227, 235, 255, 1)", color : "rgb(43, 73, 149)", width:"150px", height:"50px", borderRadius: " 30px",fontSize:"15px",
                                "@media (max-width:400px)": {
                                    fontSize : "12px",
                                    width : "100px",
                                    height : "30px"
                                },
                            }}> Verify </Button>
                            <Button disableRipple disableElevation onClick={() => navigate('/login')} sx={{ textTransform : "capitalize", fontFamily : "Epilogue", backgroundColor : "#4B0082", color : "rgb(199, 213, 255)",
                                "@media (max-width:400px)": {
                                    fontSize : "12px",
                                    width : "100px",
                                    height : "30px"
                                },
                            }}>Back</Button>
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

export default ForgotPassword