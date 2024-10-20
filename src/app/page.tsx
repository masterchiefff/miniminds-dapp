"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Web3 from 'web3';
import SessionLayout from '@/components/Layouts/sessionLayout';
import userRegistrationABI from '@/contracts/UserRegistrationABI.json';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';

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

interface LoginState {
  isConnected: boolean;
  account: string | null;
}

export default function Login() {
  const [state, setState] = useState<LoginState>({
    isConnected: false,
    account: null,
  });
  const router = useRouter();
  const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650';
  const [contract, setContract] = useState<any>(null); 

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setState({ isConnected: true, account: accounts[0] });
          const userContract = new web3.eth.Contract(userRegistrationABI, contractAddress);
          if (!web3.utils.isAddress(contractAddress)) {
            throw new Error("Invalid contract address.");
          }
          setContract(userContract);
  
          await handleLogin(accounts[0], userContract); 
        }
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  };
  
  const handleLogin = async (walletAddress: string, userContract: any) => {
    if (!userContract) {
      console.error("Contract is not initialized.");
      return;
    }
  
    try {
      const userRole = await userContract.methods.getUserDetails(walletAddress).call();   
      if (userRole && userRole.isInstructor !== undefined) {
        if (userRole.isInstructor) {
          router.push('/dashboard/'); 
        } else {
          router.push('/dashboard/learner');
        }
      } else {
        console.log("User role is not recognized.");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  

  return (
    <SessionLayout 
      title={'Login to Miniminds'} 
      subtitle={'Connect your wallet to log in'} 
      title1={'Minimind is all about fun'} 
      image={'https://i.postimg.cc/t4K1pJrb/boy-jumping-air-with-backpack-his-back-608506-11629-1-1-removebg-preview.png'}>
      {!state.isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Connect Wallet to Login
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-end">
            <Wallet className='w-full'>
              <ConnectWallet className='w-full'>
                <Avatar className="h-6 w-6" />
                <Name />
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
          {/* Login button after wallet connection */}
          <button
            onClick={() => handleLogin(state.account as string, contract)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Login
          </button>
        </div>
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
