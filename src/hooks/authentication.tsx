'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import contractABI from '@/contracts/UserRegistrationABI.json';

export const useAuth = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const contractAddress = process.env.CONTRACT_ADDRESS; 
  let web3;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      web3 = new Web3(window.ethereum);
    }
  }, []);

  useEffect(() => {
    const checkUserRegistration = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const userDetails = await contract.methods.getUserDetails(walletAddress).call();
          
          if (userDetails.isRegistered) {
            setIsRegistered(true);
          } else {
            router.push('/'); 
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          router.push('/'); 
        }
      } else {
        router.push('/'); 
      }

      setLoading(false);
    };

    if (web3) {
      checkUserRegistration();
    }
  }, [router, web3]);

  return { isRegistered, loading };
};
