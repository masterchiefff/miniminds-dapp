'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import contractABI from '@/contracts/UserRegistrationABI.json';

interface UserDetails {
  isRegistered: boolean;
}

export const useAuth = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const contractAddress = '0x949474c73770874D0E725772c6f0de4CF234913e' as string;
  const [web3, setWeb3] = useState<Web3 | null>(null);  

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance); 
    }
  }, []);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (!web3) return; 

      const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const userDetails: UserDetails = await contract.methods.getUserDetails(walletAddress).call();
          
          // Log userDetails before setting state
          console.log("userDetails.isRegistered:", userDetails.isRegistered);

          if (userDetails.isRegistered) {
            setIsRegistered(userDetails.isRegistered); 
          } else {
            console.log("User not registered, redirecting...");
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

    checkUserRegistration(); 
  }, [router, web3]);

  // Log isRegistered when it changes
  useEffect(() => {
    console.log("isRegistered state changed to:", isRegistered);
  }, [isRegistered]);

  return { isRegistered, loading };
};
