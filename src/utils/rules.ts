import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']: RegisterOptions }

export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'please input your email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'invalid Email !!!'
    },
    maxLength: {
      value: 160,
      message: '6-160 characters'
    },
    minLength: {
      value: 6,
      message: '6-160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'please input password'
    },
    maxLength: {
      value: 160,
      message: '6-160 characters'
    },
    minLength: {
      value: 6,
      message: '6-160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'please confirm your password'
    },
    maxLength: {
      value: 160,
      message: '6-160 characters'
    },
    minLength: {
      value: 6,
      message: '6-160 characters'
    },
    validate:
      typeof getValues === 'function' ? (value) => value === getValues('password') || 'Password not match' : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is require')
    .email('Invalid Email')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password is require')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('please confirm your password')
    .min(5, '6-160 characters')
    .max(160, '6-160 characters'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid Price',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid Price',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, '6-160 characters').min(6, '6-160 characters'),
  phone: yup.string().max(20, 'max 20 characters').min(6, 'min 6 characters'),
  address: yup.string().max(20, '6-160 characters').min(6, '6-160 characters'),
  date_of_birth: yup.date().max(new Date(), "DOB can't be in the past"),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password'],
  avatar: yup.string().max(1000, 'max 1000 characters')
})

export type UserSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
