'use client'
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from 'web3';
import { Book, Video, FileText, PlusCircle, X, Save, ArrowLeft, ArrowRight } from 'lucide-react'
import MainLayout from '@/components/Layouts/mainLayout'
import ABI from '@/contracts/UserRegistrationABI.json';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

type LessonType = 'text' | 'video' | 'quiz'

interface Lesson {
  id: string
  type: LessonType
  title: string
  content: string
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

export default function CourseCreation() {
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [modules, setModules] = useState<Module[]>([])
    const [currentModule, setCurrentModule] = useState<Module | null>(null)
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
    const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
    const [mintingPrice, setMintingPrice] = useState('')
    const [web3, setWeb3] = useState<Web3 | null>(null)
    const [contract, setContract] = useState<any>(null)
    const [account, setAccount] = useState<string | null>(null)

    useEffect(() => {
        const initWeb3 = async () => {
            if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' })
                    const web3Instance = new Web3(window.ethereum)
                    setWeb3(web3Instance)
                    const accounts = await web3Instance.eth.getAccounts()
                    setAccount(accounts[0])
                    const contractAddress = '0x22790A4E84Ba310939A659969aAF22635fc9CEcB' 
                    const contractInstance = new web3Instance.eth.Contract(ABI, contractAddress)
                    setContract(contractInstance)
                } catch (error) {
                    console.error('Error initializing Web3:', error)
                }
            } else {
                console.log('Please install MetaMask!')
            }
        }
        initWeb3()
    }, [])

    const addModule = () => {
        const newModule: Module = {
            id: Date.now().toString(),
            title: '',
            lessons: []
        }
        setModules([...modules, newModule])
        setCurrentModule(newModule)
    }

    const updateModule = (id: string, title: string) => {
        const updatedModules = modules.map(module =>
            module.id === id ? { ...module, title } : module
        )
        setModules(updatedModules)
        if (currentModule?.id === id) {
            setCurrentModule({ ...currentModule, title })
        }
    }

    const addLesson = (type: LessonType) => {
        if (!currentModule) return

        const newLesson: Lesson = {
            id: Date.now().toString(),
            type,
            title: '',
            content: ''
        }
        const updatedModule = {
            ...currentModule,
            lessons: [...currentModule.lessons, newLesson]
        }
        updateModule(currentModule.id, currentModule.title)
        setCurrentModule(updatedModule)
        setCurrentLesson(newLesson)
    }

    const updateLesson = (id: string, updates: Partial<Lesson>) => {
        if (!currentModule) return

        const updatedLessons = currentModule.lessons.map(lesson =>
            lesson.id === id ? { ...lesson, ...updates } : lesson
        )
        const updatedModule = { ...currentModule, lessons: updatedLessons }
        updateModule(currentModule.id, currentModule.title)
        setCurrentModule(updatedModule)
        setCurrentLesson(updatedLessons.find(lesson => lesson.id === id) || null)
    }

    const addQuiz = () => {
        if (!currentModule) return

        const newQuiz: Quiz = {
            id: Date.now().toString(),
            title: 'New Quiz',
            questions: []
        }
        setCurrentQuiz(newQuiz)
    }

    const addQuestion = () => {
        if (!currentQuiz) return

        const newQuestion: Question = {
            id: Date.now().toString(),
            text: '',
            options: ['', '', '', ''],
            correctAnswer: 0
        }
        const updatedQuiz = {
            ...currentQuiz,
            questions: [...currentQuiz.questions, newQuestion]
        }
        setCurrentQuiz(updatedQuiz)
    }

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        if (!currentQuiz) return

        const updatedQuestions = currentQuiz.questions.map(question =>
            question.id === id ? { ...question, ...updates } : question
        )
        const updatedQuiz = { ...currentQuiz, questions: updatedQuestions }
        setCurrentQuiz(updatedQuiz)
    }

    const saveQuiz = () => {
        if (!currentModule || !currentQuiz) return

        const quizLesson: Lesson = {
            id: currentQuiz.id,
            type: 'quiz',
            title: currentQuiz.title,
            content: JSON.stringify(currentQuiz.questions)
        }
        const updatedModule = {
            ...currentModule,
            lessons: [...currentModule.lessons, quizLesson]
        }
        updateModule(currentModule.id, currentModule.title)
        setCurrentModule(updatedModule)
        setCurrentQuiz(null)
    }
    
    const createCourse = async () => {
        if (!web3 || !contract || !account) {
            console.error('Web3, contract, or account not initialized');
            return;
        }

        try {
            const mintingPriceWei = web3.utils.toWei(mintingPrice, 'ether');
            toast.info('Creating course on the blockchain...');
            const estimatedGas = await contract.methods.createCourse(courseTitle, courseDescription, mintingPriceWei)
                .estimateGas({ from: account });

            const result = await contract.methods.createCourse(courseTitle, courseDescription, mintingPriceWei)
                .send({ from: account, gas: estimatedGas });

            const courseId = result.events.CourseCreated.returnValues.courseId;
            const courseData = {
                courseId: courseId,
                title: courseTitle,
                description: courseDescription,
                mintingPrice: mintingPrice,
                creator: account,
                modules: modules.map(module => ({
                    ...module,
                    lessons: module.lessons.map(lesson => ({
                        ...lesson,
                        content: lesson.type === 'quiz' ? JSON.parse(lesson.content) : lesson.content
                    }))
                }))
            };

            try {
                console.log('Firestore DB:', db); 

                if (!db) {
                    throw new Error('Firestore db is not initialized');
                }

                const courseRef = await addDoc(collection(db, "courses"), courseData);
                console.log('Course added with ID:', courseRef.id);

                toast.success('Course created successfully on blockchain and Firestore!');
                return true;
            } catch (error) {
                console.error('Error in course creation:', error);
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error creating course:', error.message);
                toast.error(`Error creating course: ${error.message}. Please try again.`);
                if (error.message.includes('reverted by the EVM')) {
                    toast.error('Transaction reverted by the blockchain. Please check the contract logic.');
                }
            } else {
                console.error('An unknown error occurred during the course creation process');
            }
        }
    };

    return (
        <MainLayout pageTitle={'Create New Course'} subTitle={''}>
            <div className="min-h-screen bg-yellow-100">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Course Title"
                        className="w-full text-2xl font-bold mb-4 p-2 border border-yellow-300 rounded"
                    />
                    <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        placeholder="Course Description"
                        className="w-full h-32 p-2 border border-yellow-300 rounded"
                    />
                    <div className="mt-4">
                        <label htmlFor="mintingPrice" className="block text-sm font-medium text-yellow-700 mb-2">
                            Minting Price (ETH)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id="mintingPrice"
                                value={mintingPrice}
                                onChange={(e) => setMintingPrice(e.target.value)}
                                placeholder="0.05"
                                className="w-full p-2 border border-yellow-300 rounded pl-8"
                                step="0.01"
                                min="0"
                            />
                            <span className="absolute left-3 top-2 text-yellow-600">Ξ</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 mb-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold">Modules</h2>
                    {modules.map((module) => (
                        <div key={module.id} className="bg-yellow-200 p-4 my-2 rounded-lg">
                            <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModule(module.id, e.target.value)}
                                placeholder="Module Title"
                                className="w-full text-lg font-medium mb-2 p-2 border border-yellow-300 rounded"
                            />
                            {module.lessons.map((lesson) => (
                                <div key={lesson.id} className="p-2 my-2 bg-yellow-100 rounded-lg">
                                    <input
                                        type="text"
                                        value={lesson.title}
                                        onChange={(e) => updateLesson(lesson.id, { title: e.target.value })}
                                        placeholder="Lesson Title"
                                        className="w-full mb-2 p-2 border border-yellow-300 rounded"
                                    />
                                    <textarea
                                        value={lesson.content}
                                        onChange={(e) => updateLesson(lesson.id, { content: e.target.value })}
                                        placeholder="Lesson Content"
                                        className="w-full p-2 border border-yellow-300 rounded"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={addModule} className="bg-green-500 text-white p-3 rounded-lg">
                        Add Module <PlusCircle className="inline-block" />
                    </button>
                    <button onClick={createCourse} className="bg-blue-500 text-white p-3 rounded-lg">
                        Create Course <Save className="inline-block" />
                    </button>
                </div>

                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />
            </div>
        </MainLayout>
    )
}
