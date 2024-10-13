"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import SessionLayout from '@/components/Layouts/sessionLayout';
import Link from 'next/link'

export default function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const router = useRouter();

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get connected accounts
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          
          // After successful login, fetch user role and redirect
          fetchUserRole(accounts[0]);
        }
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  };

  // Simulate fetching the user role (you can replace this with actual contract logic)
  const fetchUserRole = async (walletAddress) => {
    
    const userRole = await simulateFetchUserRole(walletAddress);
    if (userRole === 'instructor') {
      router.push('/dashboard');  
    } else {
      router.push('/dashboard');  
    }
  };

  // Simulate role fetching based on wallet address (mock function)
  const simulateFetchUserRole = async (walletAddress) => {
    // In real implementation, replace this with contract call to fetch user role
    return walletAddress.startsWith('0xA') ? 'instructor' : 'learner';
  };

  return (
    <SessionLayout title={'Loin to Miniminds'} subtitle={'-'} title1={'all fun'} image={'https://i.postimg.cc/t4K1pJrb/boy-jumping-air-with-backpack-his-back-608506-11629-1-1-removebg-preview.png'}>
        {!isConnected ? (
          <>
            <p className="text-yellow-600 mb-4">Connect your wallet to log in</p>
            <button
              onClick={connectWallet}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
            >
              Connect Wallet to Login
            </button>
          </>
        ) : (
          <p className="text-yellow-700">Connected as {account}</p>

        )}
        <p className="mt-6 text-yellow-800">
          New to FunLearn?{' '}
          <Link href="/sign-up" className="font-semibold underline">
            Create an account and join the fun!
          </Link>
        </p>
    </SessionLayout>
  );
}
