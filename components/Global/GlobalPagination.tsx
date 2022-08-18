import type { Pagination } from '../../types'

type Props = {
  pagination: Pagination,
  updatePage: Function,
}

const GlobalPagination = ({ pagination, updatePage }: Props) => {
  const { page, pages } = pagination
  const prevDisabled = page === 1
  const nextDisabled = page === pages
  return (
    <div className="py-4 flex flex-row justify-center space-x-2">
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
        disabled={prevDisabled}
        onClick={() => updatePage(page - 1)}
      >
        Previous  
      </button>
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
        disabled={nextDisabled}
        onClick={() => updatePage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}
  
export default GlobalPagination