import Input from '../../../../components/input'
import Button from '../../../../components/Button'
import { UserSchema, userSchema } from '../../../../utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../Api/user.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { ErrorResponse } from '../../../../types/utils.type'
import { ObjectSchema } from 'yup'
import { toast } from 'react-toastify'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver<FormData>(passwordSchema as ObjectSchema<FormData>)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              // message: formError[key as keyof FormData],
              // type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='rounded-sm bg-white px-7 pb-10 shadow md:px-2 md:pb-20'>
      <div className='border-b border-gray-200 py-6'>
        <h1 className='text-xl font-medium capitalize text-gray-900'>Change Password</h1>
        <div className='mt-1 text-sm text-gray-700'>Manage Account</div>
      </div>
      {/*                   FORM */}
      <form className='mr-auto mt-8 max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>Old Password</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='relative'
                classNameInput=' w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='password'
                type='password'
                placeholder='old password'
                errorMessage={errors?.password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>New Password</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput=' w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative'
                register={register}
                type='password'
                name='new_password'
                placeholder='new password'
                errorMessage={errors?.new_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>Confirm Password</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput=' w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                className='relative'
                register={register}
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
                errorMessage={errors?.confirm_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-left capitalize'>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  type='submit'
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
