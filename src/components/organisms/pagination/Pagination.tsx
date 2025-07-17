import React from 'react'
import { Button } from '../../ui/button'

type Props = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void
}

export default function Pagination({
  currentPage,
  onChangePage,
  totalPages
}: Props) {
  const getPages = () => {
    const pages: (number | 'dots')[] = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('dots')
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push('dots')
      pages.push(totalPages)
    }

    return pages
  }

  const pages = getPages()


  return (
    <div className='flex items-center gap-2'>
      <Button onClick={() => {
        onChangePage(currentPage - 1)

      }}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      {pages.map((p, idx) =>
        p === 'dots' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onChangePage(p)}
            className={`px-3 py-1 rounded cursor-pointer ${p === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
          >
            {p}
          </button>
        )
      )}
      <Button onClick={() => {
        onChangePage(currentPage + 1)
      }}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  )
}
