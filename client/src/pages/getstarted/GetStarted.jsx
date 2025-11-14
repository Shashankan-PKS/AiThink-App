import { Box, CircularProgress, Typography } from '@mui/material'
import logo from '../../assets/Frame1086949.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
          <img src={logo} alt="Logo" style={{width:"1000px", maxWidth: "100%" }}/>
          <Box>
            <CircularProgress enableTrackSlot size={40} style={{color : "#0D1B4C"}} />
          </Box>
        </Box>
        
        <Box  sx={{ paddingBottom: "10px" }}>
          <Typography sx={{color : "rgba(25, 42, 86)",fontFamily: "Epilogue"}}>Powered by <span style={{fontWeight: "800"}}> Techbrain Networks </span></Typography>
        </Box>
      </Box>
    </>
  )
}

export default GetStarted