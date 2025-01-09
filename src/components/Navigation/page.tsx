import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu/page";
//import { cn } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const subjects = [
  { name: "HTML", href: "#" },
  { name: "CSS", href: "#" },
  { name: "JavaScript", href: "#" },
  { name: "Music", href: "#" },
  { name: "Java", href: "#" },
  { name: "Arts and craft", href: "#" },
  { name: "React", href: "#" },
];

const sections = [
  { name: "Institution", href: "#" },
  { name: "Students", href: "#" },
  { name: "Teachers", href: "#" },
];

const Navigation = () => {
  

  return (
    <div className="w-full">
      {/* Main Navigation */}
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
              {/* <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Connect Wallet
              </button> */}
              
              <button 
             
              className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors">
              Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Subjects Navigation */}
      <nav className="bg-muted">
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