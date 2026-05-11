# SendLime Server SDK for Node.js

This is the Node.js Server SDK for SendLime Messaging API v2. To use it you need a SendLime account and an API key from the dashboard.

Full documentation:

- Developer docs: [developer.sendlime.com](https://developer.sendlime.com)
- API reference: [api.sendlime.com/api-docs](https://api.sendlime.com/api-docs)

## Installation

```js
npm install @sendlime/server-sdk
```

## Constructor

```js
const SendLime = require('@sendlime/server-sdk');

const sendLime = new SendLime({
  apiKey: 'sl_live_your_key_here',
});
```

## Supported APIs

| API          | Supported? |
|--------------|------------|
| SMS API      | Yes        |
| WhatsApp API | Yes        |
| Balance API  | Yes        |
| Verify API   | Legacy / deprecated |

## Send an SMS

```js
sendLime.message
  .sendSms({
    to: '88015******44',
    text: 'Hello World!',
    from: 'YourBrandName',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

Properties:

- `to` - Recipient mobile number. Required.
- `text` - Message text content. Required.
- `from` - Approved sender, brand name, phone number, or brand ID. Optional.

## Send a WhatsApp message

```js
sendLime.message
  .sendWhatsApp({
    to: '88015******44',
    text: 'Hello from WhatsApp!',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

Pass `from` when you need to select a specific approved WhatsApp profile brand ID.

You can also use the dedicated WhatsApp namespace:

```js
sendLime.whatsapp
  .sendMessage({
    to: '88015******44',
    text: 'Hello from WhatsApp!',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

For compatibility, `sendLime.message.sendWhatsapp(...)` is also available as an alias.

## Check balance

```js
sendLime.message
  .getBalance()
  .then((res) => console.log(res.data.balance, res.data.currency))
  .catch((err) => console.log(err));
```

## Support

[support@sendlime.com](mailto:support@sendlime.com)
