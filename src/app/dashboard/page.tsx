"use client"
import React, { useState } from 'react'
import { Book, Calendar, Trophy, BarChart2, Bell, Search, User, Home, Bookmark, Settings, HelpCircle, LogOut, Wallet } from 'lucide-react'

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [tokenBalance, setTokenBalance] = useState(0)

  const connectWallet = () => {
    // Simulating MetaMask connection
    setIsConnected(true)
    setTokenBalance(100) // Example initial balance
  }

  return (
    <div className="min-h-screen bg-yellow-100 flex">
      {/* Sidebar */}
      <aside className="bg-yellow-300 w-64 p-6 hidden md:block">
        <h1 className="text-2xl font-bold text-yellow-900 mb-8">FunLearn Web3</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Book className="h-5 w-5 mr-3" />
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Bookmark className="h-5 w-5 mr-3" />
                Saved
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Trophy className="h-5 w-5 mr-3" />
                Achievements
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Wallet className="h-5 w-5 mr-3" />
                Tokens
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-yellow-800 hover:text-yellow-600">
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </a>
            </li>
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
            <h1 className="text-2xl font-bold text-yellow-900 md:hidden">FunLearn Web3</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-8 pr-4 py-2 rounded-full bg-yellow-200 text-yellow-800 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Search className="absolute left-2 top-2.5 h-5 w-5 text-yellow-600" />
              </div>
              <button className="relative">
                <Bell className="h-6 w-6 text-yellow-800" />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full hover:bg-yellow-500 transition duration-300">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Web3 Wallet Connection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                <Wallet className="h-6 w-6 mr-2 text-yellow-600" />
                Web3 Wallet
              </h2>
              {isConnected ? (
                <div>
                  <p className="text-yellow-700 mb-2">Connected to MetaMask</p>
                  <p className="text-yellow-600">Token Balance: {tokenBalance} FLT</p>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-yellow-300 text-yellow-800 px-4 py-2 rounded-full hover:bg-yellow-400 transition duration-300"
                >
                  Connect MetaMask
                </button>
              )}
            </div>

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
          </div>
        </main>
      </div>
    </div>
  )
}