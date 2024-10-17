'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'firebase/firebase';
import bcrypt from 'bcryptjs';

interface Institution {
  name: string;
}

type Contract = {
  methods: {
    institutionCount: () => { call: () => Promise<string> };
    institutions: (index: number) => { call: () => Promise<Institution> };
    createInstitution: (name: string, password: string) => { send: (options: { from: string }) => Promise<any> };
    activateInstitution: (id: number) => { send: (options: { from: string; gas: string }) => Promise<any> };
  };
};

const InstitutionRegistration: React.FC = () => {
  const [institutionName, setInstitutionName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [institutionType, setInstitutionType] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [institutionIdToActivate, setInstitutionIdToActivate] = useState<string>('');
  const [contract, setContract] = useState<Contract | null>(null); // State for the contract instance
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ""; // Use environment variable
      const contractInstance = new web3.eth.Contract(UserRegistrationABI, contractAddress);
      setContract(contractInstance);
    } else {
      console.error('Ethereum wallet is not available. Please install MetaMask or another wallet.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract) {
      alert('Contract is not available. Please try again later.');
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const institutionCount: string = await contract.methods.institutionCount().call();
      let institutionExists = false;

      for (let i = 0; i < parseInt(institutionCount); i++) {
        const institution: Institution = await contract.methods.institutions(i).call();
        if (institution.name === institutionName) {
          institutionExists = true;
          break;
        }
      }

      if (institutionExists) {
        alert('An institution with this name already exists. Please choose a different name.');
      } else {
        // Hash the password before proceeding
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const creator = accounts[0];

        // Pass the hashed password to the contract or save it to the database
        await contract.methods.createInstitution(institutionName, hashedPassword).send({ from: creator });
        alert('Institution registered successfully!');
        router.push('/sign-up');
      }
    } catch (error) {
      console.error('Error registering institution:', error);
      alert('An error occurred while registering the institution. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleActivateInstitution = async () => {
    if (!contract) {
      alert('Contract is not available. Please try again later.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const institutionId = parseInt(institutionIdToActivate, 10);
      if (isNaN(institutionId) || institutionId < 0) {
        alert('Please enter a valid Institution ID.');
        return;
      }

      const gasEstimate = await contract.methods.activateInstitution(institutionId).estimateGas({ from: account });
      await contract.methods.activateInstitution(institutionId).send({ from: account, gas: gasEstimate.toString() });
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Registering...' : 'Register Institution'}
            </button>
          </form>
          <p className="mt-6 text-yellow-800 text-center">
            Already registered?{' '}
            <Link href="/sign-up" className="text-yellow-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Activation Section */}
        <div className="bg-yellow-100 rounded-3xl p-8 shadow-lg md:w-1/3 ml-4">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Activate Your Institution</h2>
          <p className="text-yellow-800 mb-6">If you have an Institution ID, activate it here.</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="institutionId" className="block text-yellow-800 font-semibold mb-2">
                Institution ID
              </label>
              <input
                type="text"
                id="institutionId"
                value={institutionIdToActivate}
                onChange={(e) => setInstitutionIdToActivate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
                placeholder="Enter Institution ID"
              />
            </div>
            <button
              onClick={handleActivateInstitution}
              className="w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300"
            >
              Activate Institution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionRegistration;
