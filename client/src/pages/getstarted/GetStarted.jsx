import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import logo from '../../assets/Aithink_logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GetStarted() {

  const navigate = useNavigate()

  useEffect(()=> {
    const timeoutId = setTimeout(() => {
      navigate('/login')
    }, 5000)

    return () => clearTimeout(timeoutId);
  })

  return (
    <>
      <Box sx={{display: "flex",flexDirection: "column", textAlign: "center",alignItems: "center",justifyContent: "space-between", height:"90vh" }}>
        <Box sx={{flexGrow: 1, display : "flex",alignItems: "center",justifyContent: "center",flexDirection : "column" }}>
          <img src={logo} alt="Logo" style={{width:"500px", maxWidth: "100%" }}/>
          <Box>
            <CircularProgress enableTrackSlot size={40} style={{color : "#4B0082"}} />
          </Box>
        </Box>
        
        <Box  sx={{ paddingBottom: "10px" }}>
          <Typography sx={{color : "#4B0082",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Shashankan </span></Typography>
        </Box>
      </Box>
    </>
  )
}

export default GetStarted