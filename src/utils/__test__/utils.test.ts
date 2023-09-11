import { describe, it, expect } from 'vitest'
import { isAxiosError, isAxiosUnprocessableEntityError } from '../utils'
import { AxiosError } from 'axios'
import HttpStatusCode from '../../components/constants/httpStatusCode.enum'

// dùng để mô tả tập hợp các ngữ cảnh hoặc đơn vị cần test: ví dụ function, component
describe('isAxiosError', () => {
  //it dùng để ghi chú trường hợp cần test
  it('isAxiosError return boolean', () => {
    //expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  //it dùng để ghi chú trường hợp cần test
  it('isAxiosUnprocessableEntityError return boolean', () => {
    //expect dùng để mong đợi giá trị trả về
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null
        } as any)
      )
    ).toBe(true)
  })
})
