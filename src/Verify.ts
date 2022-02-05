import isKhali from 'khali';
import { Http, Logger } from './utils';

export default class Verify {
  private static get ERROR_MESSAGES() {
    return {
      phone_number: 'Invalid or no phone_number provided',
      brand: 'Invalid or no brand provided',
      request_id: 'Invalid or no request_id provided',
      code: 'Invalid or no code provided',
      code_length: 'Invalid code_length provided. Must be between 4 and 10',
    };
  }

  private static get SEND_PATH() {
    return '/verify';
  }

  private static get CHECK_PATH() {
    return '/verify/check';
  }

  constructor(private credentials: { apiKey: string; apiSecret: string }) {}

  private _validateSendCodeData(data: SendCodeData) {
    const validReg: RegExp = /^8801[3-9]\d{8}$/;
    const mobileIsNotValid: boolean =
      // is empty or, valid number
      isKhali(data.phone_number) || !validReg.test(data.phone_number);

    if (mobileIsNotValid) Logger.sendError(Verify.ERROR_MESSAGES.phone_number);
    if (isKhali(data.brand)) Logger.sendError(Verify.ERROR_MESSAGES.brand);
    if (data.code_length && (data.code_length < 4 || data.code_length > 10))
      Logger.sendError(Verify.ERROR_MESSAGES.code_length);
  }

  private _validateCheckCodeData(data: CheckCodeData) {
    if (isKhali(data.request_id)) Logger.sendError(Verify.ERROR_MESSAGES.request_id);
    if (isKhali(data.code)) Logger.sendError(Verify.ERROR_MESSAGES.code);
  }

  async sendCode(data: SendCodeData): Promise<SendCodeResponse> {
    this._validateSendCodeData(data);

    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(this.credentials.apiKey + ':' + this.credentials.apiSecret).toString('base64'),
    };

    const postData: SendCodeData = {
      phone_number: data.phone_number,
      brand: data.brand,
    };
    if (data.code_length) postData.code_length = data.code_length;
    if (data.locale) postData.locale = data.locale;

    try {
      const res = await Http.post(Verify.SEND_PATH, postData, {
        headers,
      });
      return res.data as SendCodeResponse;
    } catch (err: any) {
      return err.response.data as SendCodeResponse;
    }
  }

  async checkCode(data: CheckCodeData): Promise<CheckCodeResponse> {
    this._validateCheckCodeData(data);

    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(this.credentials.apiKey + ':' + this.credentials.apiSecret).toString('base64'),
    };

    const postData: CheckCodeData = {
      request_id: data.request_id,
      code: data.code,
    };

    try {
      const res = await Http.post(Verify.CHECK_PATH, postData, {
        headers,
      });
      return res.data as CheckCodeResponse;
    } catch (err: any) {
      return err.response.data as CheckCodeResponse;
    }
  }
}

interface SendCodeData {
  brand: string;
  phone_number: string;
  locale?: 'en-us' | 'bn-bd';
  code_length?: number;
}

interface SendCodeResponse {
  success: boolean;
  error_code: number | null;
  error_message: string | null;
  result: {
    request_id: string;
    to: string;
    status: string;
    attempts: number;
  } | null;
}

interface CheckCodeData {
  request_id: string;
  code: string;
}

interface CheckCodeResponse {
  success: boolean;
  error_code: number | null;
  error_message: string | null;
  result: {
    request_id: string;
    status: string;
    price: string;
  } | null;
}
