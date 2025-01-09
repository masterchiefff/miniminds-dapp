
"use client"


import React from 'react';
import { useToast } from '@/components/ui/use-toast/page';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
import FeaturesSection from '@/components/FeaturesSection/page';
import JoinSection from '@/components/JoinSection/page';
import DonationSection from '@/components/DonationSection/page';


const LandingPage = () => {
  //initialize the router
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    toast({
      title: "Welcome to MiniMinds! 🚀",
      description: "Start your learning journey today!",
      duration: 5000,
    });
  }, []); 
  

    
  return (
    <div>


     <Navigation />
      { /* Hero Section */ }
     
      <section >
      
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/10 min-h-[600px] flex items-center">
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
              <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
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
              <Button 
               onClick={() => router.push('/login')}

              size="lg" className="bg-green-400 hover:bg-green-500 text-lg group">
                Start Learning
                <span className="ml-2 group-hover:rotate-12 transition-transform">🎮</span>
              </Button>
              <Button 

              onClick={() => router.push('/sign-up')}
                size="lg" 
                variant="outline" 
                className="border-purple-500 text-purple-500 hover:bg-purple-600 hover:text-white text-lg group"
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
      
      
      {/* Why MiniMinds Section */}
      <Subjects />
      <JoinSection />
      <Features />
      {/*features section */}
      <FeaturesSection />
      
      {/* Donate Section */}
      <DonationSection />
      <FAQ />

      {/* Footer */}
      <footer className=" bg-gradient-to-br from-primary/5 to-secondary/30 text-white py-10">
  
    {/* About Section */}
   

    
  //<div className="mt-10 text-center border-t border-gray-700 pt-6">
    <p className="text-gray-400">&copy; {new Date().getFullYear()} MiniMinds. All Rights Reserved.</p>
  </div>
</footer>
    </div>
  );
};



export default LandingPage;