import React from 'react';
import Link from 'next/link';

interface SessionLayoutParams {
  title: string;
  subtitle: string;
  title1: string;
  children: React.ReactNode; // Use React.ReactNode for children
  image: string;
}

export default function SessionLayout({
  children,
  title,
  subtitle,
  title1,
  image,
}: SessionLayoutParams) {
  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center">
        <div className="bg-yellow-100 rounded-3xl p-8 shadow-lg md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-2">{title1}</h2>
          <h1 className="text-4xl font-bold text-yellow-900 mb-4">{title}</h1>
          <p className="text-yellow-800 mb-6">{subtitle}</p>
          {children}
        </div>
        <div className="md:w-1/2 md:pl-8 flex justify-center">
          <img
            src={image}
            alt="Excited learner"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
