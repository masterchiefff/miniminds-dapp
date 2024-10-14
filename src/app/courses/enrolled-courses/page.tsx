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

  //     try {
  //       const web3Instance = new Web3(window.ethereum);
  //       setWeb3(web3Instance);

  //       const accounts = await web3Instance.eth.getAccounts();
  //       setWalletAddress(accounts[0]);

  //       // Connect to the contract
  //       const courseContract = new web3Instance.eth.Contract(UserRegistrationABI, contractAddress);
  //       setContract(courseContract);

  //       // Fetch the enrolled courses
  //       const courses: string[] = await courseContract.methods.getEnrolledCourses(accounts[0]).call();
  //       const formattedCourses = await Promise.all(
  //         courses.map(async (courseId: string) => {
  //           const courseDetails = await courseContract.methods.getCourseDetails(courseId).call();
  //           return {
  //             id: courseId,
  //             title: courseDetails.title,
  //             description: courseDetails.description,
  //             level: courseDetails.institutionId,
  //             tokenPrice: web3Instance.utils.fromWei(courseDetails.mintingPrice, 'ether'), // Convert mintingPrice from Wei to Ether
  //           };
  //         })
  //       );

  //       setEnrolledCourses(formattedCourses);
  //     } catch (error) {
  //       console.error('Error fetching user details and courses:', error);
  //     }
  //   } else {
  //     alert('Please install MetaMask');
  //   }
  // };

  // useEffect(() => {
  //   fetchUserDetailsAndCourses();
  // }, []
  return (
    <MainLayout pageTitle={'Enrolled Course'} subTitle={'These are your enrolled course'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        enrolled courses coming soon
      </div>
    </MainLayout>
  );
}
