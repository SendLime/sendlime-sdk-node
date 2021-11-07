import isKhali from 'khali';
import { Http, Logger } from './utils';

export default class Message {
  private static get ERROR_MESSAGES() {
    return {
      sender: 'Invalid from provided',
      to: 'Invalid to provided',
      text: 'Invalid text provided',
    };
  }

  private static get PATH() {
    return '/sms';
  }

  constructor(private credentials: { apiKey: string; apiSecret: string }) {}

  private _validateData(data: Data) {
    const validReg: RegExp = /^8801[3-9]\d{8}$/;
    const mobileIsNotValid: boolean =
      // is empty or, valid number
      isKhali(data.to) || !validReg.test(data.to);

    if (mobileIsNotValid) Logger.sendError(Message.ERROR_MESSAGES.to);
  }

  async sendSms(data: Data): Promise<SendSMSResponse> {
    this._validateData(data);

    const credentials: Credentials = {
      api_key: this.credentials.apiKey,
      api_secret: this.credentials.apiSecret,
    };

    const postData: Data & Credentials = {
      to: data.to,
      text: data.text,
      ...credentials,
    };
    if (data.from) postData.from = data.from;

    try {
      const res = await Http.post(Message.PATH, postData);
      return res.data as SendSMSResponse;
    } catch (err: any) {
      return err.response.data as SendSMSResponse;
    }
  }
}

interface Data {
  from?: string;
  to: string;
  text: string;
}

interface Credentials {
  api_key: string;
  api_secret: string;
}

interface SendSMSResponse {
  success: boolean;
  error_code: number | null;
  error_message: string | null;
  result: {
    message_id: string;
    from: string;
    to: string;
    price: string;
    status: string;
    network: string;
  };
}
