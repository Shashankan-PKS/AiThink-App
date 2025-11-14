import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import { hashedPassword, comparePassword } from './controllers/hashpass.js';
import { UserData } from './models/Usermodel.js';
import { ChatData } from './models/chatModel.js';
import { verifyResetToken } from './midddlewares/verifyResetToken.js';
import { verifyToken } from './midddlewares/verifyToken.js';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Groq from "groq-sdk";
import nodemailer from "nodemailer";



const app = express();

app.use(cors({
    origin: 'https://aithinkapp.vercel.app',
    credentials: true,
    methods: ['GET','POST','PUT', 'PATCH','DELETE'],
}));
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


app.get("/", (req,res) => res.send('server is live!'));

app.listen(PORT, () => {
    console.log(`Server is running in the Port : ${PORT}`);
});

app.post("/api/registration", async (req, res) => {
    try {
        const {name , email, password, cpassword } = req.body
        const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;        

        if(!name || !email || !password || !cpassword ){
            return res.status(400).json({ msg : "All fields are required"})
        }else if(!emailRegex.test(email)){
            return res.status(400).send({ msg : "Enter a valid Email Id"})
        }
        else if(password !== cpassword){
            return res.status(400).send({ msg : "Password Not match"})
        }else{
            const hashed = hashedPassword(password)
            const user = await UserData.findOne({ user_email : email})
            if(user){
                return res.status(400).send({ msg : "Email is already exist"})
            }else{
                const newUser = new UserData({
                    user_name : name,
                    user_email : email,
                    user_password : hashed,
                })
                await newUser.save()
                return res.status(201).send({ msg : "User Registration successfully"})
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `Error: ${err.message}` });
    }
})

app.post("/api/login", async (req,res) => {
    try{
    const { email , password } = req.body;
    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;

    if(!email || !password){
        return res.status(400).send({ msg : "All fields are required"});
    }else if(!emailRegex.test(email)){
        return res.status(400).send({ msg : "Enter a valid Email Id"})
    }
    const user = await UserData.findOne({user_email : email})
    if(!user){
        return res.status(400).send({ msg : "Email not found! , Please Register"})
    }
    const isMatch = comparePassword(password, user.user_password)
    if(!isMatch){
        return res.status(400).send({ msg : "Invalid or Mismatch Password"})
    }

    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("logtoken", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000 
    });

    return res.status(200).send({ msg : "Login Successfully", details : {name : user.user_name, email : user.user_email} })
    }catch(err){
        console.log(err);
        
        return res.status(500).send({ msg : "Something went wrong! Try again later"})
    }
})

app.post("/api/verifyemail", async(req, res) => {
    try{
    const { vemail } = req.body;
    const emailRegex = /^[\w.]+@[a-zA-Z]+\.[a-z]{2,5}$/;
    
    if(!vemail){
        return res.status(400).send({ msg : "All fields are required"});

    }else if(!emailRegex.test(vemail)){
        return res.status(400).send({ msg : "Enter a valid Email Id"})
    }else{
    const user = await UserData.findOne({user_email : vemail})
    if(!user){
        return res.status(400).send({ msg : "Email not found! , Please Register"})
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await UserData.updateOne({user_email : vemail}, {$set : {reset_otp : otp}} )
    const resetToken = jwt.sign({ email: vemail }, process.env.JWT_SECRET, { expiresIn: "15m" });

    res.cookie("resetToken", resetToken, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 15 * 60 * 1000 
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "pksshashankan2003@gmail.com", 
            pass: "dtwp lqfo uxpq tnpf"    
        }
    });
    const mailOptions = {
        from: "pksshashankan2003@gmail.com",
        to: vemail,
        subject: "Attral Password Reset OTP",
        text: `Your OTP for password reset is: ${otp}. It will expire in 15 minutes.`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({ msg : "Email verified! Otp has sent to your email"});
    }
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try Again"})
    }
})

app.get("/api/getEmailFromToken", verifyResetToken, async (req, res) => {
    try{
    const vemail = req.resetEmail;
    return res.status(200).json({ email: vemail });
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try Again"})
    }
});

