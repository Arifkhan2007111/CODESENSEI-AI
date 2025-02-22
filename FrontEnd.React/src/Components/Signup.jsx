import React, { useState } from "react";
import axios from 'axios'

import logo from '../assets/login-logo.png'
import email from '../assets/email.png'
import password from '../assets/password.png'
import user from '../assets/user.png'
import { useNavigate } from 'react-router-dom'

const Signup = ()=>{

    const [uName, setuName] = useState('')
    const [uemail, setuemail] = useState('')
    const [upassword, setupassword] = useState('')
    const [message, setmessage] = useState('')
    const navigate = useNavigate()

    const submit = async (e)=>{
        e.preventDefault()
        try{
            const { data } = await axios.post('http://localhost:8000/register', { uName, uemail, upassword })
            setmessage(data.message)
        }catch(error){
            console.log("Error this is", error)
        }
    }

    return(
        <>
            <div className="login">
                <div className="login-left">
                    <img style={{
                        width: "70%"
                    }} src={logo}></img>
                </div>
                <div className="login-right">
                    <div className="login-head">
                        <h1>SIGN-UP</h1>
                        <h5>COME JOIN US!</h5>
                    </div>
                    <div className="login-middle">
                        <form className="inline">
                            <div className="login-inputs">
                                <img className="l-img" src={user}></img>
                                <input onChange={(e)=> setuName(e.target.value)} type="text" placeholder="Create Username" className="l-input" />
                            </div>
                            <div className="login-inputs">
                                <img className="l-img" src={email}></img>
                                <input onChange={(e) => setuemail(e.target.value)} type="text" placeholder="Your Email" className="l-input" />
                            </div>
                            <div className="login-inputs">
                                <img className="l-img" src={password}></img>
                                <input onChange={(e) => setupassword(e.target.value)} type="text" placeholder="Create Password" className="l-input" />
                            </div>
                            <div className="l-other">
                                <div className="l-checkbox">
                                    <input type="checkbox" />
                                    <p>REMEMBER ME</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="login-bottom">
                        <div onClick={submit} className="l-btn">
                            <p>SIGN UP</p>
                        </div>
                        <div className="l-register">
                            <p>Already have an account <a onClick={()=> navigate("/login")}>Login Now</a></p>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default Signup