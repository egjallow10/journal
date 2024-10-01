import React from 'react';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Home, Book } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/journal', label: 'Journal', icon: Book },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">Journal App</h1>
        </div>
        <nav className="mt-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
            >
              <link.icon className="h-5 w-5 mr-3" />
              <span className="text-sm font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm z-10">
          <div className="h-full px-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;