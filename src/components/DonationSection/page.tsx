//import { motion } from "framer-motion";
//import { HeartHandshake, BookOpen, School, Award } from "lucide-react";
import Button from "@/components/ui/button/page";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/page";
import { motion } from "framer-motion";
import { HeartHandshake, School, Award, BookOpen, GraduationCap, Sparkles } from "lucide-react";

const DonateSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#F2FCE2] via-white to-[#D3E4FD] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
      className="text-center mt-16 space-y-8 px-4"
    >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Support Education</span>
          </div>
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-lg p-8">
        {/* Heading */}
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
          Together We Can Make a Difference! 💫
        </h3>

        {/* Supporting Text */}
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Every child deserves quality education. Your support helps us create magical learning experiences for children around the world. 
          Every donation brings us closer to making quality education accessible to all!
        </p>

        {/* Call-to-Action Button */}
        <Button
          className="bg-gradient-to-r from-primary via-secondary to-accent hover:scale-105 transition-transform text-white font-bold text-lg px-8 py-4 rounded-full"
        >
          <HeartHandshake className="w-6 h-6 mr-2" />
          Support Our Mission
        </Button>

        {/* Donation Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {/* Support Education Card */}
          <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Support Education
            </h4>
            <p className="text-gray-600">
              Help us create more interactive lessons and learning materials.
            </p>
          </div>

          {/* Sponsor a School Card */}
          <div className="bg-gradient-to-br from-green-200 to-green-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <School className="w-12 h-12 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Sponsor a School
            </h4>
            <p className="text-gray-600">
              Partner with us to bring MiniMinds to schools in need.
            </p>
          </div>

          {/* Fund Scholarships Card */}
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-yellow-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Fund Scholarships
            </h4>
            <p className="text-gray-600">
              Help talented students access premium educational content with the right resources.
            </p>
          </div>
        </div>

        {/* Social Proof / Encouragement */}
        <p className="text-sm text-gray-500 mt-6">
          <strong>💡 98%</strong> of our donors believe education transforms lives. 
          Join us today in making a change!
        </p>
      </div>
    </motion.div>
      </div>
    </section>
  );
};

export default DonateSection;