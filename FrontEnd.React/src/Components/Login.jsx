import React, { useState } from "react";
import logo from '../assets/login-logo.png'
import email from '../assets/email.png'
import password from '../assets/password.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = ()=>{

    const [ uemail, setuemail ] = useState('')
    const [ upassword, setupassword ] = useState('')
    const [ message, setmessage ] = useState('')
    const navigate = useNavigate()

    const click = async (e) =>{
        e.preventDefault()

        try{
            const { data } = await axios.post('https://codesensei-ai-backend.vercel.app/login', { uemail, upassword })
            setmessage(data.message)
            localStorage.setItem( 'token', data.token )
            navigate('/dashboard')
        }catch(error){
            setmessage(
                error.response?.status === 401
                ? 'Invalid Username or Password'
                : error.response?.data?.error || 'Somthing Went Wrong'
            )
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
                        <h1>LOGIN</h1>
                        <h5>ENTER YOUR CREDENTIAL TO LOGIN</h5>
                    </div>
                    <div className="login-middle">
                        <form className="inline">
                            <div className="login-inputs">
                                <img className="l-img" src={email}></img>
                                <input onChange={(e) => setuemail(e.target.value)} type="text" placeholder="Your Email" className="l-input" />
                            </div>
                            <div className="login-inputs">
                                <img className="l-img" src={password}></img>
                                <input onChange={(e) => setupassword(e.target.value)} type="text" placeholder="Your Password" className="l-input" />
                            </div>
                            <div className="l-other">
                                <div className="l-checkbox">
                                    <input type="checkbox" />
                                    <p>REMEMBER ME</p>
                                </div>
                                <div className="l-forgot">
                                    <p>FORGOTTEN PASSWORD?</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="login-bottom">
                        <div onClick={click} className="l-btn">
                            <p>LOGIN</p>
                        </div>
                        <div className="l-register">
                            <p>Don't have an account? <a onClick={()=> navigate("/")}>Register Now</a></p>
                        </div>
                    </div>
                    <p>{message}</p>
                </div>
            </div>
        </>
    )
}

export default Login