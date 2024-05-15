/**
 * 반환용 DTO
 */
export class ResponseDto<T> {
  message?: string;
  success?: boolean;
  data?: T;

  constructor(data?: any) {
    if (data.data) this.data = data.data;
    if (data.message) this.message = data.message;
    if (data.success) this.success = data.success;
  }
}
