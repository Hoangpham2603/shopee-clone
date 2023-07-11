import path from '../../../components/constants/path'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import { QueryConfig } from '../ProductList'
import { Category } from '../../../types/category.type'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { Schema, schema } from '../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedFiled } from '../../../types/utils.type'
import RatingStars from '../RatingStarts'
interface Props {
  queryConfig: QueryConfig
  categories: Category[] | []
}

type FormData = NoUndefinedFiled<Pick<Schema, 'price_min' | 'price_max'>>

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

  const navigate = useNavigate()
  const valueForm = watch()

  const onsubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

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

      {/* STARS */}
      <RatingStars />

      <div className='my-4 h-[1px] bg-gray-300'></div>

      <Button className='hover:bg-orange-80 flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white'>
        Delete All
      </Button>
    </div>
  )
}
