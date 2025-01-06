import  Button  from "@/components/ui/button/page";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 min-h-[600px] flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl animate-pulse delay-700"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-secondary">
                🎉 Learning made fun!
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Mini
              </span>
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Minds
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Join our magical learning adventure! 🚀 Explore exciting lessons in math, science, and coding while earning rewards along the way! 
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg group">
                Start Learning
                <span className="ml-2 group-hover:rotate-12 transition-transform">🎮</span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary text-secondary hover:bg-secondary hover:text-white text-lg group"
              >
                Become a Teacher
                <span className="ml-2 group-hover:rotate-12 transition-transform">📚</span>
              </Button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              <img
                src="/lovable-uploads/9d06185e-e1c8-472d-b239-493176530f2a.png"
                alt="MiniMinds Learning Dashboard"
                className="rounded-2xl shadow-xl relative z-10 animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10 transform translate-y-4"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
