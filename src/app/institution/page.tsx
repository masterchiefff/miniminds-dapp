'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json'

// Initialize Web3
const web3 = new Web3(window.ethereum);

// Replace with your contract ABI and address
const contractABI = UserRegistrationABI;

const contractAddress = "0x0c8926D3170a2657802CCfdb68Eff372A27d5d12"; 

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default function InstitutionRegistration() {
const [institutionName, setInstitutionName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [password, setPassword] = useState('');
  const [institutionIdToActivate, setInstitutionIdToActivate] = useState(''); // State for institution ID
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const institutionCount = await contract.methods.institutionCount().call();
      let institutionExists = false;


      console.log(institutionCount)
      for (let i = 0; i < institutionCount; i++) {
        const institution = await contract.methods.institutions(i).call();
        if (institution.name === institutionName) {
          institutionExists = true;
          break;
        }
      }

      if (institutionExists) {
        alert('An institution with this name already exists. Please choose a different name.');
      } else {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const creator = accounts[0];

        await contract.methods.createInstitution(institutionName).send({ from: creator });
        alert('Institution registered successfully!');
        router.push('/sign-up'); // Redirect to a success page or another route
      }
    } catch (error) {
      console.error('Error registering institution:', error);
      alert('An error occurred while registering the institution. Please try again.');
    }
  };

  const handleActivateInstitution = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        // Convert institutionIdToActivate to uint256
        const institutionId = parseInt(institutionIdToActivate, 10);
        if (isNaN(institutionId) || institutionId < 0) {
            alert('Please enter a valid Institution ID.');
            return;
        }

        // Estimate gas for the transaction
        const gasEstimate = await contract.methods.activateInstitution(institutionId).estimateGas({ from: account });

        // Send transaction to activate the institution
        await contract.methods.activateInstitution(institutionId).send({ from: account, gas: gasEstimate });

        alert('Institution activated successfully!');
    } catch (error) {
        console.error('Error activating institution:', error);
        alert('An error occurred while activating the institution. Please try again.');
    }
};

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center">
        <div className="bg-yellow-100 rounded-3xl p-8 shadow-lg md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-yellow-900 mb-2">Join FunLearn!</h1>
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Register Your Institution</h2>
          <p className="text-yellow-800 mb-6">
            Empower your students with interactive learning experiences. Fill out the form below to get started!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="institutionName" className="block text-yellow-800 font-semibold mb-2">
                Institution Name
              </label>
              <input
                type="text"
                id="institutionName"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
                placeholder="Enter your institution's full name"
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
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
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
            {/* <button
              type="button" // Use button type instead of submit
              onClick={handleActivateInstitution}
              className="w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300"
            >
              Activate Institution
            </button> */}
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
        </div>
        <div className="md:w-1/3 md:pl-8 flex flex-col items-center">
          <img
            src="/placeholder.svg?height=300&width=300"
            alt="Happy students"
            className="max-w-full h-auto mb-4"
          />
          <div className="bg-yellow-200 p-4 rounded-lg text-yellow-800 text-center">
            <h3 className="font-bold text-lg mb-2">Why Join FunLearn?</h3>
            <ul className="list-disc list-inside text-left">
              <li>Interactive learning experiences</li>
              <li>Customizable curriculum</li>
              <li>Progress tracking tools</li>
              <li>Engaging educational content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}