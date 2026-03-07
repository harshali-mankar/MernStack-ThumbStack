"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { IBook } from "@/app/interfaces/Book";
import BookCard from "@/app/components/BookCard";
import BookForm from "@/app/components/BookForm";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);

  // Filter state
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/books");
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books);
      }
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBook = async (data: Partial<IBook>) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setShowForm(false);
        fetchBooks();
      }
    } catch (error) {
      console.error("Failed to create book", error);
    }
  };

  const handleUpdateBook = async (id: string, data: Partial<IBook>) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setEditingBook(null);
        setShowForm(false);
        fetchBooks();
      }
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    // Optimistic update
    setBooks(prev => prev.map(b => b._id === id ? { ...b, status: status as IBook['status'] } : b));
    await handleUpdateBook(id, { status: status as IBook['status'] });
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBooks(prev => prev.filter(b => b._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  const openEditForm = (book: IBook) => {
    setEditingBook(book);
    setShowForm(true);
  };

  // Derived data
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach(b => b.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchesStatus = statusFilter === "All" || b.status === statusFilter;
      const matchesTag = tagFilter === "All" || b.tags?.includes(tagFilter);
      return matchesStatus && matchesTag;
    });
  }, [books, statusFilter, tagFilter]);

  if (authLoading || !user) return null;

  return (
    <div className="pt-4 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">My Library</h1>
          <StatsCard booksCount={books.length} readingCount={books.filter(b => b.status === 'Reading').length} completedCount={books.filter(b => b.status === 'Completed').length} />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Book
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-500">Status:</label>
          <select
            className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-black outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Want to Read">Want to Read</option>
            <option value="Reading">Reading</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {uniqueTags.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-500">Tag:</label>
            <select
              className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-black outline-none"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            >
              <option value="All">All Tags</option>
              {uniqueTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <BookCard
              key={book._id}
              book={book}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteBook}
              onEdit={openEditForm}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
          <p className="text-gray-500 mb-6 font-light">
            {books.length === 0 ? "Your collection is empty. Add your first book to get started." : "No books match the current filters."}
          </p>
          {books.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="text-black font-medium hover:underline inline-flex items-center gap-1"
            >
              Add your first book
            </button>
          )}
        </div>
      )}

      {showForm && (
        <BookForm
          initialData={editingBook}
          onSubmit={editingBook ? (data) => handleUpdateBook(editingBook._id, data) : handleCreateBook}
          onCancel={() => {
            setShowForm(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
}
