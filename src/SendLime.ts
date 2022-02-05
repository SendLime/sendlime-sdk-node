import Message from './Message';
import Verify from "./Verify";

class SendLime {
  constructor(private credentials: Credentials) {}

  message = new Message(this.credentials);
  verify = new Verify(this.credentials);
}

export = SendLime;

interface Credentials {
  apiKey: string;
  apiSecret: string;
}
