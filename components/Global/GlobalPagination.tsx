import type { Pagination } from '../../types';

type Props = {
  pagination: Pagination,
  updatePage: Function,
}

const GlobalPagination = ({ pagination, updatePage }:Props) => {
  
  return (
    <div className="py-2">
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            disabled={pagination.page === 1}
            onClick={() => updatePage(pagination.page - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Previous</span>
          </button>

          <button
            disabled={pagination.page === pagination.pages}
            onClick={() => updatePage(pagination.page + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span>Next</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
  
export default GlobalPagination