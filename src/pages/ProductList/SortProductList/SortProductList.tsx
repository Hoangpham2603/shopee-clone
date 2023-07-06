import { QueryConfig } from '../ProductList'
import { sortBy, order as orderConstance } from '../../../components/constants/products'
import classNames from 'classnames'
import { ProductListConfig } from '../../../types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../../components/constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }

  return (
    <div className='bg-gray-300/40 px-3 py-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sap xep tiep theo</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize text-black', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.view),
              'hover:bg-slate/80 bg-white text-black': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Trending
          </button>

          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize text-black', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.createdAt),
              'hover:bg-slate/80 bg-white text-black': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Newest
          </button>

          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize text-black', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.sold),
              'hover:bg-slate/80 bg-white text-black': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Best Selling
          </button>

          <select
            className={classNames('h-8 px-4 text-left text-sm capitalize', {
              'bg-orange text-white hover:bg-orange/80': isActiveSortBy(sortBy.price),
              'hover:bg-slate/80 bg-white text-black': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => {
              handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)
            }}
          >
            <option className='bg-white text-black' value='' disabled>
              Price
            </option>
            <option className='bg-white text-black' value={orderConstance.asc}>
              {' '}
              from: lowest
            </option>
            <option className='bg-white text-black' value={orderConstance.desc}>
              from: highest
            </option>
          </select>
        </div>

        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{page}</span>
            <span>/{pageSize}</span>
            <div className='mt-2 flex items-center'>
              {page === 1 ? (
                <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page - 1).toString()
                    }).toString()
                  }}
                  className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white px-3 hover:bg-slate-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </Link>
              )}

              {page === pageSize ? (
                <span className='flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-tl-sm bg-white/60 px-3 hover:bg-slate-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </span>
              ) : (
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      page: (page + 1).toString()
                    }).toString()
                  }}
                  className='flex h-8 w-9  items-center justify-center rounded-tl-sm bg-white px-3 hover:bg-slate-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
