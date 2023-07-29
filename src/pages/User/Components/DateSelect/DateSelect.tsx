import { range } from 'lodash'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}

export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFormSelect, name } = e.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFormSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='w-[20%] truncate pt-3 capitalize lg:text-center'>Date of Birth</div>
      <div className='flex justify-between sm:pl-5'>
        <select
          name='date'
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:outline-none'
          onChange={handleChange}
          value={value?.getDate() || date.date}
        >
          <option disabled>Date</option>
          {range(1, 32).map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>

        <select
          name='month'
          className='focus:none focus-within:selection: h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:outline-none '
          onChange={handleChange}
          value={value?.getMonth() || date.month}
        >
          <option disabled>Months</option>
          {/*for months. They start from 0 -> 11 = jan -> dec */}
          {range(0, 12).map((date) => (
            <option value={date} key={date}>
              {/* because Months start from 0 => date + 1 */}
              {date + 1}
            </option>
          ))}
        </select>

        <select
          name='year'
          className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange focus:outline-none'
          onChange={handleChange}
          value={value?.getFullYear() || date.year}
        >
          <option disabled>Years</option>
          {range(1910, 2024).map((date) => (
            <option value={date} key={date}>
              {date}
            </option>
          ))}
        </select>

        <div className="'mt-1 text-red-600' min-h-[1.25rem] text-sm">{errorMessage}</div>
      </div>
    </div>
  )
}
