"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import Web3 from 'web3';
import SessionLayout from '@/components/Layouts/sessionLayout';
import userRegistrationContract from '@/contracts/registration';

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
import web3 from 'web3';

interface InstitutionInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
  password: string;
}

async function connectWallet(): Promise<string | undefined> {
  if (window.ethereum) {
    try {
      const accounts: string[] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error('User denied account access', error);
    }
  } else {
    console.log('Please install MetaMask!');
  }
}

const InstitutionRegistration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string | undefined>();

  const createInstitution = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fromAddress = await connectWallet();
    if (!fromAddress) return; 

    try {
      const tx = await userRegistrationContract.methods.createInstitution(name).send({ from: fromAddress });
      console.log('Institution created:', tx);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setType('');
      setPassword('');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  const handleWalletConnect = async () => {
    try {
      const accounts = await web3.eth.requestAccounts(); // Use Web3 to get accounts
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log('Connected wallet address:', accounts[0]);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      console.log('Wallet connected:', walletAddress);
    }
  }, [walletAddress]);

  return (
    <SessionLayout 
      title={'Register Your Institution'}
      subtitle={'Empower your students with interactive learning experiences. Fill out the form below to get started!'}
      title1={'Join Miniminds'}
      image={'https://i.postimg.cc/7YLJNpCF/image-removebg-preview-2.png'}>
      
      <form className="space-y-4" onSubmit={createInstitution}>
        <div>
          <label htmlFor="institutionName" className="block text-yellow-800 font-semibold mb-2">
            Institution Name
          </label>
          <input
            type="text"
            id="institutionName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Enter your institution's full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-yellow-800 font-semibold mb-2">
            Official Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Enter your institution's official email"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-yellow-800 font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Enter your institution's phone number"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-yellow-800 font-semibold mb-2">
            Address
          </label>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Enter your institution's full address"
          ></textarea>
        </div>
        <div>
          <label htmlFor="type" className="block text-yellow-800 font-semibold mb-2">
            Institution Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800"
          >
            <option value="">Select institution type</option>
            <option value="primary">Primary School</option>
            <option value="secondary">Secondary School</option>
            <option value="college">College</option>
            <option value="university">University</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="password" className="block text-yellow-800 font-semibold mb-2">
            Create Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Create a secure password"
          />
        </div>
        <div className="flex justify-end">
          <Wallet>
            <ConnectWallet onClick={handleWalletConnect}>
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
        <button
          type="submit"
          className="w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300"
        >
          Register Institution
        </button>
      </form>
      <p className="mt-6 text-yellow-800 text-center">
        Already registered?{' '}
        <Link href="/login" className="font-semibold underline">
          Log in here
        </Link>
      </p>
    </SessionLayout>
  );
}

export default InstitutionRegistration;