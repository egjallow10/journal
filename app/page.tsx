import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { BookOpen, ArrowRight } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <BookOpen className="h-24 w-24 text-white" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          Welcome to Your Digital Journal
        </h1>
        <p className="text-xl sm:text-2xl text-indigo-200 mb-10 leading-relaxed">
          Capture your thoughts, reflect on your experiences, and track your personal growth
          with our intuitive and secure journaling platform.
        </p>
        <div className="mt-10">
          <Link href={href}>
            <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-indigo-900 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out shadow-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {['Daily Reflections', 'Mood Tracking', 'Secure & Private'].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-2">{feature}</h3>
              <p className="text-indigo-200">Enhance your journaling experience with our powerful tools.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}