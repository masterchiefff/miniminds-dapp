'use client';

import { useState, useEffect } from "react";
import DashLayout from "@/components/Layouts/dashLayout";
import { Book, Search, Filter, Clock, Award, ChevronRight } from 'lucide-react';
import Web3 from 'web3';
import Link from 'next/link';
import contractABI from "@/contracts/UserRegistrationABI.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Course {
    id: string;
    title: string;
    category: string;
    level: string;
    duration: string;
    reward: number;
    isEnrolled: boolean;
}

export default function LearnerCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const contractAddress: string = "0x73917610c8924A677622f5682B678a7A0c907650"; 
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null); 
    const [account, setAccount] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

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
                        setAccount(accounts[0]);
                        await fetchCourses(contractInstance, accounts[0]);
                    }
                } catch (error) {
                    console.error("Error initializing web3:", error);
                    toast.error("Failed to connect to your wallet. Please try again.");
                }
            } else {
                toast.error('Please install MetaMask to use this application');
            }
        };
    
        initializeWeb3();
    }, []);

    const fetchCourses = async (contractInstance: any, account: string) => {
        try {
            const courseData = await contractInstance.methods.getAllCourses().call({ from: account });
            
            if (Array.isArray(courseData)) {
                const formattedCourses: Course[] = await Promise.all(courseData.map(async (course: any, index: number) => {
                    const isEnrolled = await contractInstance.methods.courseEnrollments(index, account).call();
                    return {
                        id: index.toString(),
                        title: course.title,
                        category: course.category || 'General',
                        level: course.level || 'N/A',
                        duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
                        reward: parseInt(course.mintingPrice),
                        isEnrolled: isEnrolled
                    };
                }));
    
                setCourses(formattedCourses.reverse());
                toast.success("Courses loaded successfully!");
            } else {
                console.warn("No courses found or returned data is not an array.");
                setCourses([]);
                toast.info("No courses available at the moment.");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            setCourses([]);
            toast.error("Failed to fetch courses. Please try again later.");
        } finally {
            setLoading(false)
        }
    };

    const handleCourseAction = async (courseId: string, isEnrolled: boolean) => {
        if (!web3 || !contract || !account) {
            toast.error('Web3 or contract not initialized. Please check your connection.');
            return;
        }

        const actionToastId = toast.loading(isEnrolled ? "Unenrolling from course..." : "Enrolling in course...");

        try {
            if (isEnrolled) {
                // Implement unenroll functionality here if your contract supports it
                toast.update(actionToastId, { 
                    render: "Unenroll functionality not implemented", 
                    type: "warning", 
                    isLoading: false,
                    autoClose: 5000
                });
            } else {
                await contract.methods.enrollInCourse(courseId).send({ from: account });
                toast.update(actionToastId, { 
                    render: `Successfully enrolled in course ${courseId}`, 
                    type: "success", 
                    isLoading: false,
                    autoClose: 5000
                });
                
                // Update the local state to reflect the new enrollment status
                setCourses(prevCourses => prevCourses.map(course => 
                    course.id === courseId ? {...course, isEnrolled: true} : course
                ));
            }
        } catch (error) {
            console.error("Error handling course action:", error);
            toast.update(actionToastId, { 
                render: `Failed to ${isEnrolled ? 'unenroll from' : 'enroll in'} the course. Please try again.`, 
                type: "error", 
                isLoading: false,
                autoClose: 5000
            });
        }
    };

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

                <div className="space-y-4">
                    {loading? (
                        <p>loading.</p>
                    ) : (
                        courses.map((course) => (
                            <div key={course.id} className="bg-white rounded-xl p-6 flex items-center mb-4 gap-4 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <Book className="text-blue-500 w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <Link href={`/courses/learner/course-details/${course.id}`} passHref>
                                        <h3 className="text-xl font-semibold text-blue-600 mb-2 hover:underline">
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
                                    <button 
                                        onClick={() => handleCourseAction(course.id, course.isEnrolled)}
                                        className={`${
                                            course.isEnrolled 
                                            ? "bg-red-500 hover:bg-red-600" 
                                            : "bg-blue-500 hover:bg-blue-600"
                                        } text-white font-semibold py-2 px-4 rounded-full`}
                                    >
                                        {course.isEnrolled ? "Unenroll" : "Enroll"}
                                    </button>
                                    <Link href={`/courses/learner/course-details/${course.id}`} passHref>
                                        <ChevronRight className="text-blue-400 cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </DashLayout>
    );
}