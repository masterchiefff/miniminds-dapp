import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card/page";
import { Network, GraduationCap, Coins, School, BarChart2, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Network className="w-12 h-12 text-secondary" />,
      title: "Decentralization",
      description: "Empowers our tutors with full control over their educational content and data. For students, it offers transparent access to learning materials and personalized educational experiences.",
      color: "from-secondary/20 to-secondary/10"
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-primary" />,
      title: "Personalized Learning",
      description: "Tailored education plans for every child, based on their strengths and areas of improvement.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Coins className="w-12 h-12 text-accent" />,
      title: "Token-Based Rewards",
      description: "Students and teachers earn tokens for their efforts, which can be used for further education or community contributions.",
      color: "from-accent/20 to-accent/10"
    },
    {
      icon: <School className="w-12 h-12 text-secondary" />,
      title: "Crowdfunding for Schools",
      description: "Raise funds for rural schools to buy gadgets, infrastructure, and provide better learning experiences.",
      color: "from-secondary/20 to-secondary/10"
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-primary" />,
      title: "Progress Tracking",
      description: "Teachers and parents can track students' progress through detailed reports and dashboards.",
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: <Users className="w-12 h-12 text-accent" />,
      title: "Peer-to-Peer Learning",
      description: "Students can collaborate and learn from each other in a supportive community-driven environment.",
      color: "from-accent/20 to-accent/10"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#F1F0FB] via-white to-[#FFDEE2]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent mb-4">
            Explore Our Features ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how MiniMinds is revolutionizing education through innovative features!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-muted overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-block animate-bounce bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium text-secondary shadow-lg">
            🎯 Start Your Learning Journey Today!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
