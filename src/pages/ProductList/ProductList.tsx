import AsideFilter from './AsideFilter'
import SortProductList from './SortProductList'
import Product from './Product'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../Api/product.api'
import Pagination from '../../components/Paginate'
import { ProductListConfig } from 'src/types/product.type'
import categoryApi from '../../Api/category.api'
import useQueryConfig from '../../hook/useQueryConfig'
import { Helmet } from 'react-helmet-async'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })

  return (
    <div className=' bg-gray-200 py-6'>
      <Helmet>
        <title>Product List</title>
        <meta name='description' content='Product List' />
      </Helmet>
      <div className='container'>
        {productsData && (
          <div className='grid  grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
