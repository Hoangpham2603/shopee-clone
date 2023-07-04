import { SuccessResponse } from 'src/types/utils.type'
import { Product, ProductList, ProductListConfig } from '../types/product.type'
import http from '../utils/http'

const URL = 'products'

const productApi = {
  getProduct(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<Product>(`${URL}/${id}}`)
  }
}

export default productApi
