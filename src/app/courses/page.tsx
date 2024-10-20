'use client'

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Star } from 'lucide-react';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';
import CourseSkeleton from '@/components/shared-componets/skeleton';

const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650'; 

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  rating: string;
  students: number;
  tokenPrice: string;
  courseId: number;
}

type UserDetails = {
  institutionId: number; 
};

export default function CoursesPage(): JSX.Element {
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [courses, setCourses] = useState<Course[]>([]);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [userInstitutionId, setUserInstitutionId] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [enrollmentStatus, setEnrollmentStatus] = useState<string>('');
  const [courseEnrollments, setCourseEnrollments] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserDetails = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
  
        const accounts = await web3Instance.eth.getAccounts();
        setWalletAddress(accounts[0]);
  
        const courseContract = new web3Instance.eth.Contract(UserRegistrationABI, contractAddress);
        setContract(courseContract);
  
        const balance = await web3Instance.eth.getBalance(accounts[0]);
        setTokenBalance(web3Instance.utils.fromWei(balance, 'ether'));
  
        const userDetails: UserDetails = await courseContract.methods.getUserDetails(accounts[0]).call() as UserDetails;
        setUserInstitutionId(userDetails.institutionId);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  const fetchCourses = async () => {
    if (contract && userInstitutionId !== null) {
      setIsLoading(true); // Start loading state
      try {
        const allCourses = await contract.methods.getAllCourses().call();
        const filteredCourses = allCourses.filter((course: any) => course.institutionId === userInstitutionId);
  
        const formattedCourses: Course[] = filteredCourses.map((course: any, index: number) => ({
          id: index,
          title: course.title,
          description: course.description,
          level: course.level,
          duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
          rating: (Math.random() * 0.5 + 4.5).toFixed(1),
          students: Math.floor(Math.random() * 1000) + 500,
          tokenPrice: web3!.utils.fromWei(course.mintingPrice, 'ether'),
          courseId: course.id,
        })).reverse(); 
  
        setCourses(formattedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false); // End loading state
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [contract, userInstitutionId]);

  return (
    <MainLayout pageTitle={'Courses'} subTitle={'A List of all your institution\'s courses'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeletons while loading
          Array.from({ length: 3 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">{course.title}</h3>
                <p className="text-yellow-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-yellow-700">{course.level}</span>
                  <span className="text-sm font-medium text-yellow-700">{course.duration}</span>
                </div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-yellow-700 mr-2">{course.rating}</span>
                  <span className="text-sm text-yellow-600">({course.students} students)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-yellow-800">{course.tokenPrice} ETH</span>
                  {courseEnrollments[course.courseId] ? (
                    <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full">
                      Enrolled
                    </div>
                  ) : (
                    <div></div>
                    // <button 
                    //   className="bg-yellow-300 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300" 
                    //   onClick={() => enrollInCourse(course.courseId)}
                    // >
                    //   Enroll Now
                    // </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-yellow-800">No courses available for your institution.</p>
        )}
      </div>
      {enrollmentStatus && (
        <div className="mt-4 text-yellow-800">
          {enrollmentStatus}
        </div>
      )}
    </MainLayout>
  );
}
