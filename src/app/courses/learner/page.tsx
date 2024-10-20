'use client';

import { useState, useEffect } from "react";
import DashLayout from "@/components/Layouts/dashLayout";
import { Book, Search, Filter, Clock, Award, ChevronRight } from 'lucide-react';
import Web3 from 'web3';
import Link from 'next/link'; // Import Link
import contractABI from "@/contracts/UserRegistrationABI.json";

interface Course {
    id: string;
    title: string;
    category: string;
    level: string;
    duration: string;
    reward: number;
}

export default function LearnerCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const contractAddress: string = "0x22790A4E84Ba310939A659969aAF22635fc9CEcB"; 
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null); 

    useEffect(() => {
        const initializeWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
    
                const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
                setContract(contractInstance);
    
                try {
                    const accounts = await web3Instance.eth.getAccounts();
                    if (accounts && accounts.length > 0) {
                        // Fetch course data from the contract
                        const courseData = await contractInstance.methods.getAllCourses().call({ from: accounts[0] });
                        
                        // Check if courseData is an array before mapping
                        if (Array.isArray(courseData)) {
                            const formattedCourses: Course[] = courseData.map((course: any, index: number) => ({
                                id: index.toString(), // Mock id, replace with actual course id
                                title: course.title,
                                category: course.category,
                                level: course.level || 'N/A',
                                duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
                                reward: course.reward
                            }));
                
                            setCourses(formattedCourses);
                        } else {
                            console.warn("No courses found or returned data is not an array.");
                            setCourses([]); // Set an empty array if no courses found
                        }
                    }
                } catch (error) {
                    console.error("Error fetching courses:", error);
                    setCourses([]); // Handle errors by setting courses to an empty array
                }
            } else {
                alert('Please install MetaMask');
            }
        };
    
        initializeWeb3();
    }, []);

    function capitalizeFirstLetter(title: string) {
        return title.charAt(0).toUpperCase() + title.slice(1);
    }
    
    return (
        <DashLayout>
            <div className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">Learn</h1>

                {/* Search and Filter */}
                <div className="flex mb-6 gap-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search for courses"
                            className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-blue-300 focus:outline-none focus:border-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-blue-400" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                {/* Course Categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['Math', 'Science', 'Language', 'Art'].map((category, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                                <Book className="text-blue-500" />
                            </div>
                            <h3 className="font-semibold text-blue-600">{category}</h3>
                        </div>
                    ))}
                </div>

                {/* Course List */}
                <div className="space-y-4">
                    {courses.length === 0 ? (
                        <p>No courses available.</p>
                    ) : (
                        courses.map((course, index) => (
                            <Link key={index} href={`/courses/learner/course-details/${course.id}`} passHref>
                                <div className="bg-white rounded-xl p-6 flex items-center mb-4 gap-4 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <Book className="text-blue-500 w-8 h-8" />
                                    </div>
                                    <div className="flex-1">
                                        {/* Make the course title a link */}
                                        <Link href={`/courses/learner/course-details/${course.id}`} passHref>
                                            <h3 className="text-xl font-semibold text-blue-600 mb-2">
                                                {capitalizeFirstLetter(course.title)}
                                            </h3>
                                        </Link>
                                        <div className="flex gap-4 text-sm text-gray-600">
                                            <span>{course.category}</span>
                                            <span>{course.level}</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="bg-yellow-100 rounded-full px-3 py-1 flex items-center">
                                            <span className="font-bold text-yellow-700 mr-1">{course.reward}</span>
                                            <Award className="w-4 h-4 text-yellow-600" />
                                        </div>
                                        <ChevronRight className="text-blue-400" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </DashLayout>
    );
}
