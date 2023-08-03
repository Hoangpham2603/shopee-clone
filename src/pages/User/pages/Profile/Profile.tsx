import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm, Controller, FormProvider, useFormContext } from 'react-hook-form'
import { UserSchema, userSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../../../components/Button'
import Input from '../../../../components/input'
import userApi from '../../../../Api/user.api'
import InputNumber from '../../../../components/InputNumber'
import { useContext, useEffect, useMemo, useState } from 'react'
import DateSelect from '../../Components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setProfileToLS } from '../../../../utils/auth'
import { getAvatarURL, isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { ErrorResponse } from '../../../../types/utils.type'
import InputFile from '../../../../components/InputFile'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

function Info() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <>
      <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
        <div className='truncate pt-3 capitalize  sm:w-[20%] sm:text-left lg:text-center'>Name</div>
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
        <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>Phone Number</div>
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
        <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>Address</div>
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
    </>
  )
}

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImg = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const method = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver<FormData>(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = method

  const avatar = watch('avatar')

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatar = useMutation(userApi.uploadAvatar)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  //* Flow 1:
  // Nhấn upload: upload lên server luôn => server trả về url ảnh
  // Nhấn submit thì gửi url ảnh cộng với data lên server

  //* Flow 2:
  // Nhấn upload: không upload lên server
  // Nhấn submit thì tiến hành upload lên server, nếu upload thành công thì tiến hành gọi api updateProfile

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData() //* FormData from JavaScript not our FormData Type.
        form.append('image', file)
        const uploadRes = await uploadAvatar.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })

      setProfileToLS(res.data.data)
      setProfile(res.data.data)
      refetch()
      toast.success(res.data.message, { autoClose: 1000 })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  //*                                   MAIN
  return (
    <div className='rounded-sm bg-white px-7 pb-10 shadow md:px-2 md:pb-20'>
      <div className='border-b border-gray-200 py-6'>
        <h1 className='text-xl font-medium capitalize text-gray-900'>My profile</h1>
        <div className='mt-1 text-sm text-gray-700'>Manage Account</div>
      </div>
      {/*                   FORM */}
      <FormProvider {...method}>
        <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 text-center  capitalize sm:w-[20%]'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>{profile?.email}</div>
              </div>
            </div>

            <Info />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] lg:text-center'>Address</div>
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

            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='w-[20%] truncate pt-3 text-left capitalize'>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Button className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'>
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
                  src={previewImg || getAvatarURL(avatar)}
                  alt=''
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <InputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>maximum 1Mb</div>
            </div>
          </div>
        </form>{' '}
      </FormProvider>
    </div>
  )
}
