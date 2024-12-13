import { Calculator, Code, Beaker, Globe, BookOpen, Music } from "lucide-react";
import { motion } from "framer-motion";

const Subjects = () => {
  const subjects = [
   
    {
      icon: <Beaker className="w-8 h-8" />,
      name: "Science",
      color: "bg-secondary/10",
      hoverColor: "hover:bg-secondary/20",
      textColor: "text-secondary",
      description: "Discover the wonders of the natural world.",
    },
    {
      icon: <Code className="w-8 h-8" />,
      name: "Coding",
      color: "bg-accent/10",
      hoverColor: "hover:bg-accent/20",
      textColor: "text-accent",
      description: "Learn programming through fun projects.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      name: "Geography",
      color: "bg-teal-100",
      hoverColor: "hover:bg-teal-200",
      textColor: "text-teal-700",
      description: "Explore the world and its diverse landscapes.",
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      name: "Mathematics",
      color: "bg-primary/10",
      hoverColor: "hover:bg-primary/20",
      textColor: "text-primary",
      description: "From basic arithmetic to advanced algebra.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      name: "Literature",
      color: "bg-amber-100",
      hoverColor: "hover:bg-amber-200",
      textColor: "text-amber-700",
      description: "Dive into classic and modern literary works.",
    },
    {
      icon: <Music className="w-8 h-8" />,
      name: "Music",
      color: "bg-indigo-100",
      hoverColor: "hover:bg-indigo-200",
      textColor: "text-indigo-700",
      description: "Learn to read, play, and appreciate music.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-xl ${subject.color} ${subject.hoverColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
            >
              <div className={`${subject.textColor} mb-4`}>{subject.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${subject.textColor}`}>
                {subject.name}
              </h3>
              <p className="text-gray-600">{subject.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
