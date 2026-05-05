import isKhali from 'khali';
import { Http, Logger } from './utils';

export default class Message {
  private static get ERROR_MESSAGES() {
    return {
      sender: 'Invalid brand_id provided',
      to: 'Invalid to provided',
      text: 'Invalid text provided',
    };
  }

  private static get PATH() {
    return '/messages';
  }

  private static get BALANCE_PATH() {
    return '/balance';
  }

  constructor(private credentials: { apiKey: string; apiSecret?: string }) {}

  private _validateData(data: Data) {
    const validReg: RegExp = /^8801[3-9]\d{8}$/;
    const mobileIsNotValid: boolean =
      // is empty or, valid number
      isKhali(data.to) || !validReg.test(data.to);

    if (mobileIsNotValid) Logger.sendError(Message.ERROR_MESSAGES.to);
  }

  async sendSms(data: Data): Promise<SendSMSResponse> {
    this._validateData(data);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.credentials.apiKey,
    };

    const postData: SendMessageRequest = {
      to: data.to,
      message: data.text,
      channel: data.channel || 'sms',
    };
    if (data.from) postData.brand_id = data.from;

    try {
      const res = await Http.post(Message.PATH, postData, {
        headers,
      });
      return res.data as SendSMSResponse;
    } catch (err: any) {
      return err.response.data as SendSMSResponse;
    }
  }

  async sendWhatsApp(data: Omit<Data, 'channel'>): Promise<SendSMSResponse> {
    return this.sendSms({ ...data, channel: 'whatsapp' });
  }

  async getBalance(): Promise<BalanceResponse> {
    const headers = {
      Authorization: 'Bearer ' + this.credentials.apiKey,
    };

    try {
      const res = await Http.get(Message.BALANCE_PATH, { headers });
      return res.data as BalanceResponse;
    } catch (err: any) {
      return err.response.data as BalanceResponse;
    }
  }
}

interface Data {
  from?: string;
  to: string;
  text: string;
  channel?: 'sms' | 'whatsapp';
}

interface SendMessageRequest {
  brand_id?: string;
  channel: 'sms' | 'whatsapp';
  message: string;
  to: string;
}

interface SendSMSResponse {
  success: boolean;
  error?: string;
  data: {
    gateway_id: string | null;
    to: string;
    channel: 'sms' | 'whatsapp';
    status: string;
    credits_remaining: number;
  };
}

interface BalanceResponse {
  success: boolean;
  error?: string;
  data: {
    balance: number;
    currency: string;
  };
}
