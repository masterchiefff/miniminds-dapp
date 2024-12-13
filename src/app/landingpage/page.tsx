
"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import personalizedLearningImg from '/public/assets/icons/personalized-learning.png';
import tokenRewardsImg from '/public/assets/icons/rewards.png';
import crowdfundingImg from '/public/assets/icons/crowdfunding.png';
import progressTrackingImg from '/public/assets/icons/progress-tracking.png';
import peerLearningImg from '/public/assets/icons/peer-learning.png';
import MiniMinds from '/public/assets/images/MiniMinds-Learning-Dashboard.png';

import kids2 from './public/assets/images/kids3.jpeg';
//import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Features from '@/components/WhyMiniMinds';

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-200 p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">MiniMinds</div>
        <ul className="flex space-x-6 text-lg">
          <li><a href="#features" className="text-blue-800 hover:underline">Features</a></li>
          <li><a href="#why" className="text-blue-800 hover:underline">Why MiniMinds</a></li>
          <li><a href="#donate" className="text-blue-800 hover:underline">Donate</a></li>
          <li><a href="#partners" className="text-blue-800 hover:underline">Partners</a></li>
        </ul>
        <button className="bg-green-200 text-purple-800 px-4 py-2 rounded-lg shadow-md hover:bg-green-300">Connect Wallet</button>
      </nav>

      {/* Hero Section */}
      
      {/*<section className="min-h-full bg-yellow-300 flex flex-col-reverse md:flex-row items-center px-6 sm:px-10 py-12 md:py-0">
      */}
      <section className="relative overflow-hidden bg-green-200 min-h-[600px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900"
            >
              Welcome to <span className="text-secondary text-purple-600">Mini</span>
              <span className="text-primary text-green-600">Minds</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              A decentralized learning platform where kids aged 5-17 can learn, play, and earn through interactive lessons in math, science, and coding.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              
            </motion.div>
            <div className='py-2'>
            <button className="bg-green-500 rounded-lg hover:bg-green-300 text-white-800 px-4 py-2 mr-2 shadow-md "> Join as a student</button>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-md border-purple-600  shadow-md ">Become an instructor</button>

            </div>
            
          </div>
          <div className="relative hidden md:block">
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="rounded-lg shadow-xl">
              <Image
              src="/assets/images/MiniMinds-Learning-Dashboard.png"

              alt="MiniMinds Learning Dashboard"
              width={800}
              height={800}
              />
              </motion.div>
          </div>


        </div>
      </div>
    
    
    </section>

      {/* Why MiniMinds Section */}
      <Features />
     
      <section>
      

        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">Why  Choose MiniMinds?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-lg text-blue-800">
              <p>In many rural areas, teachers are overwhelmed, managing over 70 students at a time. Only the brightest receive attention, leaving many kids behind. MiniMinds provides personalized learning to ensure every child gets the education they deserve.</p>
            </div>
            <div className="text-lg text-blue-800">
              <p>Our token-based system rewards students for their achievements and teachers for their contributions. Through partnerships with governments, NGOs, and the private sector, we help children access better learning tools and funding for schools.</p>
            </div>
          </div>
        </div>
      </section>

      {/*features section */}
      <section id="features" className="bg-blue-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-purple-800 text-center mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          { /*Decentralization Feature */ }
          <div className='p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105'>
            <div className='flex justify-center'> 
              <Image src= {peerLearningImg} alt="Peer Learning" width={80} height={80}/>
            </div>
            <h3 className='text-2xl font-bold text-purple-800 text-center'> Decentralization </h3>
            <p className='text-blue-800 mt-2 text-center'> Empowers our tutors with full control over their educational content and data. 
              For students, it offers transparent access to learning materials and personalized educational experiences.</p>
          </div>
          
          {/* Personalized Learning Feature */}
          <div className="p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <Image src={personalizedLearningImg} alt="Personalized Learning" width={80} height={80} />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mt-4 text-center">Personalized Learning</h3>
            <p className="text-blue-800 mt-2 text-center">Tailored education plans for every child, based on their strengths and areas of improvement.</p>
          </div>

          {/* Token-Based Rewards Feature */}
          <div className="p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <Image src={tokenRewardsImg} alt="Token-Based Rewards" width={80} height={80} />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mt-4 text-center">Token-Based Rewards</h3>
            <p className="text-blue-800 mt-2 text-center">Students and teachers earn tokens for their efforts, which can be used for further education or community contributions.</p>
          </div>

          {/* Crowdfunding Feature */}
          <div className="p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <Image src={crowdfundingImg} alt="Crowdfunding for Schools" width={80} height={80} />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mt-4 text-center">Crowdfunding for Schools</h3>
            <p className="text-blue-800 mt-2 text-center">Raise funds for rural schools to buy gadgets, infrastructure, and provide better learning experiences.</p>
          </div>

          {/* Progress Tracking Feature */}
          <div className="p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <Image src={progressTrackingImg} alt="Progress Tracking" width={80} height={80} />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mt-4 text-center">Progress Tracking</h3>
            <p className="text-blue-800 mt-2 text-center">Teachers and parents can track students’ progress through detailed reports and dashboards.</p>
          </div>

          {/* Peer Learning Feature */}
          <div className="p-6 bg-yellow-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <Image src={peerLearningImg} alt="Peer Learning" width={80} height={80} />
            </div>
            <h3 className="text-2xl font-bold text-purple-800 mt-4 text-center">Peer-to-Peer Learning</h3>
            <p className="text-blue-800 mt-2 text-center">Students can collaborate and learn from each other in a supportive community-driven environment.</p>
          </div>

        </div>
      </div>
    </section>


     {/* Donate Section */}
