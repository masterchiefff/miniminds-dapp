'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';

// Define types explicitly
type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  tokenPrice: string;
};

const contractAddress = '0xf1A6e40d86ef1D119f9978B7c5dcd34Ff34566a4';

export default function EnrolledCoursesPage() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // Fetch user details and enrolled courses
  const fetchUserDetailsAndCourses = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setWalletAddress(accounts[0]);

        // Connect to the contract
        const courseContract = new web3Instance.eth.Contract(UserRegistrationABI, contractAddress);
        setContract(courseContract);

        // Fetch the enrolled courses
        const courses: string[] = await courseContract.methods.getEnrolledCourses(accounts[0]).call();
        const formattedCourses = await Promise.all(
          courses.map(async (courseId: string) => {
            const courseDetails = await courseContract.methods.getCourseDetails(courseId).call();
            return {
              id: courseId,
              title: courseDetails.title,
              description: courseDetails.description,
              level: courseDetails.institutionId,
              tokenPrice: web3Instance.utils.fromWei(courseDetails.mintingPrice, 'ether'), // Convert mintingPrice from Wei to Ether
            };
          })
        );

        setEnrolledCourses(formattedCourses);
      } catch (error) {
        console.error('Error fetching user details and courses:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  useEffect(() => {
    fetchUserDetailsAndCourses();
  }, []);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">{course.title}</h3>
                <p className="text-yellow-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-800">{course.tokenPrice} ETH</span>
                  <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full">
                    Enrolled
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-yellow-800">You are not enrolled in any courses.</p>
        )}
      </div>
    </MainLayout>
  );
}
