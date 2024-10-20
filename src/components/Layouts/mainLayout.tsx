"use client";

import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3.js
import { useRouter } from 'next/navigation';
import { Book, Home, Bookmark, Trophy, Settings, HelpCircle, LogOut, Bell } from 'lucide-react';
import ABI from '@/contracts/UserRegistrationABI.json';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename, 
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';

// Define the interface for user details returned from the contract
interface UserDetails {
  isInstructor: boolean; // Adjust this type if necessary
  // Add other properties if necessary
}

interface MainLayoutProps {
  children: React.ReactNode; // Explicitly typing the children prop
  pageTitle: string;
  subTitle: string;
}

export default function MainLayout({ children, pageTitle, subTitle }: MainLayoutProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const router = useRouter();

  const instructorMenu = (
    <>
      <li>
        <a href="/dashboard" className="flex items-center text-yellow-800 hover:text-yellow-600">
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </a>
      </li>
      <li>
        <a href="/courses/my-courses" className="flex items-center text-yellow-800 hover:text-yellow-600">
          <Book className="h-5 w-5 mr-3" />
          My Courses
        </a>
      </li>
      <li>
        <a href="/courses" className="flex items-center text-yellow-800 hover:text-yellow-600">
          <Book className="h-5 w-5 mr-3" />
          Institution Courses
        </a>
      </li>
      <li>
        <a href="/courses/enrolled-courses" className="flex items-center text-yellow-800 hover:text-yellow-600">
          <Book className="h-5 w-5 mr-3" />
          Enrolled Courses
        </a>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-yellow-100 flex">
      {/* Sidebar */}
      <aside className="bg-yellow-300 w-64 p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-yellow-900 mb-8">Miniminds</h1>
        <nav>
          <ul className="space-y-4">
            {instructorMenu}
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <HelpCircle className="h-5 w-5 mr-3" />
                Help
              </a>
            </li>
          </ul>
        </nav>
        <button className="mt-8 flex items-center text-yellow-800 hover:text-yellow-600">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-yellow-300 p-4 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-yellow-900 md:hidden">Miniminds</h1>
            <div className="flex items-center space-between space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-8 pr-4 py-2 rounded-full bg-yellow-200 text-yellow-800 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button className="relative">
                <Bell className="h-6 w-6 text-yellow-800" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex justify-end">
                <Wallet>
                  <ConnectWallet>
                    <Avatar className="h-6 w-6" />
                    <Name />
                  </ConnectWallet>
                  <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address className={color.foregroundMuted} />
                      <EthBalance />
                    </Identity>
                    <WalletDropdownBasename />
                    <WalletDropdownDisconnect />
                  </WalletDropdown>
                </Wallet>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Web3 Wallet Connection */}
            <div className="rounded-lg p-4 mb-2">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                {pageTitle}
              </h2>
              <p className="text-md text-yellow-800 mb-4 flex items-center">{subTitle}</p>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
