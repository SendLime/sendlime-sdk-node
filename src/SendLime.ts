import Message from './Message';

class SendLime {
  constructor(private credentials: Credentials) {}

  message = new Message(this.credentials);
}

export = SendLime;

interface Credentials {
  apiKey: string;
  apiSecret: string;
}
