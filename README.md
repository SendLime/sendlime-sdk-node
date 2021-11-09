# SendLime Server SDK for Node.js

This is the Node.JS Server SDK for SendLime APIs. To use it you will need a SendLime account. Sign up for free at [sendlime.com](https://sendlime.com).

For full API documentation refer to [developer.sendlime.com](https://developer.sendlime.com).

# Table of Content <!-- omit in toc -->

- [SendLime Server SDK for Node.js](#sendlime-server-sdk-for-nodejs)
  - [Installation](#installation)
  - [Constructor](#constructor)
    - [Properties](#properties)
  - [Send SMS](#send-sms)
    - [Properties](#properties-1)
  - [Response](#response)
    - [On success](#on-success)
    - [On error](#on-error)
- [Support](#support)

## Installation

```js
npm install @sendlime/server-sdk
```

## Constructor

```js
const SendLime = require('@sendlime/server-sdk');

const sendLime = new SendLime({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});
```

### Properties

- apiKey - API Key from Sendlime API. (Required)
- apiSecret - API Secret from SendLime API. (Required)

## Send SMS

```js
sendLime.message
  .sendSms({
    text: 'Hello World!',
    to: '88015******44',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

### Properties

- text - SMS text content. (Required)
- to - Recipient mobile number. (Required)
- from - Registered brand/masking name. (Optional)

## Response

### On success

```json
{
  "success": true,
  "result": {
    "message_id": "50000064******B3",
    "from": "88096******44",
    "to": "88015******44",
    "price": "0.19",
    "status": "accepted",
    "network": "47002"
  },
  "error_code": null,
  "error_message": null
}
```

### On error

```json
{
  "success": false,
  "error_code": 6910,
  "error_message": "Bad credentials",
  "result": null
}
```

# Support

[support@sendlime.com](mailto:support@sendlime.com)
