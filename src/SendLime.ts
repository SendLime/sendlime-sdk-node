import Message from './Message';
import Verify from "./Verify";
import WhatsApp from './WhatsApp';

class SendLime {
  constructor(private credentials: Credentials) {}

  message = new Message(this.credentials);
  whatsapp = new WhatsApp(this.credentials);
  verify = new Verify(this.credentials);
}

export = SendLime;

interface Credentials {
  apiKey: string;
  apiSecret?: string;
}
