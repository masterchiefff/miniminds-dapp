import { Brain, Rocket, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-10 h-10 text-primary" />,
      title: "AI-Powered Learning",
      description: "Personalized lesson suggestions based on learning style and progress",
    },
    {
      icon: <Rocket className="w-10 h-10 text-secondary" />,
      title: "Learn & Earn",
      description: "Earn tokens as you complete lessons and achieve learning goals",
    },
    {
      icon: <Users className="w-10 h-10 text-accent" />,
      title: "Community Driven",
      description: "Connect with other learners and contribute to the platform's growth",
    },
  ];
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MiniMinds?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-muted hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Features;