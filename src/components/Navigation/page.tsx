//import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
//import { cn } from "@/lib/utils";
import React from "react";
const subjects = [
  { name: "HTML", href: "#" },
  { name: "CSS", href: "#" },
  { name: "JavaScript", href: "#" },
  { name: "Python", href: "#" },
  { name: "Java", href: "#" },
  { name: "SQL", href: "#" },
  { name: "React", href: "#" },
];
const sections = [
  { name: "Academy", href: "#" },
  { name: "Students", href: "#" },
  { name: "Teachers", href: "#" },
];
const Navigation = () => {
  return (
    <div className="w-full">
      {/* Main Navigation */}
       {/* Navbar */}
       <nav className="bg-blue-200 p-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-800">MiniMinds</div>
        <ul className="flex space-x-6 text-lg">
          <li><a href="#features" className="text-blue-800 hover:underline">Features</a></li>
          <li><a href="#why" className="text-blue-800 hover:underline">Why MiniMinds</a></li>
          <li><a href="#donate" className="text-blue-800 hover:underline">Donate</a></li>
          <li><a href="#partners" className="text-blue-800 hover:underline">Partners</a></li>
        </ul>
        <button className="bg-green-200 text-purple-800 px-4 py-2 rounded-lg shadow-md hover:bg-green-300">Connect Wallet</button>
      </nav>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">MiniMinds</span>
            </div>
            
            <div className="hidden sm:flex sm:space-x-8">
              {sections.map((section) => (
                <a
                  key={section.name}
                  href={section.href}
                  className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                >
                  {section.name}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Sign Up
              </button>
              <button className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors">
                Log In
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Subjects Navigation */}
      <nav className="bg-blue 300 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto py-2">
            {subjects.map((subject) => (
              <a
                key={subject.name}
                href={subject.href}
                className="text-gray-600 hover:text-primary whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors"
              >
                {subject.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navigation;