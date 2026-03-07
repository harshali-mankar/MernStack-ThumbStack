import { IBook } from "@/app/interfaces/Book";
import { useState } from "react";

interface BookCardProps {
  book: IBook;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (book: IBook) => void;
}

export default function BookCard({ book, onUpdateStatus, onDelete, onEdit }: BookCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const statusColors = {
    'Want to Read': 'bg-gray-100 text-gray-800',
    'Reading': 'bg-blue-50 text-blue-700',
    'Completed': 'bg-green-50 text-green-700'
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this book?")) {
      setIsDeleting(true);
      await onDelete(book._id);
      // We don't need to unset isDeleting if it succeeds as it unmounts
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-serif text-xl font-medium text-gray-900 pr-8 leading-tight">{book.title}</h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[book.status]}`}>
          {book.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 font-light">{book.author}</p>
      
      {book.tags && book.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {book.tags.map(tag => (
            <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <select 
          value={book.status}
          onChange={(e) => onUpdateStatus(book._id, e.target.value)}
          className="text-sm bg-transparent font-medium text-gray-600 outline-none cursor-pointer hover:text-gray-900"
        >
          <option value="Want to Read">Want to Read</option>
          <option value="Reading">Reading</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(book)}
            className="text-gray-400 hover:text-black transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
