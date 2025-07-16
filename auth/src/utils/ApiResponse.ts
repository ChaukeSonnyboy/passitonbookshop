import { BAD_REQUEST } from "../constants/http-status-codes";

class ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: any;

  constructor(statusCode: number, message = "Request Passed!", data: any) {
    this.statusCode = statusCode;
    this.success = statusCode < BAD_REQUEST;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
