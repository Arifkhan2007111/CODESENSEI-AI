import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import downArrow from '../assets/down-white.png'
import profile from '../assets/userxyz.png'
import logo from '../assets/logo-transparent-png.png'

const Nav = ()=>{

    const [ User, setUser ] = useState('')
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchData = async ()=>{
            const token = localStorage.getItem('token');
    
            try{
                const response = await fetch('http://localhost:8000/users', {
                    headers:{
                        'Authorization' : token,
                    },

                });
                
                if(response.ok){
                    const data = await response.json()
                    setUser(data)
                } else{
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            }catch(error){
                console.log("Error", error)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    fetchData()
    }, [navigate])

    return(
        <>
            <div className="nav">
                <div className="nav-header">
                    <img style={{
                        width: "30rem"
                    }} src={logo}></img>
                </div>
                <div className="nav-profile">
                    <img src={profile} alt="Profile"></img>
                    <h2 style={{
                        textTransform:'uppercase'
                    }}>{User.UserName}</h2>
                    <img src={downArrow} alt="Down Arrow"></img>
                </div>
            </div>
        </>
    )
}

export default Nav