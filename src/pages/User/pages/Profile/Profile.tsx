import { useQuery } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { UserSchema, userSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../../../components/Button'
import Input from '../../../../components/input'
import userApi from '../../../../Api/user.api'
import InputNumber from '../../../../components/InputNumber'
import { useEffect } from 'react'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver<FormData>(profileSchema)
  })

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data
  console.log('profile', profile)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  return (
    <div className='rounded-sm bg-white px-7 pb-10 shadow md:px-2 md:pb-20'>
      <div className='border-b border-gray-200 py-6'>
        <h1 className='text-xl font-medium capitalize text-gray-900'>My profile</h1>
        <div className='mt-1 text-sm text-gray-700'>Manage Account</div>
      </div>
      {/*                   FORM */}
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3  capitalize sm:w-[20%] sm:text-right'>Email: </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Name</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Your Name'
                errorMessage={errors?.name?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Phone Number</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                    placeholder='Phone Number'
                    errorMessage={errors?.phone?.message}
                    type='number'
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Address</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='address'
                placeholder='Address'
                errorMessage={errors?.address?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-left capitalize'>Date of Birth</div>
            <div className='flex justify-between sm:pl-5'>
              <select name='' className='h-10 w-[32%] rounded-sm border-black/10 px-3 '>
                <option disabled>Date</option>
              </select>

              <select name='' className='h-10 w-[32%] rounded-sm border-black/10 px-3 '>
                <option disabled>Months</option>
              </select>

              <select name='' className='h-10 w-[32%] rounded-sm border-black/10 px-3 '>
                <option disabled>Years</option>
              </select>
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='w-[20%] truncate pt-3 text-left capitalize'>
              <div className='sm:w-[80%] sm:pl-5'>
                <Button className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://i.pinimg.com/564x/6c/25/69/6c256939b7c9dc7e93118a768fd23f3c.jpg'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' accept='.jpg, .jpeg, .png' className='hidden' />
            <button className='flex h-10 items-center  justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm '>
              Upload
            </button>
            <div className='mt-3 text-gray-400'>maximum 1Mb</div>
          </div>
        </div>
      </form>
    </div>
  )
}
