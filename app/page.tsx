"use client";

import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) return null; // Prevent flicker while redirecting

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight mb-6">
        A personal space for <span className="italic">readers</span>
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-xl font-light">
        Log your books, reflect on your habits, and rediscover your favorite authors. Deceptively simple. Quietly powerful.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/signup" 
          className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          Start your collection
        </Link>
        <Link 
          href="/login" 
          className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