<section id="donate" className="bg-blue-200 py-16">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold text-purple-900 mb-6">Be the Change – Donate Today</h2>
    <p className="text-blue-900 text-lg mb-8">
      Your contribution helps provide access to quality education for children in underserved communities.
      Whether you're an NGO, a corporation, or an individual, your support makes a world of difference. Help us empower the next generation by giving them the tools to succeed.
    </p>
    
    <div className="flex justify-center items-center space-x-4 mb-12">
      <div className="p-6 bg-green-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-purple-800">NGOs</h3>
        <p className="text-blue-900 mt-2">Partner with us and together, we can reach more children and provide them with opportunities to thrive.</p>
      </div>
      <div className="p-6 bg-green-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-purple-800">Corporate Donors</h3>
        <p className="text-blue-900 mt-2">Align your brand with a powerful cause and make a lasting impact by supporting educational initiatives.</p>
      </div>
      <div className="p-6 bg-green-200 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-purple-800">Individuals</h3>
        <p className="text-blue-900 mt-2">Every bit counts. No donation is too small when it comes to changing lives through education.</p>
      </div>
    </div>
    
    <p className="text-lg text-blue-900 mb-6">All donations are securely processed, and you'll receive a detailed report on how your contribution is being used.</p>
    
    <Link href="/donations">
      <button className="bg-purple-800 text-white px-10 py-4 rounded-lg shadow-xl hover:bg-purple-900 transition duration-300">
        Donate Now
      </button>
    </Link>
    
    <p className="text-sm text-blue-800 mt-4">For any questions about donations, please <a href="/contact" className="text-purple-800 underline">contact us</a>.</p>
  </div>
</section>


      {/* Partners Section */}
      <section id="partners" className="bg-green-200 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-purple-800">Our Partners</h2>
          <p className="text-blue-800 text-lg mt-4">We partner with governments, NGOs, and the private sector to bring our vision to life.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <img src="/assets/images/patner3.png" alt="Partner 1" className="mx-auto"/>
            <img src="/assets/images/patner4.png" alt="Partner 2" className="mx-auto"/>
            <img src="/assets/images/patner1.jpeg" alt="Partner 3" className="mx-auto"/>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-200 py-6 text-center">
        <p className="text-blue-800">&copy; {new Date().getFullYear()} MiniMinds. All Rights Reserved.</p>
      </footer>
    </div>
  );
};



export default LandingPage;