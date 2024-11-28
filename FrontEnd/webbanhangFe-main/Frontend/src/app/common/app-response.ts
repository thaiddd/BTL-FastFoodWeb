export interface AppResponse<T> {
  errorCode: String | any
  content: T | any
  success: boolean;
}
