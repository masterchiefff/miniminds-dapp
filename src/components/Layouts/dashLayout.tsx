import Aside from "../shared-componets/aside";
import { Book, Brain, Coins, Palette, Star, Trophy } from 'lucide-react';

interface DashLayoutProps {
    children: React.ReactNode; 
}

const DashLayout: React.FC<DashLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-blue-100 text-gray-900 font-sans">
            <Aside />
            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto"> {children} </main>
            <aside className="w-80 p-8 bg-green-200 rounded-l-3xl sticky top-0 h-screen overflow-y-auto scrollbar-hide">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-purple-300 rounded-full flex items-center justify-center mb-4">
                        <Trophy className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-semibold text-purple-600">Achievement Master</h2>
                    <div className="flex items-center mt-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-lg ml-2">Level 7</span>
                    </div>
                </div>

                {/* Achievement Stats */}
                <div className="bg-white p-6 rounded-2xl mb-8 shadow-lg">
                    <h3 className="font-semibold text-xl mb-4 text-purple-600">Your Achievement Stats</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Achievements:</span>
                            <span className="font-bold text-purple-600">15/30</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Completion Rate:</span>
                            <span className="font-bold text-green-500">50%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Tokens Earned:</span>
                            <div className="flex items-center">
                                <Coins className="w-5 h-5 text-yellow-500 mr-1" />
                                <span className="font-bold text-yellow-600">750</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Achievements */}
                <div>
                    <h3 className="font-semibold text-xl mb-4 text-purple-600">Next Achievements</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'Reading Champion', description: 'Read 5 books', icon: <Book className="w-6 h-6 text-blue-500" /> },
                            { title: 'Quiz Master', description: 'Score 100% in 3 quizzes', icon: <Brain className="w-6 h-6 text-green-500" /> },
                            { title: 'Creativity Guru', description: 'Complete 10 art projects', icon: <Palette className="w-6 h-6 text-purple-500" /> },
                        ].map((achievement, index) => (
                            <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex items-center">
                                <div className="bg-gray-100 p-2 rounded-full mr-4">
                                    {achievement.icon}
                                </div>
                                <div>
                                    <h4 className="font-semibold">{achievement.title}</h4>
                                    <p className="text-sm text-gray-600">{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default DashLayout;
