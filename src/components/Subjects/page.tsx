import { Calculator, Code, Beaker , ComputerIcon, Music2Icon} from "lucide-react";
import { motion } from "framer-motion";

const Subjects = () => {
  const subjects = [
    {
      icon: <Calculator className="w-10 h-10" />,
      name: "Mathematics",
      emoji: "🔢",
      color: "from-primary/20 to-primary/10",
      textColor: "text-primary",
      description: "From counting stars to solving puzzles!",
      features: ["Fun number games", "Interactive puzzles", "Math adventures"],
    },
    {
      icon: <Beaker className="w-10 h-10" />,
      name: "Science",
      emoji: "🔬",
      color: "from-secondary/20 to-secondary/10",
      textColor: "text-secondary",
      description: "Explore the wonders of our world!",
      features: ["Cool experiments", "Nature discovery", "Space exploration"],
    },
    {
      icon: <Code className="w-10 h-10" />,
      name: "Coding",
      emoji: "💻",
      color: "from-accent/20 to-accent/10",
      textColor: "text-accent",
      description: "Create your own games and stories!",
      features: ["Game making", "Robot friends", "Creative coding"],
    },
    {
      icon: <ComputerIcon className="w-10 h-10" />,
      name: "Mathematics",
      emoji: "🔢",
      color: "from-primary/20 to-primary/10",
      textColor: "text-primary",
      description: "From counting stars to solving puzzles!",
      features: ["Fun number games", "Interactive puzzles", "Math adventures"],
    },
    {
      icon: <Music2Icon className="w-10 h-10" />,
      name: "Music",
      emoji: "🔬",
      color: "from-secondary/20 to-secondary/10",
      textColor: "text-secondary",
      description: "Explore the wonders of our world!",
      features: ["Cool experiments", "Nature discovery", "Space exploration"],
    },
    {
      icon: <Code className="w-10 h-10" />,
      name: "Coding",
      emoji: "💻",
      color: "from-accent/20 to-accent/10",
      textColor: "text-accent",
      description: "Create your own games and stories!",
      features: ["Game making", "Robot friends", "Creative coding"],
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-muted/50 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Discover Amazing Subjects! 🌈
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Choose your favorite subject and start an exciting learning adventure!
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${subject.color} hover:scale-105 transition-transform duration-300 cursor-pointer group`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${subject.textColor} group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <span className="text-2xl">{subject.emoji}</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${subject.textColor}`}>
                {subject.name}
              </h3>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <ul className="space-y-2">
                {subject.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;