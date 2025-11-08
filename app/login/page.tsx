"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

function LoginPage() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

       const result = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })

        if(result?.error){
            console.error("Login failed:", result.error)
        } else{
            console.log("Login successful")
            router.push("/")
        }
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Login</button>
        </form>
        <div>
            Don't have an account? 
            <button onClick={() => router.push("/register")}> Register</button>
        </div>
    </div>
  )
}

export default LoginPage