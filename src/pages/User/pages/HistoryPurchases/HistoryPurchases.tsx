import { Link, createSearchParams } from 'react-router-dom'
import path from '../../../../components/constants/path'
import { purchasesStatus } from '../../../../components/constants/purchase'
import classNames from 'classnames'
import useQueryParams from '../../../../hook/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import purchaseApi from '../../../../Api/purchase.api'
import { PurchaseListStatus } from '../../../../types/purchase.type'
import { generateNameId } from '../../../../utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'All' },
  { status: purchasesStatus.waitForGetting, name: 'Waiting to pick up' },
  { status: purchasesStatus.waitForConFirmation, name: 'Waiting for confirmation' },
  { status: purchasesStatus.inProgress, name: 'In Progress' },
  { status: purchasesStatus.delivered, name: 'Delivered' },
  { status: purchasesStatus.canceled, name: 'Canceled' }
]

export default function HistoryPurchases() {
  const queryParam: { status?: string } = useQueryParams()
  const status: number = Number(queryParam.status) || purchasesStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })

  const purchasesInCart = purchasesInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchases,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {' '}
      {tab.name}
    </Link>
  ))
  //*                             MAIN
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm '>{purchaseTabsLink}</div>
      <div>
        {purchasesInCart?.map((item) => (
          <div key={item._id} className='bng-white mt-4 rounded-sm border-black/10 p-6 text-gray-800 shadow-sm'>
            <Link
              to={`${path.home}${generateNameId({ name: item.product.name, id: item.product._id })}`}
              className='flex'
            >
              <div className='flex-shrink-0'></div>
              {item.product.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
