import path from '../../../components/constants/path'
import { Link, createSearchParams } from 'react-router-dom'
import Button from '../../../components/Button'
import { QueryConfig } from '../ProductList'
import { Category } from '../../../types/category.type'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { schema } from '../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string
  price_max: string
}

/**
 * Rule Validate
 * if (price_min && price_max) => price_min <=price_max
 * if (price_min) => no price_max vice versa.
 *
 */
const priceSchema = schema.pick(['price_max', 'price_min'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const valueForm = watch()

  const onsubmit = handleSubmit((data) => {
    console.log(data)
  })

  console.log(errors)

  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        All Items
      </Link>

      <div className='my-4 h-[1px] bg-gray-300'></div>

      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li key={categoryItem._id} className='py-2 pl-2'>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}

        <li className='py-2pl-2'>
          <Link to={path.home} className='relative px-2 font-semibold text-orange'>
            Phone
          </Link>
        </li>
      </ul>

      <Link to={path.home} className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Filter
      </Link>
      <div className='my-4  h-[1px] bg-gray-300'></div>
      <div className='my-5'>
        <div>Price range</div>
        <form className='mt-2' onSubmit={onsubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameError='hidden'
                    ref={field.ref}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_max')
                    }}
                    placeholder='$ from'
                    type='text'
                    className='grow'
                    classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>-</div>

            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    classNameError='hidden'
                    ref={field.ref}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_min')
                    }}
                    placeholder='$ to'
                    type='text'
                    className='grow'
                    classNameInput='w-full rounded-sm border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                  />
                )
              }}
            />
            <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
              Apply
            </Button>
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.price_min?.message}</div>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <div className='text-sm'>Rating</div>
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          {/* STARS */}
          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
          </Link>

          <Link to='' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
          </Link>
        </li>
      </ul>
      <div className='my-4 h-[1px] bg-gray-300'></div>

      <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
        Delete All
      </Button>
    </div>
  )
}
