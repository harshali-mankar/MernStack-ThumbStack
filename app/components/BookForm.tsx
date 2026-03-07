import { useState, useEffect } from "react";
import { IBook } from "@/app/interfaces/Book";

interface BookFormProps {
  initialData?: IBook | null;
  onSubmit: (data: Partial<IBook>) => Promise<void>;
  onCancel: () => void;
}

export default function BookForm({ initialData, onSubmit, onCancel }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setTagsStr(initialData.tags?.join(", ") || "");
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Process tags: split by comma, trim whitespace, remove empty
    const tags = tagsStr.split(",").map(t => t.trim()).filter(t => t.length > 0);
    
    await onSubmit({ title, author, tags, status: status as IBook['status'] });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif text-gray-900">
            {initialData ? "Edit Book" : "Add to Collection"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="The Name of the Wind"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Patrick Rothfuss"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              value={tagsStr}
              onChange={e => setTagsStr(e.target.value)}
              placeholder="fantasy, fiction, favorite"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-black outline-none transition-all"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="pt-4 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-5 py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
