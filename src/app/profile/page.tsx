"use client"

import axios from 'axios'
import Link from 'next/link'
import { Toaster, toast } from 'react-hot-toast';
import {useRouter} from 'next/navigation'
import { useState } from 'react';

export default function Profile() {

  const router = useRouter()

  const [user, setUser] = useState('')

  const getUserDetail = async () =>{
    const res: any= await axios.get('/api/users/me') ;
    setUser(res.data.data._id);
  }
  
  const logout = async ()=>{
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout Successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
      
    }

  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4' >
          {user === '' ? 'Nothing': <Link href={`/profile/${user}`}>Go to Profile</Link>}
        </h2>
        <hr />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4' onClick={logout}>
          Logout
        </button>
        <button className='bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-md mt-4' onClick={getUserDetail}>
          Get User Details
        </button>
        <Toaster />

    </div>
  )
}
