"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import axios from 'axios'
import  { Toaster, toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async ()=> {
    try {
      setIsLoading(true)
      await axios.post('api/users/login', user);
      toast.success('login success')
      router.push('/profile')
      
    } catch (error: any) {
      console.log('login failed', error.message);
      toast.error(error.message);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true);
    }
  },[user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-center text-white text-3xl'>
            {isLoading? 'loading' :'Login'}
        </h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
          type="text" 
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})} 
          id='email' 
          placeholder='email' 
          className='p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        />
        <label htmlFor="password">password</label>
        <input 
          type="password" 
          value={user.password} 
          onChange={(e) => setUser({...user, password: e.target.value})} 
          id='password' 
          placeholder='password' 
          className='p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        />
        <button 
          className='p-2 border border-grey-300 rounded mb-4 focus:outline-none focus:border-gray-600'
          onClick={onLogin}
          disabled={isButtonDisabled}
        >
          Login
        </button>
        <Link href='/signup'>Sign up</Link>
        <Toaster />
    </div>
  )
}