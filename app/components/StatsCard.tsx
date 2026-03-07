export default function StatsCard({ booksCount, readingCount, completedCount }: { booksCount: number, readingCount: number, completedCount: number }) {
    return (
        <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-5 py-3 min-w-[140px]">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Collection</p>
                <p className="text-2xl font-serif text-gray-900">{booksCount}</p>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 shadow-sm rounded-xl px-5 py-3 min-w-[140px]">
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Reading</p>
                <p className="text-2xl font-serif text-blue-900">{readingCount}</p>
            </div>

            <div className="bg-green-50/50 border border-green-100 shadow-sm rounded-xl px-5 py-3 min-w-[140px]">
                <p className="text-xs font-medium text-green-600 uppercase tracking-wider mb-1">Completed</p>
                <p className="text-2xl font-serif text-green-900">{completedCount}</p>
            </div>
        </div>
    );
}