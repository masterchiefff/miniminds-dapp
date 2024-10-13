'use client';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Link from 'next/link'; // Import Next.js Link component
import ABI from '@/contracts/UserRegistrationABI.json'; 
import MainLayout from '@/components/Layouts/mainLayout'

// Initialize web3 instance
let web3;
if (typeof window !== 'undefined') {
  web3 = new Web3(window.ethereum);
}

const contractAddress = '0xf1A6e40d86ef1D119f9978B7c5dcd34Ff34566a4'; // Replace with your contract address
const courseContract = new web3.eth.Contract(ABI, contractAddress);

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [account, setAccount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Ensure the user is connected to their MetaMask wallet
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);

        // Fetch courses created by the user
        const coursesData = await courseContract.methods.getCoursesByCreator(account).call();
        console.log(coursesData);

        // Store the courses in the state
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        setErrorMessage('Failed to load courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  return (
    <MainLayout pageTitle={'My courses'} subTitle={'Courses Created by You'}>

        <div className="mb-6">
          <Link href="/courses/new" className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 inline-block">
              Create New Course
          </Link>
        </div>

        <div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {courses.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {courses.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-2">{course.title}</h3>
                    <p className="text-yellow-600 mb-4">Instructor: {course.creator}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-yellow-600 mb-1">
                        <span>Progress</span>
                        <span>0%</span>
                      </div>
                      <div className="w-full bg-yellow-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                      </div>
                    </div>
                    <div className=''>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-yellow-700 mb-1">Course Description</h4>
                        <p className="text-yellow-800">{course.description}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-yellow-700 mb-1">Course Price</h4>
                        <p className="text-yellow-800">{web3.utils.fromWei(course.mintingPrice, 'ether')} ETH</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-yellow-300 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300 flex items-center justify-center">
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>You haven't created any courses yet.</p>
          )}
        </div>
    </MainLayout>
  );
};

export default ViewCourses;
