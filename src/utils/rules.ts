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

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('invalid Email')
    .min(5, '6-160 characters')
    .max(160, '6-160 characters'),
  password: yup.string().required('please input your password').min(5, '6-160 characters').max(160, '6-160 characters'),
  confirm_password: yup
    .string()
    .required('please confirm your password')
    .min(5, '6-160 characters')
    .max(160, '6-160 characters')
    .oneOf([yup.ref('password')], 'password not match'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is not valid',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price is not valid',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent
      if (price_min !== '' && price_max !== '') {
        return Number(price_max) >= Number(price_min)
      }
      return price_min !== '' || price_max !== ''
    }
  })
})

export type Schema = yup.InferType<typeof schema>
