import { Brain, Rocket, Users, BarChart, Clock, StarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card/page";

const Features = () => {
   
      const features = [
        {
          icon: <Brain className="w-12 h-12 text-[#9b87f5]" />,
          title: "AI-Powered Learning",
          description: "Personalized learning paths that adapt to each student's needs",
          color: "from-secondary/20 to-secondary/10",
          
        },
        {
          icon: <Rocket className="w-12 h-12 text-primary" />,
          title: "Interactive Lessons",
          description: "Engaging content that makes learning fun and memorable",
          color: "from-primary/20 to-primary/10",
          
        },
        {
          icon: <StarIcon className="w-12 h-12 text-[#FEF7CD]" />,
          title: "Reward System",
          description: "Earn stars and badges as you master new skills",
          color: "from-accent/20 to-accent/10",
          
        },
        {
          icon: <Brain className="w-12 h-12" />,
          title: "Smart Learning Buddy",
          description: "Your AI friend that helps you learn in the most fun way!",
          color: "from-primary/20 to-primary/10",
          iconColor: "text-primary",
        },
        {
          icon: <Rocket className="w-12 h-12" />,
          title: "Learn & Collect",
          description: "Earn cool rewards as you master new skills!",
          color: "from-secondary/20 to-secondary/10",
          iconColor: "text-secondary",
        },
        {
          icon: <Users className="w-12 h-12" />,
          title: "Friends & Fun",
          description: "Learn together with friends from around the world!",
          color: "from-primary/20 to-accent/10",
          iconColor: "text-accent",
        },
        {
          icon: <BarChart className="w-12 h-12 text-[#9b87f5]" />,
          title: "Progress Tracking",
          description: "Monitor student progress with detailed analytics",
          color: "from-secondary/20 to-secondary/10",
        },
        {
          icon: <Clock className="w-12 h-12 text-primary" />,
          title: "Time-Saving Tools",
          description: "Automated grading and lesson planning assistance",
          color: "from-primary/20 to-primary/10",
        },
        {
          icon: <Users className="w-12 h-12 text-[#FEF7CD]" />,
          title: "Collaborative Learning",
          description: "Create group activities and foster peer learning",
          color: "from-secondary/20 to-secondary/10",
        }
      ];
    

      return (
        <section className="py-16 bg-gradient-to-br from-[#F1F0FB] via-white to-[#FFDEE2]">
            <div className="container mx-auto px-4">
                {/* Features Section */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
             >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#9b87f5] via-primary to-[#FEF7CD] bg-clip-text text-transparent mb-4">
                 What Makes MiniMinds Special? ✨
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                 Discover the magic of learning with our innovative features!
                </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 }}
                          className={`flex justify-center bg-gradient-to-br ${ feature.color } hover:scale-105 transition-transform duration-300 cursor-pointer group`}

                          >
                            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-2  backdrop-blur-sm">
                              <CardContent className="p-6 text-center">
                                <div className="mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                              </CardContent>
                           </Card>
                        </motion.div>
                    ))}
                </div>

                    
            </div>    
        </section>
      )
}

export default Features;