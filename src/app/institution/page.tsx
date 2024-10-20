'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

interface Institution {
  name: string;
}

const InstitutionRegistration: React.FC = () => {
  const [institutionName, setInstitutionName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [institutionType, setInstitutionType] = useState<string>('');
  const [institutionIdToActivate, setInstitutionIdToActivate] = useState<string>('');
  const [contract, setContract] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contractAddress = "0x22790A4E84Ba310939A659969aAF22635fc9CEcB";
      const contractInstance = new web3.eth.Contract(UserRegistrationABI, contractAddress);
      setContract(contractInstance);
    } else {
      console.error('Ethereum wallet is not available. Please install MetaMask or another wallet.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract) {
      toast.error('Contract is not available. Please try again later.');
      return;
    }

    setIsSubmitting(true); // Start submission

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
        toast.error('An institution with this name already exists. Please choose a different name.');
      } else {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const creator = accounts[0];

        // Register institution on the blockchain
        await contract.methods.createInstitution(institutionName).send({ from: creator });

        // Register institution in MongoDB
        const response = await axios.post('http://localhost:5000/institutions/create', {
          name: institutionName,
          email,
          phoneNo,
          address,
          institutionType,
        });

        if (response.status === 201) { // Check for successful creation
          toast.success('Institution registered successfully!');
          router.push('/sign-up');
        } else {
          toast.error(`MongoDB registration failed with status ${response.status}`);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        toast.error(`Error: ${error.response?.data?.message || 'An error occurred while registering.'}`);
      } else {
        // Handle generic errors
        console.error('Error registering institution:', error);
        toast.error('An error occurred while registering the institution. Please try again.');
      }
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleActivateInstitution = async () => {
    if (!contract) {
      toast.error('Contract is not available. Please try again later.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      const institutionId = parseInt(institutionIdToActivate, 10);
      if (isNaN(institutionId) || institutionId < 0) {
        toast.error('Please enter a valid Institution ID.');
        return;
      }

      const gasEstimate = await contract.methods.activateInstitution(institutionId).estimateGas({ from: account });
      await contract.methods.activateInstitution(institutionId).send({ from: account, gas: gasEstimate.toString() });
      toast.success('Institution activated successfully!');
    } catch (error) {
      console.error('Error activating institution:', error);
      toast.error('An error occurred while activating the institution. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <ToastContainer />
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
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
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
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="college">College</option>
                <option value="university">University</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-yellow-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-50 transition duration-300"
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Registering...' : 'Register Institution'}
            </button>
          </form>
          <p className="mt-6 text-yellow-800 text-center">
            Already registered?{' '}
            <Link href="/login" className="font-semibold underline">
              Log in here
            </Link>
          </p>
        </div>
        <div className="md:w-1/3 flex flex-col bg-yellow-100 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">Activate Institution</h2>
          <input
            type="text"
            value={institutionIdToActivate}
            onChange={(e) => setInstitutionIdToActivate(e.target.value)}
            placeholder="Enter Institution ID to activate"
            className="mb-4 px-3 py-2 rounded-lg bg-yellow-200 text-yellow-800 placeholder-yellow-600"
          />
          <button
            onClick={handleActivateInstitution}
            className="w-full bg-white text-yellow-800 font-bold py-3 rounded-lg hover:bg-yellow-50 transition duration-300"
          >
            Activate
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstitutionRegistration;
