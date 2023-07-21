import Popover from '../Popover'
import { AppContext } from '../../contexts/app.context'
import { Link } from 'react-router-dom'
import path from '../constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from '../../Api/auth.api'
import { purchasesStatus } from '../constants/purchase'
import { useContext } from 'react'

export default function NavHeader() {
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  //                      MAIN
  return (
    <div className='flex justify-end '>
      <Popover
        className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col px-3 py-2'>
              <button className='px-3 py-2 hover:text-orange'>English</button>
              <button className='px-3 py-2 hover:text-orange'>Vietnamese</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Vietnamese </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={path.profile}
                className='block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                My Account
              </Link>

              <Link
                to={path.cart}
                className='block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Carts
              </Link>

              <Link
                onClick={handleLogout}
                to='/'
                className='block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-500'
              >
                Logout
              </Link>
            </div>
          }
        >
          <div className='mr-2 h-6 w-5 flex-shrink-0'>
            <img
              src='https://i.pinimg.com/564x/6c/25/69/6c256939b7c9dc7e93118a768fd23f3c.jpg'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='ml-3 flex cursor-pointer items-center py-1 hover:text-gray-300'>
            <div>{profile?.email}</div>
          </div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize opacity-70 hover:text-white'>
            Sign Up{' '}
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40 '></div>
          <Link to={path.login} className='mx-3 capitalize opacity-70 hover:text-white'>
            Sign in{' '}
          </Link>
        </div>
      )}
    </div>
  )
}
