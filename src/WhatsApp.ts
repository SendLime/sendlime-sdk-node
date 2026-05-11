import Message from './Message';

export default class WhatsApp {
  private message: Message;

  constructor(credentials: { apiKey: string; apiSecret?: string }) {
    this.message = new Message(credentials);
  }

  async sendMessage(data: WhatsAppMessageData): Promise<WhatsAppMessageResponse> {
    return this.message.sendWhatsApp(data);
  }
}

interface WhatsAppMessageData {
  from?: string;
  to: string;
  text: string;
}

interface WhatsAppMessageResponse {
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
