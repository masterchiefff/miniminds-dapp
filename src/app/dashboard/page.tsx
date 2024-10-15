"use client"

import React, { useState } from 'react';
import { useAuth } from '@/hooks/authentication';
import { useRouter } from 'next/navigation';
import { Book, Calendar, Trophy, BarChart2 } from 'lucide-react';
import MainLayout from '@/components/Layouts/mainLayout';

const Dashboard: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tokenBalance, setTokenBalance] = useState<number>(0);

  // const { isRegistered, loading } = useAuth();
  // const router = useRouter();

  // if (!isRegistered) {
  //   router.push('/'); 
  //   return null; 
  // }

  return (
    <MainLayout pageTitle={'Dashboard'} subTitle={undefined}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
            <Book className="h-6 w-6 mr-2 text-yellow-600" />
            Current Course
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-yellow-700">Web3 Development Basics</h3>
            <p className="text-yellow-600">Progress: 60%</p>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <button className="mt-4 bg-yellow-300 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300">
            Continue Learning
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-yellow-600" />
            Upcoming Lessons
          </h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="text-yellow-700">Smart Contract Basics</span>
              <span className="text-yellow-600 text-sm">Tomorrow, 2 PM</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-yellow-700">Solidity Programming</span>
              <span className="text-yellow-600 text-sm">Oct 12, 10 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-yellow-700">DApp Architecture</span>
              <span className="text-yellow-600 text-sm">Oct 15, 3 PM</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
            Achievements
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="bg-yellow-200 rounded-full p-2 mr-3">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-700">Web3 Explorer</p>
                <p className="text-sm text-yellow-600">Completed first Web3 course</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className="bg-yellow-200 rounded-full p-2 mr-3">
                <BarChart2 className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="font-medium text-yellow-700">Blockchain Enthusiast</p>
                <p className="text-sm text-yellow-600">Earned 50 FLT tokens</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">Your Learning Path</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              1
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-yellow-700">Introduction to Blockchain</h3>
              <div className="w-full bg-yellow-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <span className="text-green-500 font-medium">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              2
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-yellow-700">Web3 Development Basics</h3>
              <div className="w-full bg-yellow-200 rounded-full h-2.5 mt-2">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <span className="text-yellow-500 font-medium">In Progress</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-4">
              3
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-yellow-700">Advanced Smart Contracts</h3>
              <div className="w-full bg-yellow-200 rounded-full h-2.5 mt-2">
                <div className="bg-gray-300 h-2.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <span className="text-gray-500 font-medium">Locked</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
