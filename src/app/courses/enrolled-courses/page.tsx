'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import UserRegistrationABI from '@/contracts/UserRegistrationABI.json';
import MainLayout from '@/components/Layouts/mainLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BN from 'bn.js';

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  tokenPrice: string;
};

type CourseDetails = {
  title: string;
  description: string;
  institutionId: string;
  mintingPrice: string;
};

const contractAddress = '0x73917610c8924A677622f5682B678a7A0c907650';

export default function EnrolledCoursesPage() {


  return (
    <MainLayout pageTitle={'Enrolled Courses'} subTitle={'These are your enrolled courses'}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <p className="text-yellow-600">No enrolled courses yet.</p>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}