export interface ErrorResponse<Data> {
  message: string
  data: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// cú pháp `-?` sẽ loại bỏ undefined của key optional

export type NoUndefinedFiled<T> = {
  [P in keyof T]-?: NoUndefinedFiled<NonNullable<T[P]>>
}
