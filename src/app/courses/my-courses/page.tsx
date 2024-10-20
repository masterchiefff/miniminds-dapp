'use client';

import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Link from 'next/link';
import ABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';

// Type definitions
interface Course {
  id: string;
  title: string;
  creator: string;
  description: string;
  mintingPrice: string;
}

let web3: Web3 | undefined;
if (typeof window !== 'undefined') {
  web3 = new Web3(window.ethereum as any);
}

const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650';
const courseContract = web3 ? new web3.eth.Contract(ABI as any, contractAddress) : null;

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="h-6 bg-yellow-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-yellow-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-yellow-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-yellow-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-yellow-200 rounded w-1/2 mb-4"></div>
        <div className="bg-gray-300 rounded-full w-full h-10"></div>
      </div>
    </div>
  );
};

const ViewCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!web3 || !courseContract) return;

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts: string[] = await web3.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);

        const coursesData: Course[] = await courseContract.methods.getCoursesByCreator(account).call();
        console.log(coursesData);

        setCourses(coursesData.reverse());
      } catch (error: any) {
        console.error('Error fetching courses:', error.message);
        setErrorMessage('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false); // Stop loading once courses are fetched
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
        {loading ? ( // Show skeletons when loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.length > 0 ? (
              courses.map((course, index) => (
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
                    <div className="">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-yellow-700 mb-1">Course Description</h4>
                        <p className="text-yellow-800">{course.description}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-yellow-700 mb-1">Course Price</h4>
                        <p className="text-yellow-800">{web3?.utils.fromWei(course.mintingPrice, 'ether')} ETH</p>
                      </div>
                    </div>

                    <Link href={`/courses/${course.id}`} className="w-full bg-yellow-300 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300 flex items-center justify-center">
                      View Course
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-yellow-600">You haven't created any courses yet.</p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ViewCourses;
