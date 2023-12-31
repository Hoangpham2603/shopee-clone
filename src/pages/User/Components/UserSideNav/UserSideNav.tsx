import { useContext } from 'react'
import path from '../../../../components/constants/path'
import { Link, NavLink } from 'react-router-dom'
import { AppContext } from '../../../../contexts/app.context'
import { getAvatarURL } from '../../../../utils/utils'
import classNames from 'classnames'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-300 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/20'>
          <img src={getAvatarURL(profile?.avatar)} alt='profile pic' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='font-semi-bold mb-1 truncate text-gray-600'>leanhkhoa1995</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex-center mt-4 flex capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          My Account
        </NavLink>

        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex-center mt-4 flex capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='h-full w-full' />
          </div>
          Change Password
        </NavLink>

        <NavLink
          to={path.historyPurchases}
          className={({ isActive }) =>
            classNames('flex-center mt-4 flex capitalize transition-colors', {
              'text-orange': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='h-full w-full' />
          </div>
          Order History
        </NavLink>
      </div>
    </div>
  )
}
