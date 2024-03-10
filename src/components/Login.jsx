"use client"

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KHFep3YzA5h
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"

import { useRouter } from 'next/navigation'
import { auth } from "@/libs/firebaseConfig"


export default function Login() {
const router = useRouter()

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState('')
  
  
  
  const handleSignIn = (e) =>{
   
    e.preventDefault()
    if(email == '' || password == ''){
      setError("All fields are required")
      return
    }
setError("")
 setLoading("Logging in ...")
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    //  console.log(user.uid)
     localStorage.setItem("userId", user.uid);
   if(email == "admin@gmail.com"){

 const role = 'admin'
 localStorage.setItem("role", role);
 router.push('admin/dashboard')
   }else{
   const role = 'student'
    localStorage.setItem("role", role);
    router.push('student/dashboard')
   }
      // ...
    })
    .catch((err) => { 
     setLoading('')
      const errorCode = error.code;
      const errorMessage = err.message; 
       setError(errorMessage)
      console.log(err)
     
    });
  }

  return (
    <div className="grid min-h-screen place-items-center gap-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          {error && (
            <div className="flex items-center space-x-2 text-sm p-4 text-red-600 dark:text-red-500">
            <AlertCircleIcon className="h-4 w-4" />
            <span className="font-medium">{error}</span>
          </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e)=>{setEmail(e.target.value)}} value={email} id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password"  onChange={(e)=>{setPassword(e.target.value)}}  value={password} required type="password" />
          </div>
          <div className="flex items-center space-x-2">
            <Link className="ml-auto text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          {loading && ( <Button className="w-full">Checking please wait ...</Button>)}
          {!loading &&  <Button onClick={handleSignIn} className="w-full">Login</Button>}
        </CardContent>
      </Card>
    </div>
  )
}

function AlertCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
