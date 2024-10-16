'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import contractABI from '@/contracts/UserRegistrationABI.json';

interface UserDetails {
  isRegistered: boolean;
  // Add other properties of user details if available
}

export const useAuth = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string; // Use NEXT_PUBLIC_ prefix
  const [web3, setWeb3] = useState<Web3 | null>(null); // Initialize web3 as null

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance); // Assign web3 instance to state
    }
  }, []);

  useEffect(() => {
    const checkUserRegistration = async () => {
      if (!web3) return; // Check if web3 is initialized

      const accounts: string[] = await window.ethereum.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const userDetails: UserDetails = await contract.methods.getUserDetails(walletAddress).call();

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

    checkUserRegistration(); // Call the function to check registration
  }, [router, web3]); // Depend on web3

  return { isRegistered, loading };
};
