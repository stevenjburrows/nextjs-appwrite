"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation';
import axios from 'axios'
import { Toaster, toast }  from 'react-hot-toast';

export default function SignUpPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: ''  
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSignUp = async ()=> {
    try {
      setIsLoading(true);
      const response = await axios.post('api/users/signup', user);
      console.log('success', response.data);
      toast.success('signup success')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
      console.log('sign up failed');
      
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if(user.email.length> 0 && user.password.length > 0 && user.username.length > 0){
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    };

  },[user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-center text-white text-3xl'>
            {isLoading ? 'Processing' : 'Sign up'}
        </h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
          type="text" 
          value={user.username} 
          onChange={(e) => setUser({...user, username: e.target.value})} 
          id='username' 
          placeholder='username' 
          className='p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        />
        <label htmlFor="email">email</label>
        <input 
          type="text" 
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})} 
          id='email' 
          placeholder='email' 
          className='p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  text-black'
        />
        <label htmlFor="password">password</label>
        <input 
          type="password" 
          value={user.password} 
          onChange={(e) => setUser({...user, password: e.target.value})} 
          id='password' 
          placeholder='password' 
          className='p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  text-black'
        />
        <button 
          className='p-2 border border-grey-300 rounded mb-4 focus:outline-none focus:border-gray-600'
          onClick={onSignUp}
          disabled={isButtonDisabled}
        >
          Sign Up Here
        </button>
        <Link href='/login'>Login</Link>
        <Toaster />
    </div>
  )
}
