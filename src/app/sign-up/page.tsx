'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from '@/contracts/UserRegistrationABI.json'; 
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SessionLayout from '@/components/Layouts/sessionLayout';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import Link from 'next/link';
import { db } from '@/lib/firebase'; // Import your Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods

const contractAddress = '0x949474c73770874D0E725772c6f0de4CF234913e';

interface Institution {
  id: number;
  name: string;
}

export default function UserRegistration() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>('');
  const [role, setRole] = useState<'learner' | 'instructor'>('learner'); 
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [name, setName] = useState<string>(''); // State for name
  const [email, setEmail] = useState<string>(''); // State for email
  const router = useRouter();

  useEffect(() => {
    loadWeb3();
    fetchInstitutions();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      try {
        const web3 = new Web3('https://sepolia.base.org');
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
      } catch (error) {
        alert('MetaMask connection failed.');
      }
    } else {
      alert('MetaMask not detected.');
    }
  }

  async function fetchInstitutions() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    try {
      const institutionCount: number = await contract.methods.institutionCount().call();
      const fetchedInstitutions: Institution[] = [];
  
      for (let i = 0; i < institutionCount; i++) {
        const institution: any = await contract.methods.institutions(i).call();
  
        if (institution && institution.isActive) {
          fetchedInstitutions.push({ id: i, name: institution.name });
        }
      }
  
      setInstitutions(fetchedInstitutions);
    } catch (error) {
      alert('Error fetching institutions from the contract.');
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!walletAddress) {
      alert('Please connect your wallet.');
      return;
    }

    if (!selectedInstitution) {
      alert('Please select an institution.');
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);

      let gasEstimate: number;
      let method: any;

      if (role === 'instructor') {
        method = contract.methods.registerInstructor(selectedInstitution);
      } else {
        method = contract.methods.registerUser(selectedInstitution);
      }

      gasEstimate = await method.estimateGas({ from: walletAddress });

      // Send transaction
      await method.send({ from: walletAddress, gas: gasEstimate });

      // Store the name in Firestore
      await addDoc(collection(db, 'users'), {
        walletAddress: walletAddress,
        name: name,
        email: email,
        institution: selectedInstitution,
      });

      alert('User registered successfully!');
      setIsRegistered(true);

      if (role === 'instructor') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/learner');
      }
    } catch (error: any) {
      alert(`Registration failed: ${error.data.message}`);
    }
  }

  async function handleConnectWallet() {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
      } else {
        alert('MetaMask not detected.');
      }
    } catch (error) {
      alert('Failed to connect MetaMask.');
    }
  }

  return (
    <SessionLayout title={'Register to miniminds'} subtitle={'Please connect your MetaMask wallet.'} title1={'join the fun'} image={'https://i.postimg.cc/t4K1pJrb/boy-jumping-air-with-backpack-his-back-608506-11629-1-1-removebg-preview.png'}>
      {!walletAddress ? (
        <div className="text-center">
          <button
            onClick={handleConnectWallet}
            className="bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg"
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-start mb-4">
            <Wallet className='w-full'>
              <ConnectWallet  className='w-full'>
                <Avatar className="h-6 w-6" />
                <Name className='w-full'/>
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address className={color.foregroundMuted} />
                  <EthBalance />
                </Identity>
                <WalletDropdownBasename />
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        
          <form onSubmit={handleRegister} className="flex flex-col items-center">
            <div className='mb-2 w-full'>
              <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
                required
              />
            </div>
            <div className='mb-2 w-full'>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
                required
              />
            </div>
            <div className='mb-2 w-full'>
              <select 
                value={selectedInstitution} 
                onChange={(e) => setSelectedInstitution(e.target.value)} 
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800"
                required
              >
                <option value="">Select Institution</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-2 w-full'>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value as 'learner' | 'instructor')} 
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800"
                required
              >
                <option value="learner">Learner</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full">
              Register
            </button>
          </form>
        </>
      )}
    </SessionLayout>
  );
}
