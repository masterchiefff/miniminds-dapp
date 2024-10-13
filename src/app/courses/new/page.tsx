'use client'

import Web3 from 'web3';
import { useState } from 'react';

import ABI from '@/contracts/UserRegistrationABI.json'; // Adjust the path as needed
import MainLayout from '@/components/Layouts/mainLayout';

// Initialize web3 instance
const web3 = new Web3(window.ethereum);
const contractAddress = '0x0c8926D3170a2657802CCfdb68Eff372A27d5d12'; // Replace with your deployed contract address

const courseContract = new web3.eth.Contract(ABI, contractAddress);

const CreateCourse = () => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [courseModules, setCourseModules] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [institutionIdToActivate, setInstitutionIdToActivate] = useState('');
    
    const handleCreateCourse = async () => {
        try {
            // Ensure the user is connected to their MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];

            // Validate course price
            const priceInWei = web3.utils.toWei(coursePrice, 'ether');
            if (priceInWei <= 0) {
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
            // You can add additional logic here, like redirecting or displaying a success message

        } catch (error) {
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
        } catch (error) {
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
                onChange={(e) => setCourseTitle(e.target.value)}
            />
            <textarea
                placeholder="Course Description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course Category"
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
            />
            <input
                type="number"
                placeholder="Course Price (ETH)"
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Course Duration"
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
            />

            <h2>Activate Institution</h2>
            <input
                type="number"
                placeholder="Institution ID"
                value={institutionIdToActivate}
                onChange={(e) => setInstitutionIdToActivate(e.target.value)}
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
