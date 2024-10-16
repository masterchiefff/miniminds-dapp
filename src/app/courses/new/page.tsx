'use client'

import Web3 from 'web3';
import { useState, ChangeEvent } from 'react';

import ABI from '@/contracts/UserRegistrationABI.json'; // Adjust the path as needed
import MainLayout from '@/components/Layouts/mainLayout';

// Define types for course module and lesson
interface Lesson {
    title: string;
    type: string;
    duration: number;
}

interface Module {
    title: string;
    description: string;
    lessons: Lesson[];
}

const CreateCourse = () => {
    const [courseTitle, setCourseTitle] = useState<string>('');
    const [courseDescription, setCourseDescription] = useState<string>('');
    const [courseCategory, setCourseCategory] = useState<string>('');
    const [coursePrice, setCoursePrice] = useState<string>('');
    const [courseDuration, setCourseDuration] = useState<string>('');
    const [courseModules, setCourseModules] = useState<Module[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [institutionIdToActivate, setInstitutionIdToActivate] = useState<string>('');

    // Initialize web3 instance
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0xf1A6e40d86ef1D119f9978B7c5dcd34Ff34566a4'; // Replace with your deployed contract address
    const courseContract = new web3.eth.Contract(ABI as any, contractAddress);

    // Handle input changes with correct types
    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setter(e.target.value);

    const handleCreateCourse = async () => {
        try {
            // Ensure the user is connected to their MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
    
            // Validate course price
            const priceInWei = web3.utils.toWei(coursePrice, 'ether').toString();
            if (parseFloat(priceInWei) <= 0) {
                throw new Error('Course price must be greater than zero.');
            }
    
            // Prepare course data
            const modulesData = courseModules.map(module => ({
                title: module.title,
                description: module.description,
                lessons: module.lessons.map(lesson => ({
                    title: lesson.title,
                    type: lesson.type,
                    duration: lesson.duration,
                })),
            }));
    
            // Estimate gas for the transaction
            const gasEstimate = await courseContract.methods.createCourse(
                courseTitle,
                courseDescription,
                courseCategory,
                priceInWei,
                courseDuration,
                modulesData
            ).estimateGas({ from: account });
    
            // Send transaction to create course
            const response = await courseContract.methods.createCourse(
                courseTitle,
                courseDescription,
                courseCategory,
                priceInWei,
                courseDuration,
                modulesData
            ).send({ from: account, gas: gasEstimate });
    
            console.log('Course created successfully:', response);
    
        } catch (error: any) {
            console.error('Error creating course:', error.message);
            setErrorMessage(error.message);  // Set error message to display
        }
    };
    

    const handleActivateInstitution = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            // Convert institutionIdToActivate to uint256
            const institutionId = parseInt(institutionIdToActivate, 10);
            if (isNaN(institutionId) || institutionId < 0) {
                alert('Please enter a valid Institution ID.');
                return;
            }

            const gasEstimate = await courseContract.methods.activateInstitution(institutionId).estimateGas({ from: account });

            await courseContract.methods.activateInstitution(institutionId).send({ from: account, gas: gasEstimate });

            alert('Institution activated successfully!');
        } catch (error: any) {
            console.error('Error activating institution:', error);
            alert('An error occurred while activating the institution. Please try again.');
        }
    };

    return (
        <MainLayout pageTitle={'Create a new Course'} subTitle={'New Course'}>
            <div>
                <h1>Create Course</h1>
                <input
                    type="text"
                    placeholder="Course Title"
                    value={courseTitle}
                    onChange={handleInputChange(setCourseTitle)}
                />
                <textarea
                    placeholder="Course Description"
                    value={courseDescription}
                    onChange={handleInputChange(setCourseDescription)}
                />
                <input
                    type="text"
                    placeholder="Course Category"
                    value={courseCategory}
                    onChange={handleInputChange(setCourseCategory)}
                />
                <input
                    type="number"
                    placeholder="Course Price (ETH)"
                    value={coursePrice}
                    onChange={handleInputChange(setCoursePrice)}
                />
                <input
                    type="text"
                    placeholder="Course Duration"
                    value={courseDuration}
                    onChange={handleInputChange(setCourseDuration)}
                />

                <h2>Activate Institution</h2>
                <input
                    type="number"
                    placeholder="Institution ID"
                    value={institutionIdToActivate}
                    onChange={handleInputChange(setInstitutionIdToActivate)}
                />

                <button onClick={handleActivateInstitution}>Activate Institution</button>
                {/* Add module input fields as necessary */}
                <button onClick={handleCreateCourse}>Create Course</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </MainLayout>
    );
};

export default CreateCourse;
