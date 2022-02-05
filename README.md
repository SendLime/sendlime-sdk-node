# SendLime Server SDK for Node.js

This is the Node.JS Server SDK for SendLime APIs. To use it you will need a SendLime account. Sign up for free at [sendlime.com](https://sendlime.com).

For full API documentation refer to [developer.sendlime.com](https://developer.sendlime.com).

# Table of Content <!-- omit in toc -->

- [Installation](#installation)
- [Constructor](#constructor)
  - [Properties](#properties)
- [Supported APIs](#supported-apis)
- [SMS](#sms)
  - [Send an SMS](#send-an-sms)
    - [Properties](#properties-1)
- [Verify](#verify)
  - [Send a Code](#send-a-code)
    - [Properties](#properties-2)
  - [Verify a Code](#verify-a-code)
    - [Properties](#properties-3)
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

## Supported APIs

The following is a list of SendLime APIs and whether the Node Server SDK provides support for them:

| API        | Supported? |
|------------|------------|
| SMS API    | ✅          |
| Verify API | ✅          |

## SMS
### Send an SMS

```js
sendLime.message
  .sendSms({
    from: 'SendLime',
    text: 'Hello World!',
    to: '88015******44',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

#### Properties

- text - SMS text content. (Required)
- to - Recipient mobile number. (Required)
- from - Registered brand or purchased number. (Optional)

## Verify

### Send a Code
```js
sendLime.verify
  .sendCode({
    brand: 'SendLime',
    phone_number: '88015******44',
    code_length: 6,
    locale: 'en-us',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

#### Properties

- brand - An 18-character alphanumeric string you can use to personalize the verification request SMS body, to help users identify your company or application name. (Required)
- phone_number - The phone number to send the verification code. (Required)
- locale - The language of the message received by user `bn-bd` `en-us`. (Optional)
- code_length - Optional value to change the number of verification digits sent. Default value is 4. Allowed values are 4-10. (Optional)

### Verify a Code
```js
sendLime.verify
  .checkCode({
    request_id: 'ffe06bb7560a3d350be63c586448b9f9',
    code: '599364',
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
```

#### Properties

- request_id - The request_id that you received in the response to the Verify request and used in the Verify check request. (Required)
- code - The verification code entered by your user. (Required)

# Support

[support@sendlime.com](mailto:support@sendlime.com)
