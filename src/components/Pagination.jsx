export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const maxVisible = 7;

  // Calculate page range to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Edellinen
      </button>

      {/* First page if not visible */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            1
          </button>
          {startPage > 2 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-lg ${page === currentPage
              ? 'bg-blue-600 text-white border-blue-600'
              : 'border-gray-300 hover:bg-gray-50'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Last page if not visible */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 sm:px-2 text-xs sm:text-sm">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Seuraava →
      </button>
    </div>
  );
}
