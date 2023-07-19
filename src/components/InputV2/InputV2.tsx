import { InputHTMLAttributes, forwardRef, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputV2 = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    value = '',
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      // execute onChange callback from outside props
      onChange && onChange(e)
      // update localValueState
      setLocalValue(value)
    }
  }

  return (
    <div className={className}>
      <input className={classNameInput} {...rest} onChange={handleChange} value={value || localValue} ref={ref} />

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputV2
