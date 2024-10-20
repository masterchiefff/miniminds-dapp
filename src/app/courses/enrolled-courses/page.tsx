'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BN from 'bn.js';

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  tokenPrice: string;
};

type CourseDetails = {
  title: string;
  description: string;
  institutionId: string;
  mintingPrice: string;
};

const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650';

export default function EnrolledCoursesPage() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [institutionId, setInstitutionId] = useState<string | null>(null);

  const fetchUserDetailsAndCourses = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is not installed. Please install MetaMask and try again.');
      return;
    }
  
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
  
      const accounts = await web3Instance.eth.getAccounts();
      setWalletAddress(accounts[0]);
  
      const courseContract = new web3Instance.eth.Contract(UserRegistrationABI, contractAddress);
      setContract(courseContract);
  
      // Ensure institution ID is a valid uint256 value using BN.js
      const fetchedInstitutionId = '1'; // Replace with actual logic to get institution ID
      const institutionIdBN = new BN(fetchedInstitutionId); // Use BN.js for conversion
      setInstitutionId(institutionIdBN.toString());
  
      // Fetch enrolled courses using the valid institution ID
      const [users, courses]: [string[], Course[][]] = await courseContract.methods.getAllEnrolledCoursesByInstitution(institutionIdBN).call();
  
      const formattedCourses = await Promise.all(
        users.map(async (userAddress: string, index: number) => {
          const userCourses = courses[index];
          return Promise.all(userCourses.map(async (courseId: string) => {
            const courseDetails = (await courseContract.methods.getCourseDetails(courseId).call()) as CourseDetails;
            return {
              id: courseId,
              title: courseDetails.title,
              description: courseDetails.description,
              level: courseDetails.institutionId,
              tokenPrice: web3Instance.utils.fromWei(courseDetails.mintingPrice, 'ether'),
            };
          }));
        })
      );

      // Flatten the array of arrays into a single array of courses
      const flattenedCourses = formattedCourses.flat();
      
      setEnrolledCourses(flattenedCourses);
      toast.success('Enrolled courses loaded successfully!');
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(`Error fetching user details and courses: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUserDetailsAndCourses();
  }, []);

  return (
    <MainLayout pageTitle={'Enrolled Courses'} subTitle={'These are your enrolled courses'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading courses...</p>
        ) : enrolledCourses.length === 0 ? (
          <p className="text-yellow-600">No enrolled courses yet.</p>
        ) : (
          enrolledCourses.map((course) => (
            <div key={course.id} className="p-4 bg-white rounded shadow">
              <div className="mb-4">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
                <p className="text-sm text-gray-500">Level: {course.level}</p>
                <p className="text-sm text-gray-500">Price: {course.tokenPrice} ETH</p>
              </div>
              <div className="border-t pt-2 mt-2">
                <p className="text-sm text-gray-500">Wallet: {walletAddress}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </MainLayout>
  );
}