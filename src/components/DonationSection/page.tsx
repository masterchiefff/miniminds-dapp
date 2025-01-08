import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
//import Button from "./components/ui/Button"; // Ensure Button component is properly imported
import  Button from "@/components/ui/button/page";

const DonationSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
      className="text-center mt-16 space-y-8 px-4"
    >
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg p-8">
        {/* Heading */}
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
          Together We Can Make a Difference! 💫
        </h3>

        {/* Supporting Text */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Every child deserves quality education. Your support helps us create 
          magical learning experiences for children worldwide.
        </p>

        {/* Call-to-Action Button */}
        <Button
          className="bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-transform text-white font-bold text-lg px-8 py-4 rounded-full"
        >
          <HeartHandshake className="w-6 h-6 mr-2" />
          Support Our Mission
        </Button>

        {/* Social Proof / Encouragement */}
        <p className="text-sm text-gray-500 mt-6">
          <strong>💡 98%</strong> of our donors believe education transforms lives. 
          Join us today in making a change!
        </p>
      </div>
    </motion.div>
  );
};

export default DonationSection;
