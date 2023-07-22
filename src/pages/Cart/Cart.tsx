import { useMutation, useQuery } from '@tanstack/react-query'
import purchaseApi from '../../Api/purchase.api'
import { purchasesStatus } from '../../components/constants/purchase'
import { Link } from 'react-router-dom'
import path from '../../components/constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QtityController'
import Button from '../../components/Button'
import { useEffect, useState } from 'react'
import { Purchase } from '../../types/purchase.type'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  const checkedPurchase = extendedPurchase.filter((purchase) => purchase.checked)
  const purchaseCheckedCount = checkedPurchase.length
  const totalCheckedPrice = checkedPurchase.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalCheckedSavingPrice = checkedPurchase.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)

  useEffect(() => {
    setExtendedPurchase((prev) => {
      const extendedPurchaseObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchaseObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleChecked = (purchaseIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExtendedPurchase(
      produce((prev) =>
        prev.map((purchase) => ({
          ...purchase,
          checked: !isAllChecked
        }))
      )
    )
  }

  const hanldeQantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchase[purchaseIndex]
      setExtendedPurchase(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchasesId = checkedPurchase.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchasesId)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  //                                      MAIN
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='overflow-auto'>
        <div className='min-w-[1000px]'>
          <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
            <div className='col-span-6'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckedAll}
                  />
                </div>
                <div className='flex-grow text-black'>All Products</div>
              </div>
            </div>

            <div className='col-span-6'>
              <div className='grid grid-cols-5 text-center'>
                <div className='col-span-2'>Đơn Giá</div>
                <div className='col-span-1'>Số Lượng</div>
                <div className='col-span-1'>Số Tiền</div>
                <div className='col-span-1'>Thao Tác</div>
              </div>
            </div>
          </div>

          {/* Body */}
          {extendedPurchase.length > 0 && (
            <div className='my-3 rounded-sm bg-white  p-5 shadow'>
              {extendedPurchase?.map((purchase, index) => {
                return (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            checked={purchase.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img className='rounded-sm' src={purchase.product.image} alt={purchase.product.name} />
                            </Link>
                            <div className='flex-grow px-5 pb-2 pt-1'>
                              <Link
                                className='line-clamp-2'
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                              >
                                {purchase.product.name}{' '}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-400 line-through'>
                              ${formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>${formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>

                        <div className='col-span-1'>
                          <QuantityController
                            classNameWrapper='flex items-center'
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            onIncrease={(value) => hanldeQantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => hanldeQantity(index, value, value >= 1)}
                            disabled={purchase.disabled}
                            onType={handleTypeQantity(index)}
                            onFocusOut={(value) =>
                              hanldeQantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                          />
                        </div>

                        <div className='col-span-1'>
                          <span className='text-orange'>
                            ${formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>

                        <div className='col-span-1'>
                          <button
                            onClick={handleDelete(index)}
                            className='bg-none text-black transition-colors hover:text-orange'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <div className='sticky bottom-0 z-10 mt-10 flex flex-col  items-center rounded-sm border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
        <div className='flex items-center'>
          <div className='flex flex-shrink items-center justify-center pr-3'>
            <input
              type='checkbox'
              className='h-5 w-5 accent-orange'
              checked={isAllChecked}
              onChange={handleCheckedAll}
            />
          </div>
          <button className='mx-3 border-none bg-none' onClick={handleCheckedAll}>
            Select All ({extendedPurchase?.length} items)
          </button>
          <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
            Delete
          </button>
        </div>
        <div className='mt-5 flex flex-col items-center justify-center sm:ml-auto sm:mt-0 sm:flex-row'>
          <div>
            <div className='flex items-center justify-end'>
              <div>Total: ({purchaseCheckedCount} Items)</div>
              <div className='ml-2 text-2xl text-orange'>${formatCurrency(totalCheckedPrice)}</div>
            </div>
            <div className='flex items-center justify-end text-sm'>
              <div className='text-gray-500'>Save</div>
              <div className='ml-6 text-orange'>${formatCurrency(totalCheckedSavingPrice)}</div>
            </div>
          </div>
          <Button
            onClick={handleBuyPurchases}
            disabled={buyProductMutation.isLoading}
            className='mt-5 flex h-10 w-52 items-center justify-center bg-orange text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4'
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}
