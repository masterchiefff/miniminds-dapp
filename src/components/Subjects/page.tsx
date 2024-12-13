import { Calculator, Code, BeakerIcon } from "lucide-react";
import { motion } from "framer-motion";
const Subjects = () => {
  const subjects = [
    {
      icon: <Calculator className="w-8 h-8" />,
      name: "Mathematics",
      color: "bg-primary/10",
      textColor: "text-primary",
      description: "From basic arithmetic to advanced algebra",
    },
    {
      icon: <BeakerIcon className="w-8 h-8" />,
      name: "Science",
      color: "bg-secondary/10",
      textColor: "text-secondary",
      description: "Discover the wonders of the natural world",
    },
    {
      icon: <Code className="w-8 h-8" />,
      name: "Coding",
      color: "bg-accent/10",
      textColor: "text-accent",
      description: "Learn programming through fun projects",
    },
  ];
  return (
    <div className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Our Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`p-6 rounded-xl ${subject.color} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
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