import React from 'react'
import Link from 'next/link'
import SessionLayout from '@/components/Layouts/sessionLayout'

export default function LoginScreen() {
  return (
    <SessionLayout 
      title={'Welcome Back!'} 
      subtitle={'To get started with your learning adventure or creative journey, just enter your username and password below.'} 
      title1={'We\'re excited to see you again!'}  
      image={'https://i.postimg.cc/7YLJNpCF/image-removebg-preview-2.png'}>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-yellow-800 font-semibold mb-2">
            Enter username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Type your fun and unique username here."
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-yellow-800 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Enter your secret password here."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-white text-yellow-800 font-bold py-2 px-4 rounded-lg hover:bg-yellow-50 transition duration-300"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-yellow-800">
        New to FunLearn?{' '}
        <Link href="/sign-up" className="font-semibold underline">
          Create an account and join the fun!
        </Link>
      </p>
    </SessionLayout>
  )
}