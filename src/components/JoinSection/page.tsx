import { motion } from "framer-motion";
import  Button  from "@/components/ui/button/page";
import { GraduationCap, Users, School } from "lucide-react";

const JoinSection = () => {
  return (
    <section className="py-24 overflow-hidden">
       <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-center mb-4"
            >
               Discover Your Place with { " "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Mini
              </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minds! 
              </span>
            </motion.h2>
            {/*
            <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Discover your place with Miniminds! 🌈
        </motion.h2> */}
       
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Empowering Teachers, Students and Institutions!
        </motion.p>
      <div className="container mx-auto px-2 ">
        {/* Teachers Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row place-items-baseline gap-12 mb-60"
        >
          <div className="relative flex-1 items-center hidden md:block">
            <div className="absolute top-0 left-0 w-72 h-72 bg-[#4CD964] rounded-full  overflow-hidden">
              <img 
                src="./assets/images/teacher1.avif" 
                alt="Teacher"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-40 left-40 w-64 h-64 bg-[#8A4FFF] rounded-full overflow-hidden">
              <img 
                src="./assets/images/teacher4.avif" 
                alt="Student 1"
                className="w-full h-full object-cover"
              />
            </div>
           
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-20 text-[#FF6B6B]"
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="currentColor"/>
              </svg>
            </motion.div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-20 text-[#4CD964]"
            >
              <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="15" fill="currentColor"/>
              </svg>
            </motion.div>
          </div>
          <div className="flex-1 p-6 items-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-sm text-left font-medium text-secondary  tracking-wider">TEACHERS</span>
              <h2 className="text-4xl md:text-4xl font-bold text-purple-900">
                Differentiate your classroom and engage every student.
              </h2>
              <p className="text-lg  text-gray-600">
                We empower teachers to support their entire classroom. 90% of teachers who have used MiniMinds have found us effective.
                Monitor each student's progress and provide real-time feedback.
                Post assignments, quizzes, and more to keep students engaged . Earn as you teach, create and sell courses to a global audience.
              </p>
              <Button 
                size="lg"
                className="bg-purple-600 hover:bg-purple-800 text-white rounded-xl px-8 py-2 text-lg"
              >
                <GraduationCap className="w-6 h-6 mr-2" />
                Teachers, start here
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Students Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col-reverse md:flex-row items-center gap-12 mb-60 mt-40"
        >
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-sm font-medium text-primary tracking-wider">LEARNERS AND STUDENTS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-green-900">
                Learn at your own pace, anytime and anywhere.
              </h2>
              <p className="text-lg text-gray-600">
                Join millions of students worldwide who are mastering new skills and achieving their learning goals with MiniMinds.
                Get rewarded with tokens for every course you complete. Use tokens to unlock premium courses.
                You can also earn tokens by referring friends to MiniMinds.
              </p>
              <Button 
                size="lg"
                className="bg-green-400 hover:bg-green-600 text-white rounded-full px-10 py-2 text-lg"
              >
                <School className="w-6 h-6 mr-2" />
                Start learning now
              </Button>
            </motion.div>
          </div>
          <div className="relative flex-1 hidden md:block min-h-[400px]">
            {/* Similar circular image layout with different colors */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#fa6ccf] rounded-full overflow-hidden">
              <img 
                src="./assets/images/student3.jpg" 
                alt="Student 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-70 h-70 bg-[#4CD964] rounded-full overflow-hidden">
              <img 
                src="./assets/images/student4.jpg" 
                alt="Student 4"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-20 text-[#8A4FFF]"
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="currentColor"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Institutions Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="relative  flex-1 hidden md:block min-h-[400px]">
            {/* Similar circular image layout with different colors */}
            <div className="absolute top-0 left-20 w-72 h-72 bg-[#8A4FFF] rounded-full overflow-hidden">
              <img 
                src="./assets/images/student2.jpg" 
                alt="Institution 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFD60A] rounded-full overflow-hidden">
              <img 
                src="./assets/images/teacher4.avif" 
                alt="Institution 2"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-40 left-40 text-[#4CD964]"
            >
              <svg width="30" height="30" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="15" fill="currentColor"/>
              </svg>
            </motion.div>
          </div>
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-sm font-medium text-accent tracking-wider">INSTITUTIONS</span>
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
                Transform education at scale with MiniMinds.
              </h2>
              <p className="text-lg text-gray-600">
                Partner with us to bring innovative learning solutions to your institution and create lasting impact.
                We provide tools to help you manage your institution, monitor student progress, and track performance.
                We also provide a platform for you to create and sell courses to a global audience.

              </p>
              <Button 
                size="lg"
                className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-full px-4 py-2 text-lg"
              >
                <Users className="w-6 h-6 mr-2" />
                Partner with us
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;