app.post("/api/verifyotp", async( req,res ) => {
    try{
        const {otp} = req.body;
        const token = req.cookies.resetToken;

        if (!token) return res.status(401).send({ msg: "Token missing" });
        
        if(!otp ){
            return res.status(400).send({ msg : "All fields are required"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserData.findOne({ user_email: decoded.email });
        const verifiedotp = user.reset_otp
        if(otp !== verifiedotp ){
            return res.status(400).send({ msg : "Enter a valid otp"})
        }
        return res.status(200).send({ msg : "otp has been verified"});
    }catch(err){
        return res.status(401).send({ msg: "Token expired or invalid" });
    }
});

app.patch("/api/resendOtp", verifyResetToken, async(req,res) => {
    try{
        const vemail = req.resetEmail;
        if(!vemail){
            return res.status(400).send({ msg : "Email is not verified!"});
        }
        const user = await UserData.findOne({user_email : vemail})
        if(!user){
            return res.status(400).send({ msg : "Email not found! , Please Register"})
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await UserData.updateOne({user_email : vemail}, {$set : {reset_otp : otp}} )

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pksshashankan2003@gmail.com", 
                pass: "dtwp lqfo uxpq tnpf"    
            }
        });

        const mailOptions = {
            from: "pksshashankan2003@gmail.com",
            to: vemail,
            subject: "Attral Password Reset OTP ",
            text: `Your OTP for password reset is: ${otp}. It will expire in 15 minutes.`
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).send({ msg : "Email verified! Otp has sent to your email"});
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try Again"})
    }
})

app.patch("/api/resetpassword",verifyResetToken, async(req, res) => {
    try{
        const { npass , cpass} = req.body;
        const vemail = req.resetEmail;
        
        if(!npass || !cpass){
            return res.status(400).send({ msg : "All fields are required"});
        }else if(npass !== cpass){
            return res.status(400).send({ msg : "Password not matched"});
        }
        
        const user = await UserData.findOne({user_email : vemail});
        const hashed =  hashedPassword(npass)
        
        if(!user){
            return res.status(400).send({ msg : "Email not found! , Please Register"})
        }else{
            await UserData.updateOne({user_email : vemail},{$set :{user_password : hashed, reset_otp : ""}})
            res.clearCookie("resetToken", { httpOnly: true, secure: true, sameSite: "Lax" });
            return res.status(201).send({ msg : "Password Updated successfully"})
        }
    }catch(err){
        return res.status(500).send({ msg : "Something went wrong! Try again later"})
    }

})

app.get("/api/home", verifyToken , async (req,res) => {
    
    const details = req.user
    res.json({ details });
})

app.get("/api/createChat", verifyToken ,async (req, res) => {
    try{
        const userId = req.user._id;

        const chats = {
            userId : userId,
            messages : [],
            chatName : "New Chat",
            userName : req.user.user_name,
        }

        await ChatData.create(chats);

        res.status(200).send({msg : "New Chat created"})
    }catch(err){
        console.log(err);
        res.status(500).send({msg : "Error Something went wrong"});
    }
})

app.get("/api/getChat", verifyToken ,async (req, res) => {
    try{
        const userId = req.user._id;

        const chats = await ChatData.find({userId}).sort({updatedAt : -1})

        res.status(200).send({chats})
    }catch(err){
        console.log(err);
        res.status(500).send({msg : "Error Something went wrong"});
    }
});

app.post("/api/aichat", verifyToken , async (req, res ) => {
    try{
    const userId = req.user._id;
    const {chatId, prompt } = req.body;

    const chat = await ChatData.findOne({userId,_id: chatId});
    chat.messages.push({
        role: "user", 
        content: prompt, 
        timestamps : Date.now(), 
        isImage: false,
        isPublished : false,
    });

    const { choices } = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "user",
                content : prompt,
            },
        ],
    });

    const reply = {...choices[0].message, timestamps : Date.now(),isImage : false,isPublished : false,};

    chat.messages.push(reply);
    await chat.save();

    res.status(200).send({msg : "AI msg sent successfully", reply});

    }catch(err){
        console.log(err);
        res.status(500).json({msg : "Internal server error"})
    }

})

app.post("/api/deleteChat", verifyToken ,async (req, res) => {
    try{
        const userId = req.user._id;
        const {chatId} = req.body;

        await ChatData.deleteOne({_id : chatId,userId})


        res.status(200).send({msg : "Chat deleted successfully"})
    }catch(err){
        console.log(err);
        res.status(500).send({msg : "Error Something went wrong"});
    }
})

app.post("/api/logout", (req, res) => {

    res.clearCookie("logtoken", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/", 
    });

    return res.status(200).json({ msg: "Logged out successfully" });
});