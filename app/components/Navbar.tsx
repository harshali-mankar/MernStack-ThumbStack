"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  return (
    <nav className="border-b border-gray-200 bg-white/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-serif text-xl font-medium tracking-tight text-gray-900 flex items-center gap-2">
            <Image src="/book.png" alt="Logo" width={20} height={20} />
            Personal Book Library
          </Link>

          <div className="flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <span className="text-sm tracking-wide text-gray-600 mr-2 flex items-center">
                      Welcome, <span className="font-medium ml-1 text-gray-900">{user.name}</span>
                    </span>
                    <button
                      onClick={logout}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                      Log in
                    </Link>
                    <Link href="/signup" className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                      Sign up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
