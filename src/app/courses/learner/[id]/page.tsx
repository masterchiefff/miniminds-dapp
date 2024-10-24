'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import DashLayout from '@/components/Layouts/dashLayout';
import { Book, Clock, Award, Star, User, Play, CheckCircle, ChevronRight } from 'lucide-react';
import Web3 from 'web3';
import contractABI from "@/contracts/UserRegistrationABI.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CourseDetails {
    title: string;
    category: string;
    level: string;
    duration: string;
    description: string;
    instructor: string;
    totalLessons: number;
    reward: number;
    isEnrolled: boolean;
}

interface LearnerCourseDetailProps {
  params: { id: string };
}

export default function CourseDetails() {
    const { id } = useParams<LearnerCourseDetailProps['params']>();
    const [course, setCourse] = useState<CourseDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [web3, setWeb3] = useState<Web3 | null>(null);
    const [contract, setContract] = useState<any>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const contractAddress = "0x73917610c8924A677622f5682B678a7A0c907650";

    // Function to format courseId properly
    // const formatCourseId = (id: string): string => {
    //     try {
    //         // Remove any non-alphanumeric characters
    //         const cleanId = id.replace(/[^a-zA-Z0-9]/g, '');
            
    //         // If it's already a hex string starting with '0x', return it
    //         if (cleanId.startsWith('0x') && Web3.utils.isHexStrict(cleanId)) {
    //             return cleanId;
    //         }

    //         // If it's a number, convert it to hex
    //         const num = parseInt(cleanId);
    //         if (!isNaN(num)) {
    //             return Web3.utils.numberToHex(num);
    //         }

    //         // If it's a string that doesn't start with '0x', assume it's hex without prefix
    //         if (/^[0-9a-fA-F]+$/.test(cleanId)) {
    //             return '0x' + cleanId;
    //         }

    //         throw new Error('Invalid course ID format');
    //     } catch (error) {
    //         console.error('Error formatting course ID:', error);
    //         throw new Error('Invalid course ID format');
    //     }
    // };

    const validateAndFormatCourseData = (rawData: any): CourseDetails => {
        return {
            title: rawData.title || 'Untitled Course',
            category: rawData.category || 'General',
            level: rawData.level || 'Beginner',
            duration: `${Math.floor(Math.random() * 8) + 4} weeks`,
            description: rawData.description || 'This course provides comprehensive learning materials and hands-on exercises to help you master the subject matter.',
            instructor: rawData.instructor || 'Anonymous Instructor',
            totalLessons: parseInt(rawData.totalLessons) || 22,
            reward: parseFloat(Web3.utils.fromWei(rawData.mintingPrice || '0', 'ether')),
            isEnrolled: false
        };
    };

    useEffect(() => {
        const initializeWeb3 = async () => {
            try {
                if (!window.ethereum) {
                    throw new Error('MetaMask is not installed');
                }

                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                } catch (error) {
                    throw new Error('User denied account access');
                }

                const contractInstance = new web3Instance.eth.Contract(
                    contractABI as any[],
                    contractAddress
                );
                setContract(contractInstance);

                const accounts = await web3Instance.eth.getAccounts();
                if (accounts && accounts.length > 0) {
                    setAccount(accounts[0]);
                    await fetchCourseDetails(contractInstance, accounts[0]);
                } else {
                    throw new Error('No accounts found');
                }
            } catch (error: any) {
                console.error("Error initializing web3:", error);
                toast.error(error.message || 'Failed to initialize Web3');
            } finally {
                setLoading(false);
            }
        };

        initializeWeb3();
    }, [id]);

    const fetchCourseDetails = async (contractInstance: any, userAccount: string) => {
        try {
            console.log('Raw course ID:', id);

            // Get course details
            const courseData = await contractInstance.methods.getCourseDetails(id).call({
                from: userAccount
            });

            console.log('Raw course data:', courseData);

            // Check enrollment status
            const isEnrolled = await contractInstance.methods.courseEnrollments(
                id,
                userAccount
            ).call();

            const formattedCourse = validateAndFormatCourseData(courseData);
            formattedCourse.isEnrolled = isEnrolled;

            setCourse(formattedCourse);
        } catch (error: any) {
            console.error("Error fetching course details:", error);
            
            if (error.message.includes('revert')) {
                toast.error('Course not found or contract error');
            } else if (error.message.includes('Invalid course ID')) {
                toast.error('Invalid course ID format');
            } else {
                toast.error('Failed to fetch course details. Please try again later.');
            }
            
            setCourse(null);
        }
    };

    const handleEnrollment = async () => {
        if (!web3 || !contract || !account || !course) {
            toast.error('Web3 or contract not initialized. Please check your connection.');
            return;
        }

        setIsProcessing(true);
        const actionToastId = toast.loading(
            course.isEnrolled ? "Unenrolling from course..." : "Enrolling in course..."
        );

        try {
            const formattedCourseId = id;
            
            const method = course.isEnrolled
                ? contract.methods.unenrollFromCourse(formattedCourseId)
                : contract.methods.enrollInCourse(formattedCourseId);

            const gas = await method.estimateGas({ from: account });
            
            await method.send({
                from: account,
                gas: Math.floor(gas * 1.2)
            });

            toast.update(actionToastId, {
                render: `Successfully ${course.isEnrolled ? 'unenrolled from' : 'enrolled in'} course`,
                type: "success",
                isLoading: false,
                autoClose: 5000
            });

            setCourse(prev => prev ? { ...prev, isEnrolled: !prev.isEnrolled } : null);
        } catch (error: any) {
            console.error("Error handling enrollment:", error);
            
            let errorMessage = 'Transaction failed. Please try again.';
            if (error.message.includes('User denied')) {
                errorMessage = 'Transaction was rejected';
            } else if (error.message.includes('insufficient funds')) {
                errorMessage = 'Insufficient funds for transaction';
            }

            toast.update(actionToastId, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 5000
            });
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
          <DashLayout>
            <div className="flex-1 p-8">
              <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
              </div>
            </div>
          </DashLayout>
        );
    }

    if (!course) {
        return (
          <DashLayout>
            <div className="flex-1 p-8">
              <h1 className="text-4xl font-bold text-blue-600 mb-6">Course Details</h1>
              <div className="text-start">
                  <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
                  <p className="text-gray-600 mt-2">The requested course could not be found.</p>
              </div>
            </div>
        </DashLayout>
        );
    }

    return (
      <DashLayout>
        <div className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">Course Details</h1>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">{course.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                    <span className="flex items-center gap-1">
                        <Book className="w-5 h-5" />
                        {course.category}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-5 h-5" />
                        {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                        <User className="w-5 h-5" />
                        {course.level}
                    </span>
                    <span className="flex items-center gap-1">
                        <Award className="w-5 h-5" />
                         enrolled
                    </span>
                </div>

                <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Overview</h2>
                    <p className="text-gray-700 mb-6">{course.description}</p>
                    
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handleEnrollment}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                                course.isEnrolled 
                                ? "bg-red-500 hover:bg-red-600" 
                                : "bg-blue-500 hover:bg-blue-600"
                            } text-white font-semibold`}
                        >
                            <Play className="w-5 h-5" />
                            {course.isEnrolled ? "Unenroll" : "Start Learning"}
                        </button>
                        <div className="bg-yellow-100 rounded-full px-6 py-3 flex items-center">
                            <span className="font-bold text-yellow-700 mr-2">
                                {course.reward.toFixed(4)} ETH
                            </span>
                            <Award className="w-5 h-5 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Instructor</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">
                                {course.instructor.slice(0, 6)}...{course.instructor.slice(-4)}
                            </h3>
                            <p className="text-gray-600">Blockchain Expert</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="w-80 bg-gray-50 p-6">
            <div className="bg-white rounded-xl p-6 sticky top-6 shadow-lg">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">Course Details</h2>
                <ul className="space-y-4 mb-6">
                    <li className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="font-semibold">Duration</p>
                            <p className="text-gray-600">{course.duration}</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="font-semibold">Lessons</p>
                            <p className="text-gray-600">{course.totalLessons} lessons</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <User className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="font-semibold">Level</p>
                            <p className="text-gray-600">{course.level}</p>
                        </div>
                    </li>
                    <li className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-blue-500" />
                        <div>
                            <p className="font-semibold">Reward</p>
                            <p className="text-gray-600">{course.reward.toFixed(4)} ETH</p>
                        </div>
                    </li>
                </ul>
                <button 
                  onClick={handleEnrollment}
                  disabled={isProcessing} 
                  className={`w-full py-3 rounded-full transition-colors font-semibold ${
                      course.isEnrolled 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white mb-4`}
              >
                  {isProcessing ? "Processing..." : (course.isEnrolled ? "Unenroll" : "Enroll Now")}
                </button>
                <p className="text-center text-gray-600 text-sm">
                    Earn rewards upon completion
                </p>
            </div>
        </div>
        <ToastContainer position="bottom-right" />
    </DashLayout>
    );
}