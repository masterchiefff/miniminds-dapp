
"use client"


import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import personalizedLearningImg from '/public/assets/icons/personalized-learning.png';
import tokenRewardsImg from '/public/assets/icons/rewards.png';
import crowdfundingImg from '/public/assets/icons/crowdfunding.png';
import progressTrackingImg from '/public/assets/icons/progress-tracking.png';
import peerLearningImg from '/public/assets/icons/peer-learning.png';
//import './global.css';




import kids2 from './public/assets/images/kids3.jpeg';
//import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Subjects from '@/components/Subjects/page';
//import Features from '@/components/Features/page';
import  Button  from "@/components/ui/button/page";
import Hero from '@/components/HeroSection/page';
import Navigation from '@/components/Navigation/page';
import SubjectsSection from '@/components/Subjects/page';
import FAQ from '@/components/FAQ/page';
import Features from '@/components/Features/page';


const LandingPage = () => {
  return (
    <div>

     <Navigation />
      { /* Hero Section */ }
     
      <section >
      
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 min-h-[600px] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl animate-pulse delay-700"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-secondary">
                🎉 Learning made fun!
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Mini
              </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minds
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Join our magical learning adventure! 🚀 Explore exciting lessons in math, science, and coding while earning rewards along the way! 
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg group">
                Start Learning
                <span className="ml-2 group-hover:rotate-12 transition-transform">🎮</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary text-secondary hover:bg-secondary hover:text-white text-lg group"
              >
                Become a Teacher
                <span className="ml-2 group-hover:rotate-12 transition-transform">📚</span>
              </Button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              <img
                src="/assets/images/MiniMinds-Learning-Dashboard.png"
                alt="MiniMinds Learning Dashboard"
                className="rounded-2xl shadow-xl relative z-10 animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10 transform translate-y-4"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    
      </section>
      <Features />

      
      
      
     
   

      {/* Why MiniMinds Section */}
      <Subjects />
     
    

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
    <section>
      <Subjects />
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
      
      <FAQ />

      {/* Footer */}
      <footer className="bg-purple-200 py-6 text-center">
        <p className="text-blue-800">&copy; {new Date().getFullYear()} MiniMinds. All Rights Reserved.</p>
      </footer>
    </div>
  );
};



export default LandingPage;