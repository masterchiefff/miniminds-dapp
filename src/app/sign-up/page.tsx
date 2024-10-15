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

const contractAddress = '0xf1A6e40d86ef1D119f9978B7c5dcd34Ff34566a4';

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

      alert('User registered successfully!');
      setIsRegistered(true);

      // Redirect to dashboard after registration
      router.push('/dashboard');
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="institution" className="block text-yellow-800 font-semibold mb-2">
                Select Institution
              </label>
              <select
                id="institution"
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
                required
              >
                <option value="">Select an institution</option>
                {institutions.map((institution) => (
                  <option key={institution.id} value={institution.id}>
                    {institution.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="role" className="block text-yellow-800 font-semibold mb-2">
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value as 'learner' | 'instructor'); 
                  console.log('Role selected:', e.target.value); 
                }}
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
              >
                <option value="learner">Learner</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
            >
              Register <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </>
      )}

      {isRegistered && <p className="text-green-600 mt-4 text-center">Registration Successful!</p>}
      <p className="mt-6 text-yellow-800 text-center">
        Already have an account?{' '}
        <Link href="/" className="font-semibold underline">
          Log in here
        </Link>
      </p>
    </SessionLayout>
  );
}
