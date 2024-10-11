'use client'

import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from '@/contracts/UserRegistrationABI.json'; 
import { ArrowRight } from 'lucide-react';
import SessionLayout from '@/components/Layouts/sessionLayout';
import Link from 'next/link';

const UserRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthdate: '',
    password: '',
  });
=
  const contractAddress = '0x384f50459c350f21AdD079449BD07F8B8dfBEC51';
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3(window.ethereum);
        const web3Instance = new Web3(provider);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts)

        const instance = new web3Instance.eth.Contract(contractABI, contractAddress);
        console.log(instance)

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(instance);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      alert('Please install MetaMask to interact with the DApp.');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (contract && account) {
      try {
        await contract.methods.registerUser(0).send({ from: account });
        console.log('Form Data:', formData);

        alert('User registered successfully on the blockchain!');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <SessionLayout
      title="Create Your Miniminds Account"
      subtitle="Start your exciting learning journey today. Fill out the form below to get started!"
      title1="Join The Fun"
      image="https://i.postimg.cc/7YLJNpCF/image-removebg-preview-2.png"
    >
      <form className="space-y-4" onSubmit={registerUser}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-yellow-800 font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
              placeholder="Your first name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-yellow-800 font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
              placeholder="Your last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="username" className="block text-yellow-800 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Choose a fun username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-yellow-800 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="birthdate" className="block text-yellow-800 font-semibold mb-2">
            Birthdate
          </label>
          <input
            type="date"
            id="birthdate"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800"
            value={formData.birthdate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-yellow-800 font-semibold mb-2">
            Create Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
            placeholder="Create a secure password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="button"
          onClick={connectWallet}
          className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
        >
          Connect Wallet
        </button>

        <button
          type="submit"
          className="w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300 flex items-center justify-center"
        >
          Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </form>

      <p className="mt-6 text-yellow-800 text-center">
        Already have an account?{' '}
        <Link href="/" className="font-semibold underline">
          Log in here
        </Link>
      </p>
    </SessionLayout>
  );
};

export default UserRegistration;
