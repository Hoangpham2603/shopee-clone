import Input from '../../../../components/input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-7 pb-10 shadow md:px-2 md:pb-20'>
      <div className='border-b border-gray-200 py-6'>
        <h1 className='text-xl font-medium capitalize text-gray-900'>My profile</h1>
        <div className='mt-1 text-sm text-gray-700'>Manage Account</div>
      </div>

      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
          <div className='flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3  capitalize sm:w-[20%] sm:text-right'>Email: </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>le*******@yahoo.com</div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Name</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Phone Number</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm' />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 text-left capitalize sm:w-[20%]'>Address</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2  outline-none focus:border-gray-500 focus:shadow-sm' />
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
              <div className='sm:w-[80%] sm:pl-5'></div>
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
