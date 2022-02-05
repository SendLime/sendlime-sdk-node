import { Http } from "./utils";

export default class Verify {
  constructor(private credentials: { apiKey: string; apiSecret: string }) {}

  async sendCode(data: SendCodeData): Promise<SendCodeResponse> {
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
      const res = await Http.post('/verify', postData, {
        headers,
      });
      return res.data as SendCodeResponse;
    } catch (err: any) {
      return err.response.data as SendCodeResponse;
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

interface VerifyCodeResponse {
  success: boolean;
  error_code: number | null;
  error_message: string | null;
  result: {
    request_id: string;
    status: string;
    price: string;
  } | null;
}
