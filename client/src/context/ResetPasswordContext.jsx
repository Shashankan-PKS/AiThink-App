import { createContext, useState, useEffect ,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassContext = createContext();

export const ResetPassProvider = ({ children }) => {

    const [vemail, setVEmail ] = useState("");
    const [verror, setVError] = useState("");
    const [otp, setOtp] = useState("");
    const [npass, setNPass] = useState("");
    const [cpass, setCPass] = useState("");
    

    const verifyEmail = async (vemail) => {
        const res = await axios.post("https://ai-think-app.vercel.app/api/verifyemail", {vemail}, { withCredentials: true });
        return res.data;
    }

    const verifyotp = async (otp) => {
        const res = await axios.post("https://ai-think-app.vercel.app/api/verifyotp", {otp}, { withCredentials: true });
        return res.data;
    }

    const changePassword = async (npass,cpass) => {
        const res = await axios.patch("https://ai-think-app.vercel.app/api/resetpassword", {npass,cpass}, { withCredentials: true });
        return res.data;
    }

    const resendOtp = async() => {
        const res = await axios.patch("https://ai-think-app.vercel.app/api/resendOtp", {}, { withCredentials: true });
        return res.data;
    }

    const value = {
        vemail, 
        setVEmail, 
        verifyEmail, 
        verror,
        setVError,
        otp,
        setOtp, 
        verifyotp, 
        npass, 
        setNPass, 
        cpass, 
        setCPass, 
        changePassword, 
        resendOtp
    }

    return (
        <>
            <ResetPassContext.Provider value={value}>
                {children}
            </ResetPassContext.Provider>
        </>
    )
}


export const useAppResetContext = () => useContext(ResetPassContext)
