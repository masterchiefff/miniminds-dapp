'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  tokenPrice: string;
};

const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650';

export default function EnrolledCoursesPage() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetailsAndCourses = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        setWalletAddress(accounts[0]);

        const courseContract = new web3Instance.eth.Contract(UserRegistrationABI, contractAddress);
        setContract(courseContract);

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
      setLoading(false);
    } else {
      alert('Please install MetaMask');
    }
  };

  useEffect(() => {
    fetchUserDetailsAndCourses();
  }, []);

  return (
    <MainLayout pageTitle={'Enrolled Courses'} subTitle={'These are your enrolled courses'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>loading courses...</p>
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
    </MainLayout>
  );
}
