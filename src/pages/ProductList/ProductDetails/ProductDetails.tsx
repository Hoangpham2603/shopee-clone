import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../../Api/product.api'

export default function ProductDetails() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  // const product = productDetailData?.data.data
  // console.log(product)
  return <div>ProductDetails</div>
}
